import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // Import useUser
import "./WorkoutPage.css";

function WorkoutPage() {
  const { user } = useUser(); // get user from context

  const [workouts, setWorkouts] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    type: "",
    duration: "",
    date: "",
  });

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user?._id) return; // if user not ready, don't fetch

      setFetchLoading(true);
      try {
        const response = await axios.get(`http://localhost:1230/workouts/getAllWorkouts/${user._id}`);
        setWorkouts(response.data.workouts || []);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Failed to load workouts.");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchWorkouts();
  }, [user]); // depends on user

  const handleChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      setError("User not found. Please login again.");
      return;
    }

    setAddLoading(true);
    try {
      const response = await axios.post("http://localhost:1230/workouts/createWorkout", {
        ...newWorkout,
        userId: user._id,
      });

      const addedWorkout = response.data.workout || response.data;

      setWorkouts((prevWorkouts) => [...prevWorkouts, addedWorkout]);
      setNewWorkout({ name: "", type: "", duration: "", date: "" });
      setError(""); // Clear any old error
    } catch (err) {
      console.error("Error adding workout:", err);
      setError("Failed to add workout.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1230/workouts/deleteWorkout/${id}`);
      setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout._id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  return (
    <div className="workout-container">
      <h1>🏋️ Your Workouts</h1>

      <form onSubmit={handleSubmit} className="workout-form">
        <input
          type="text"
          name="name"
          placeholder="Workout Name"
          value={newWorkout.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Type (e.g., Cardio, Strength)"
          value={newWorkout.type}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (mins)"
          value={newWorkout.duration}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newWorkout.date}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={addLoading}>
          {addLoading ? "Adding..." : "Add Workout"}
        </button>
      </form>

      <div className="workout-list">
        {fetchLoading ? (
          <p>Loading workouts...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : workouts.length === 0 ? (
          <p>No workouts logged yet!</p>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id} className="workout-card">
              <h3>{workout.name}</h3>
              <p>Type: {workout.type}</p>
              <p>Duration: {workout.duration} min</p>
              <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(workout._id)}>❌ Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkoutPage;
