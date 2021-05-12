const router = require("express").Router();
let CalAPI = require("../models/calendar.model");

router.route("/").get((req, res) => {
  CalAPI.find()
    .then((cal) => res.json(cal))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create").post((req, res) => {
  const { title, allDay, start, end, body, userId } = req.body;

  const newCalAPI = new CalAPI({ title, allDay, start, end, body, userId });

  newCalAPI
    .save()
    .then(() => res.json("New CalAPI Created!"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  CalAPI.findById(req.params.id)
    .then((cal) => res.json(cal))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  const { title, allDay, start, end, body, userId } = req.body;

  CalAPI.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: title,
      allDay: allDay,
      start: start,
      end: end,
      body: body,
      userId: userId,
    }
  )
    .then(() => res.json("CalAPI Updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// might want to use put instead of post/update
// router.route("/update/:id").post((req, res) => {
//   CalAPI.findById(req.params.id)
//     .then((cal) => {
//       folder.title = req.body.title;

//       folder
//         .save()
//         .then(() => res.json("Folder Updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/:id").delete((req, res) => {
  CalAPI.findByIdAndDelete(req.params.id)
    .then(() => res.json("CalAPI deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
