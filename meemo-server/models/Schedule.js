const mongoose = require("mongoose");

const scheuduleSchema = mongoose.Schema({
  userId: String,
  payload: [
    new mongoose.Schema({
      id: { type: Number },
      name: { type: String },
      place: { type: String },
      schedule: [
        new mongoose.Schema({
          index: { type: Number },
          date: { type: Number },
          startHour: { type: Number },
          startMin: { type: Number },
          endHour: { type: Number },
          endMin: { type: Number },
        }),
      ],
    }),
  ],
});

const Schedule = mongoose.model("Schedule", scheuduleSchema);
module.exports = { Schedule };
