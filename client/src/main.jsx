// src/main.jsx or src/index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserProvider } from "../src/context/UserContext"; // Import UserProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
