import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:1230/user/signup", data)
      .then((response) => {
        const { message } = response.data;

        if (message === "User already exists") {
          alert("User already exists, please login instead.");
        } else if (message === "User created successfully") {
          alert("User created successfully, please login.");
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
        alert("Something went wrong. Please try again.");
      });

    reset();
  };

  return (
    <div className="signup-page">
      <div className="form-wrapper">
        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <div className="form-group">
            <label>Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className={errors.name ? "input-error" : ""}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              className={errors.email ? "input-error" : ""}
              placeholder="example@email.com"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length is 6 characters",
                },
              })}
              type="password"
              className={errors.password ? "input-error" : ""}
              placeholder="Enter password"
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
              type="password"
              className={errors.confirmPassword ? "input-error" : ""}
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 18,
                  message: "Minimum age is 18",
                },
                valueAsNumber: true,
              })}
              type="number"
              className={errors.age ? "input-error" : ""}
              placeholder="Enter your age"
            />
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
