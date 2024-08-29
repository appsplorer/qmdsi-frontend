/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setAuth({
        isAuthenticated: true,
        accessToken: token,
      });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setAuth({
      isAuthenticated: true,
      accessToken: token,
    });
  };

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
