const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const app = express();
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

const { OAuth2Client } = require("google-auth-library");
const { SocialUser } = require("./models/SocialUser");

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

//////////////////////////////login server/////////////////////////////

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
          _id: user._id,
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
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

const client = new OAuth2Client(process.env.GOOGLE_ID);

app.post("/api/users/auth/google", async (req, res) => {
  const token = req.body.tokenId;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload["sub"];
  const name = payload["name"];

  SocialUser.findOneAndUpdate(
    { userId: userId },
    {
      name: name,
      userId: userId,
    },
    { upsert: true, new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({
        _id: doc._id,
        loginSuccess: true,
        name: doc.name,
      });
    }
  );
});

app.post("/api/users/auth/kakao", (req, res) => {
  const token = req.body;
  const name = token.userName;
  const userId = token.userId;

  SocialUser.findOneAndUpdate(
    { userId: userId },
    {
      name: name,
      userId: userId,
    },
    { upsert: true, new: true },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({
        _id: doc._id,
        loginSuccess: true,
        name: doc.name,
      });
    }
  );
});

const port = process.env.PORT || 5000;
const notesRouter = require("./routes/notes");
const foldersRouter = require("./routes/folders");
const storageRouter = require("./routes/storage");

app.use("/api/notes", notesRouter);
app.use("/api/folders", foldersRouter);
app.use("/api/s3", storageRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
