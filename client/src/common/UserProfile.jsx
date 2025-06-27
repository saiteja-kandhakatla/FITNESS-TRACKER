import React, { useEffect } from "react";
// import { useUser } from "../context/UserContext"; // Import the custom hook

function UserProfile() {
  // const { user, loading } = useUser(); // Access user data from context

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="user-profile">
      {user ? (
        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar">
              <img
                src={user.avatar || "https://via.placeholder.com/150"} // Default image if no avatar
                alt="User Avatar"
                className="avatar-img"
              />
            </div>
            <div className="user-details">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="user-stats">
            <h3>Statistics</h3>
            <ul>
              <li>Workouts Completed: {user.workoutsCount}</li>
              <li>Goals Completed: {user.goalsCount}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
}

export default UserProfile;
