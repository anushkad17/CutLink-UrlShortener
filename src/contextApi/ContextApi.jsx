import { createContext, useContext, useState, useEffect } from "react";

// Create context
const ContextApi = createContext();

// Provider component
export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load token from localStorage on first render
  useEffect(() => {
    const savedToken = localStorage.getItem("JWT_TOKEN");
    if (savedToken) {
      try {
        setToken(JSON.parse(savedToken));
      } catch (err) {
        console.error("Error parsing token from localStorage:", err);
        setToken(null);
      }
    }
  }, []);

  // Optional: Sync token changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
    }
  }, [token]);

  const contextValue = {
    token,
    setToken,
  };

  return (
    <ContextApi.Provider value={contextValue}>
      {children}
    </ContextApi.Provider>
  );
};

// Custom hook to use the context
export const useStoreContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useStoreContext must be used within a ContextProvider");
  }
  return context;
};
