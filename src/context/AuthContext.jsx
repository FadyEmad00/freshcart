import { createContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
