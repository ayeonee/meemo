const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stickynoteSchema = new Schema(
  {
    body: "",
    userId: "",
  },
  {
    timestamps: true,
  }
);

const StickyNote = mongoose.model("StickyNote", stickynoteSchema);

module.exports = StickyNote;
