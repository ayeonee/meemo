const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calendarSchema = new Schema({
  title: "",
  start: "",
  end: "",
  body: "",
});

const CalAPI = mongoose.model("CalAPI", calendarSchema);

module.exports = CalAPI;
