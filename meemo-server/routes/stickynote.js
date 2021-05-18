const router = require("express").Router();
let StickyNote = require("../models/stickynote.model");

router.route("/").get((req, res) => {
  StickyNote.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/user/:userId").get((req, res) => {
  StickyNote.find({ userId: req.params.userId })
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const body = req.body.body;
  const userId = req.body.userId;

  const newStickyNote = new StickyNote({ body, userId });

  newStickyNote
    .save()
    .then(() => res.json("New Note Created!"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  StickyNote.findById(req.params.id)
    .then((note) => res.json(note))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/user/:userId").put((req, res) => {
  StickyNote.findOneAndUpdate(
    { userId: req.params.userId },
    { body: req.body.body }
  )
    .then(() => res.json("Note Updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//회원탈퇴
router.route("/:id").delete((req, res) => {
  StickyNote.findByIdAndDelete(req.params.id)
    .then(() => res.json("Note deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
