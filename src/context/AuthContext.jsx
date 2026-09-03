import { useState } from "react";
import { AuthContext } from "./auth.js";
import { readStorage, writeStorage } from "../utils/storage.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return readStorage(sessionStorage, "spmb_user");
  });

  const login = (userData) => {
    setUser(userData);

    writeStorage(sessionStorage, "spmb_user", userData);
  };

  const logout = () => {
    setUser(null);

    sessionStorage.removeItem("spmb_user");
  };

  const updateUser = (updates) => {
    setUser((currentUser) => {
      const updatedUser = { ...currentUser, ...updates };
      writeStorage(sessionStorage, "spmb_user", updatedUser);
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
