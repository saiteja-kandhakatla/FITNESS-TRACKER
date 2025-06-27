import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user is null initially
  const [isLoggedIn, setIsLoggedIn] = useState(false); // not logged in initially

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to easily use the UserContext
export const useUser = () => useContext(UserContext);
