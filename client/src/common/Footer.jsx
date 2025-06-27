import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="fitness-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-dumbbell">💪</span>
          <span className="footer-brand">FitTrack</span>
        </div>

        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            📸
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            🐦
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            📘
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FitTrack. All rights reserved.</p>
        <a href="#top" className="back-to-top">↑ Back to Top</a>
      </div>
    </footer>
  );
}

export default Footer;
