  import React from "react";
  import { createBrowserRouter, RouterProvider } from "react-router-dom";

  // Pages
  import SignUp from "./pages/SignUp";
  import SignIn from "./pages/SignIn";
  import HeroSection from "./common/HeroSection";
  import RootLayout from "./Layout/RootLayout";
  import HomePage from "./common/HomePage";
  import Dashboard from "./pages/DashBoard";
  import WorkoutPage from "./pages/WorkoutPage";
  // import ProtectedRoute from "./common/ProtectedRoute"; // can be dummy
  import UserProfile from "./common/UserProfile";
  import ProgressPage from "./pages/ProgressPage";
  import NutritionPage from "./pages/NutritionPage";
  import GoalsPage from "./pages/GoalsPage";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HeroSection /> },
        { path: "signup", element: <SignUp /> },
        { path: "signin", element: <SignIn /> },
        { path: "homepage", element: <HomePage /> },
        {
          path: "dashboard",
          element: (
              <Dashboard />
          ),
        },
        {
          path: "workouts",
          element: (
              <WorkoutPage />
          ),
        },
        {
          path:"profile",element: <UserProfile />
        },
        {
          path:"nutrition",element: <NutritionPage />
        },
        {
          path:"goals",element: <GoalsPage />
        },
        {
          path:"progress",element:<ProgressPage/>
        },
        { path: "*", element: <h1>404 - Page Not Found</h1> },
      ],
    },
  ]);

  function App() {
    return <RouterProvider router={router} />;
  }

  export default App;
