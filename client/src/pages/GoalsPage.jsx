import React, { useState } from "react";
import "./GoalsPage.css";

function GoalsPage() {
  // Dummy data for current goals
  const initialGoals = [
    { name: "Calories", target: 2500, current: 1800 },
    { name: "Protein", target: 150, current: 120 },
    { name: "Carbs", target: 300, current: 200 },
    { name: "Fats", target: 70, current: 50 },
  ];

  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState({ name: "", target: 0, current: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (newGoal.name && newGoal.target > 0) {
      setGoals((prevGoals) => [...prevGoals, { ...newGoal, current: 0 }]);
      setNewGoal({ name: "", target: 0, current: 0 });
    }
  };

  return (
    <div className="goals-container">
      <div className="goals-header text-center">
        <h1>🏅 Your Fitness Goals</h1>
        <p>Track and set your fitness and nutrition goals</p>
      </div>

      {/* Current Goals */}
      <div className="goals-summary">
        <h3>Current Goals</h3>
        <div className="row">
          {goals.map((goal, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="goal-card card">
                <div className="card-body">
                  <h5 className="card-title">{goal.name}</h5>
                  <p className="card-text">Target: {goal.target}</p>
                  <p className="card-text">Current: {goal.current}</p>
                  <p className="card-text">
                    Progress: {Math.round((goal.current / goal.target) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Set New Goal */}
      <div className="new-goal-form">
        <h3>Set a New Goal</h3>
        <form onSubmit={handleGoalSubmit}>
          <div className="form-group">
            <label htmlFor="goalName">Goal Name</label>
            <input
              type="text"
              className="form-control"
              id="goalName"
              name="name"
              value={newGoal.name}
              onChange={handleInputChange}
              placeholder="Enter goal (e.g., Protein, Calories)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="goalTarget">Target</label>
            <input
              type="number"
              className="form-control"
              id="goalTarget"
              name="target"
              value={newGoal.target}
              onChange={handleInputChange}
              placeholder="Enter target value"
              required
            />
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Set Goal
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoalsPage;
