import { useState } from "react";
import { getToken, getUserData } from "../auth/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SecureRoute = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);

  const token = getToken();
  const userData = getUserData();

  const nav = useNavigate();

  function getUser(data) {
    let user = data;
    return user;
  }

  async function display() {
    if (!token) {
      nav("/home");
    } else {
      await getUser(userData);

      if (true) {
        setAdmin(true);
        nav("/admin");
      }
    }
  }

  useEffect(() => {
    display();
  }, [isAdmin]);

  return children;
};
