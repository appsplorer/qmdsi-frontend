import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
  });

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuth({
        isAuthenticated: true,
        accessToken: token,
      });
    }
  }, []);

  // Function to log in and save the token
  const login = (token) => {
    localStorage.setItem("access_token", token);
    setAuth({
      isAuthenticated: true,
      accessToken: token,
    });
  };

  // Function to log out and clear the token
  const logout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      accessToken: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
