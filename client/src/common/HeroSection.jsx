// import React from "react";
// import "./HeroSection.css";

// import { Link } from "react-router-dom";

// export default function HeroSection() {
//   return (
//     <section className="hero">
//       <div className="hero-content">
//         <h1>Track Your Fitness Journey</h1>
//         <p>
//           Stay motivated, monitor progress, and crush your goals with FitTrack.
//         </p>
//         <Link to="signin">
//         <button className="hero-btn">Get Started</button>
//         </Link></div>
//       <div className="hero-image">
//         <img src="https://images.everydayhealth.com/images/healthy-living/fitness/everything-you-need-know-about-fitness-1440x810.jpg?sfvrsn=2fee0a3b_5" alt="Fitness Illustration" />
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Track Your Fitness Journey</h1>
        <p>
          Stay motivated, monitor progress, and crush your goals with FitTrack.
        </p>
        <Link to="/signin">
          <button className="hero-btn">Get Started</button>
        </Link>
      </div>
      <div className="hero-image">
        <img
          src="https://i.pinimg.com/736x/f7/28/c6/f728c6d6fd253a03e1573f889a30dc71.jpg"
          alt="Fitness Motivation"
        />
      </div>
    </section>
  );
}
