import { createContext, useState } from "react";

// Create Context
export const MyContext = createContext();

// Create a Provider Component
export const MyProvider = ({ children }) => {
  const existingBgMode = JSON.parse(localStorage.getItem("bgMode")) || false;

  const [mode, setMode] = useState(existingBgMode);

  return (
    <MyContext.Provider value={{ mode, setMode }}>
      {children}
    </MyContext.Provider>
  );
};
