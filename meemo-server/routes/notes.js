const router = require("express").Router();
let Note = require("../models/note.model");

router.route("/").get((req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const parentId = req.body.parentId;
  const userId = req.body.userId;

  const newNote = new Note({ title, body, parentId, userId });

  newNote
    .save()
    .then(() => res.json("New Note Created!"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  Note.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/specif/:userId").get((req, res) => {
  Note.find({ userId: req.params.userId })
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/specif/:userId/:parentId").get((req, res) => {
  Note.find({ userId: req.params.userId, _id: req.params.parentId })
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Note.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title })
    .then(() => res.json("Note Updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// using put instead of post + update
router.route("/update/:id").post((req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      note.body = req.body.body;

      note
        .save()
        .then(() => res.json("Note Updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
