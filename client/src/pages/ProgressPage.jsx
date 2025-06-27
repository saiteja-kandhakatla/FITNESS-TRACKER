import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // import context
import './ProgressPage.css';

function ProgressPage() {
  const { user } = useUser(); // dynamically get user from context
  const [workouts, setWorkouts] = useState([]);
  const [goalProgress, setGoalProgress] = useState(0);
  const [streaks, setStreaks] = useState(0);
  const [achievement, setAchievement] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProgressData = async () => {
      if (!user?._id) return;

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:1230/workouts/getAllWorkouts/${user._id}`);
        const data = response.data.workouts || [];

        setWorkouts(data);

        const totalWorkouts = data.length;
        const goal = 10;
        setGoalProgress((totalWorkouts / goal) * 100);

        // Dummy streak logic (optional – adjust as per real streak logic)
        const longestStreak = Math.max(
          ...data.map((w) => w.streak || 1) // default streak = 1 if not provided
        );
        setStreaks(isFinite(longestStreak) ? longestStreak : 0);

        setAchievement(
          totalWorkouts > 30
            ? "🏆 Workout Pro: 30+ Workouts!"
            : "💪 Keep Going! You're doing great."
        );
      } catch (err) {
        console.error("Error fetching progress data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [user]);

  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h1>Your Progress</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Total Workouts</h3>
              <p className="value">{workouts.length}</p>
              <p className="goal">Goal: 10 Workouts/Month</p>
            </div>
            <div className="metric-card">
              <h3>Calories Burned</h3>
              <p className="value">{totalCalories} kcal</p>
            </div>
            <div className="metric-card">
              <h3>Total Duration</h3>
              <p className="value">{totalDuration} mins</p>
            </div>
            <div className="metric-card">
              <h3>Goal Progress</h3>
              <div className="graph-container">
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                </div>
                <p>{Math.round(goalProgress)}% Complete</p>
              </div>
            </div>
          </div>

          <div className="streaks-achievements">
            <div className="streak">
              <h3>Longest Streak</h3>
              <p>{streaks} days</p>
            </div>
            <div className="achievement">
              <h3>Achievement</h3>
              <p>{achievement}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProgressPage;
