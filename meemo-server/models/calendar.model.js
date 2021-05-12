const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  title: "",
  allDay: Boolean,
  start: "",
  end: "",
  body: "",
  userId: "",
});

const CalAPI = mongoose.model("CalAPI", calendarSchema);

module.exports = CalAPI;
