const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  userId: String,
  payload: [
    new mongoose.Schema({
      id: { type: Number },
      schedule: { type: String },
      checked: { type: Boolean },
    }),
  ],
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
