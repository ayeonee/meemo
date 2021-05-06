const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();
const { User } = require("./models/User");
const { Todo } = require("./models/Todo");
const { Schedule } = require("./models/Schedule");
const { auth } = require("./middleware/auth");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_ID);

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// probably dont need
// https
//   .createServer(
//     {
//       key: fs.readFileSync("./localhost-key.pem"),
//       cert: fs.readFileSync("./localhost.pem"),
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`Server is running on port: ${443}`);
//   });

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ userId: req.body.userId }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 아이디의 사용자가 없습니다.",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.cookie("meemo_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user.userId,
          name: user.name,
        });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //미들웨어를 거친 후 실행됨
  res.status(200).json({
    //유저 정보를 json 형태로 전달
    _id: req.user._id,
    name: req.user.name,
    userId: req.user.userId,
    isAuth: true,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { userId: req.user.userId },
    { token: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.post("/api/users/auth/google", async (req, res) => {
  const token = req.body.tokenId;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload["sub"];
  const name = payload["name"];

  User.findOneAndUpdate(
    { userId: userId },
    {
      name: name,
      userId: userId,
    },
    { upsert: true, new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);

      doc.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.cookie("meemo_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user.userId,
          name: user.name,
        });
      });
    }
  );
});

app.post("/api/users/auth/kakao", (req, res) => {
  const token = req.body;
  const name = token.userName;
  const userId = token.userId;

  User.findOneAndUpdate(
    { userId: userId },
    {
      name: name,
      userId: userId,
    },
    { upsert: true, new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);

      doc.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.cookie("meemo_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user.userId,
          name: user.name,
        });
      });
    }
  );
});

app.post("/api/save/todo", (req, res) => {
  const todo = new Todo(req.body);

  Todo.findOneAndUpdate(
    { userId: req.body.userId },
    { payload: req.body.payload },
    (err, user) => {
      if (!user) {
        todo.save((err, todo) => {
          if (err) return res.json({ save: false, err });

          return res.status(200).json({
            save: true,
          });
        });
      } else {
        return res.status(200).json({
          update: true,
        });
      }
    }
  );
});

app.post("/api/get/todo", (req, res) => {
  Todo.findOne({ userId: req.body.userId }, (err, todoInfo) => {
    if (!todoInfo) {
      return res.json({
        find: false,
        payload: [],
      });
    } else {
      return res.status(200).json({
        find: true,
        payload: todoInfo.payload,
      });
    }
  });
});

app.post("/api/save/schedule", (req, res) => {
  const schedule = new Schedule(req.body);

  Schedule.findOneAndUpdate(
    { userId: req.body.userId },
    { payload: req.body.payload },
    (err, user) => {
      if (!user) {
        schedule.save((err, schedule) => {
          if (err) return res.json({ save: false, err });

          return res.status(200).json({
            save: true,
          });
        });
      } else {
        return res.status(200).json({
          update: true,
        });
      }
    }
  );
});

app.post("/api/get/schedule", (req, res) => {
  Schedule.findOne({ userId: req.body.userId }, (err, scheduleInfo) => {
    if (!scheduleInfo) {
      return res.json({
        find: false,
        payload: [],
      });
    } else {
      return res.status(200).json({
        find: true,
        payload: scheduleInfo.payload,
      });
    }
  });
});

const port = process.env.PORT || 5000;
const notesRouter = require("./routes/notes");
const foldersRouter = require("./routes/folders");
const storageRouter = require("./routes/storage");
const calendarRouter = require("./routes/calendar");

app.use("/api/notes", notesRouter);
app.use("/api/folders", foldersRouter);
app.use("/api/s3", storageRouter);
app.use("/api/calendar", calendarRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
