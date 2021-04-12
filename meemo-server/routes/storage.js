const AWS = require("aws-sdk");
const router = require("express").Router();
const multer = require("multer");
const multerS3 = require("multer-s3");

const config = require("../config/key");

AWS.config.update({
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretKey,
  region: config.AWSRegion,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.S3Bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
    acl: "public-read",
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/upload", upload.single("imgFile"), (req, res) => {
  try {
    res.send(req.file.location);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
