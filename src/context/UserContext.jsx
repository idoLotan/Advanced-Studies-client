import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({ user: null, token: null });

const Provider = UserContext.Provider;

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("Token");
  //   const user = JSON.parse(localStorage.getItem("personObject"));
  //   setToken(token);
  //   setUser(user);
  // }, []);
  const user = JSON.parse(localStorage.getItem("personObject"));
  const token = localStorage.getItem("Token");

  const value = {
    user,
    token,
  };

  return <Provider value={value}>{children}</Provider>;
};
