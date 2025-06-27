const express = require("express");
const router = express.Router();
const Workout = require("../Models/Workout");

// CREATE Workout
router.post("/createWorkout", async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    const savedWorkout = await newWorkout.save();
    res.status(201).send(savedWorkout); 
  } catch (err) {
    res.status(500).send({ error: "Failed to add workout", message: err.message }); 
  }
});

// GET all workouts for a user
router.get("/getAllWorkouts/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId }).sort({ createdAt: -1 });

    if (workouts.length === 0) {
      return res.status(200).send({
        message: "No workouts found for this user.",
        workouts: [],
      });
    }

    res.status(200).send({
      message: "Workouts fetched successfully",
      workouts,
    });
  } catch (err) {
    res.status(500).send({
      error: "Failed to fetch workouts",
      message: err.message,
    });
  }
});

// DELETE a workout
router.delete("/deleteWorkout/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete workout", message: err.message });
  }
});

module.exports = router;
