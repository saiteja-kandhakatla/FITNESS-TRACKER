const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., Cardio, Strength
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    date: {
      type: String, // or Date if preferred
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
