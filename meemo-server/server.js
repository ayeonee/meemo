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
<<<<<<< HEAD
=======
const {OAuth2Client} = require("google-auth-library");
>>>>>>> 6b9a830... create google login server

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
    useUnifiedTopology: true,
<<<<<<< HEAD
    useFindAndModify: false,
=======
>>>>>>> 6b9a830... create google login server
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

<<<<<<< HEAD
=======
const notesRouter = require("./routes/notes");

app.use("/notes", notesRouter);

>>>>>>> 6b9a830... create google login server
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
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //미들웨어를 거친 후 실행됨
  res.status(200).json({
    //유저 정보를 json 형태로 전달
    _id: req.user._id,
    userId: req.user.userId,
    name: req.user.name,
    isAuth: true,
  });
});

app.get("/api/users/logout", auth, (res, req) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

<<<<<<< HEAD
const port = process.env.PORT || 5000;
const notesRouter = require("./routes/notes");
const foldersRouter = require("./routes/folders");

app.use("/api/notes", notesRouter);
app.use("/api/folders", foldersRouter);
=======
/////////Google Login/////////
const client=new OAuth2Client(process.env.CLIENT_ID);
app.post("/api/users/auth/google", async (req, res)=>{
  const {googleUser}=req.body;
    const ticket=await client.verifyIdToken({
      idToken : googleUser.accessToken,
      audience : process.env.CLIENT_ID
    });
    const {name}=ticket.getUserId();
})



const port = process.env.PORT || 5000;
>>>>>>> 6b9a830... create google login server

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
