
import React, { useState, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useUser();

  const handleLogout = () => {
    alert("Logged out successfully.");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log("Login status:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <header className="fitness-header">
      {/* Logo */}
      <div className="logo">
        <FontAwesomeIcon icon={faDumbbell} size="2x" className="me-2" />
        <Link to="/HomePage" className="logo-text">
          FitTrack
        </Link>
      </div>

      {/* Navigation */}
      {isLoggedIn && (
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/nutrition">Nutrition</Link>
          <Link to="/progress">Progress</Link>
        </nav>
      )}

      {/* Auth Buttons */}
      <div className="auth-section">
        {!isLoggedIn ? (
          <>
            <Link to="/signin" className="auth-btn secondary">Sign In</Link>
            <Link to="/signup" className="auth-btn secondary">Sign Up</Link>
          </>
        ) : (
          <Link to="/homepage">
          <button onClick={handleLogout} className="auth-btn">
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Sign Out
          </button>
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>☰</button>
    </header>
  );
}

export default Header;
