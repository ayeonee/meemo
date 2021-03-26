const router = require("express").Router();
let Folder = require("../models/folder.model");

router.route("/").get((req, res) => {
  Folder.find()
    .then((folders) => res.json(folders))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const title = req.body.title;

  const newFolder = new Folder({ title });

  newFolder
    .save()
    .then(() => res.json("New Folder Created!"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  Folder.findById(req.params.id)
    .then((folder) => res.json(folder))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Folder.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title })
    .then(() => res.json("Folder Updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// might want to use put instead of post/update
router.route("/update/:id").post((req, res) => {
  Folder.findById(req.params.id)
    .then((folder) => {
      folder.title = req.body.title;

      folder
        .save()
        .then(() => res.json("Folder Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Folder.findByIdAndDelete(req.params.id)
    .then(() => res.json("Folder deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
