const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    task: {
      type: String,
      required: [true, "please add a task"],
    },
    completed: {
      type: Boolean,
      required: [true, "please add a status"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Tasks", taskSchema)