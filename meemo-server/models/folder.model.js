const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    title: "",
    userId: "",
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
