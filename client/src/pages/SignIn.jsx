// src/pages/SignIn.jsx
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ✅ Import context
import "./SignIn.css";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { setUser, setIsLoggedIn } = useUser(); // ✅ Access user and login state from context

  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post("http://localhost:1230/user/login", data)
      .then((response) => {
        const { message, user, token } = response.data;

        if (message === "Login successful") {
          alert("Login successful");

          // ✅ Update context with user and token
          setUser({ ...user, token });
          setIsLoggedIn(true);

          // Optionally you can save token to localStorage here if you want persistence after refresh
          // localStorage.setItem("token", token);

          navigate("/homepage");
        } else {
          alert("Invalid credentials, please try again.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred, please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="signin-page">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
          <div className="form-group">
            <label>Email address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
