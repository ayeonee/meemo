const router = require("express").Router();
let Note = require("../models/note.model");

router.route("/").get((req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const body = req.body.body;

  const newNote = new Note({ body });

  newNote
    .save()
    .then(() => res.json("New Note Created!"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  Note.findById(req.params.id)
    .then((note) => res.json(note.body))
    .catch((err) => res.status(400).json("Error: " + err));
});

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