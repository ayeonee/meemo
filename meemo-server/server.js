const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const https = require("https");
const fs = require("fs");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 443;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

const notesRouter = require("./routes/notes");

app.use("/notes", notesRouter);

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });

https
  .createServer(
    {
      key: fs.readFileSync("./localhost-key.pem"),
      cert: fs.readFileSync("./localhost.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is running on port: ${443}`);
  });
