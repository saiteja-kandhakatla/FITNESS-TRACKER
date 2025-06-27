import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // useUser hook
import "./HomePage.css";

function HomePage() {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="homepage">
      <section className="hero-section">
        <h1 className="hero-title">Welcome to FitTrack</h1>
        {user && <h2 className="welcome-msg">Welcome back, {user.name} 👋</h2>}
        <p className="hero-subtitle">
          Your ultimate companion for fitness, nutrition, and progress tracking.
        </p>
        <div className="hero-buttons">
          <Link to="/dashboard" className="hero-btn secondary">Go to Dashboard</Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>🧘 Workouts</h3>
          <p>Track your daily workouts, set goals, and stay consistent with your fitness routine.</p>
        </div>
        <div className="feature-card">
          <h3>🥗 Nutrition</h3>
          <p>Log your meals and analyze your daily macros for better health outcomes.</p>
        </div>
        <div className="feature-card">
          <h3>📈 Progress</h3>
          <p>Visualize your improvements over time with interactive charts and insights.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
