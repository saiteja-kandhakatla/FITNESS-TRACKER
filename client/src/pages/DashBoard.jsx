import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Your Dashboard 💪</h1>
      <p className="dashboard-subtitle">Track your fitness journey all in one place.</p>

      <div className="dashboard-grid">
        <Link to="/workouts" className="dashboard-card">
          <h2>🏋️ Workouts</h2>
          <p>Log workouts, view routines, and monitor strength progress.</p>
        </Link>

        <Link to="/nutrition" className="dashboard-card">
          <h2>🥑 Nutrition</h2>
          <p>Track your meals and calorie intake with precision.</p>
        </Link>

        <Link to="/progress" className="dashboard-card">
          <h2>📊 Progress</h2>
          <p>Analyze trends and visualize your body and performance data.</p>
        </Link>

        <Link to="/goals" className="dashboard-card">
          <h2>🎯 Goals</h2>
          <p>Set, track, and smash your weekly or monthly fitness goals.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
