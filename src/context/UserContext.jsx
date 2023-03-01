import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../axios";

export const UserContext = createContext({ user: null, token: null });

const Provider = UserContext.Provider;

const user = JSON.parse(localStorage.getItem("personObject"));
const token = localStorage.getItem("Token");

export const UserProvider = ({ children }) => {
  async function getMe() {
    const user = JSON.parse(localStorage.getItem("personObject"));
    const data = { email: user.email };
    const userData = await axios.get(`${baseUrl}/users/email`, data);
    console.log("user", userData);
  }

  console.log("usersdsfd");
  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  getMe();

  useEffect(() => {
    // const token = localStorage.getItem("Token");
    // const user = JSON.parse(localStorage.getItem("personObject"));
    // setToken(token);
    // setUser(user);
  }, []);

  const value = {
    user,
    token,
  };

  return <Provider value={value}>{children}</Provider>;
};
