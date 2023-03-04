import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getToken, isLoggedIn, storeUserData } from "../auth/user";
import { baseUrl, config } from "../axios";

export const UserContext = createContext({ user: null, token: null });

const Provider = UserContext.Provider;

const token = localStorage.getItem("Token");

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  async function getMe() {
    const userData = await axios.get(`${baseUrl}/users/me`, config);
    setUser(userData.data.data);
    storeUserData(userData.data.data);
  }

  useEffect(() => {
    const isLogged = isLoggedIn();
    if (isLogged) {
      getMe();
    }
  }, []);

  const value = {
    user,
    token,
  };

  return <Provider value={value}>{children}</Provider>;
};
