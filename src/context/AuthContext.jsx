import React, { useContext, createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mgh_user"));
    } catch {
      return null;
    }
  });

  const login = (userObj, token) => {
    localStorage.setItem("mgh_token", token || "dummy");
    localStorage.setItem("mgh_user", JSON.stringify(userObj));
    setUser(userObj);
  };
  const logout = () => {
    localStorage.removeItem("mgh_token");
    localStorage.removeItem("mgh_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
// ✅ use this in any component
export const useAuth = () => useContext(AuthContext);
