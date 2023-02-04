import { useState } from "react";
import { getToken, getUserData } from "../auth/localStorage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const SecureRoute = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);

  const token = getToken();
  const userData = getUserData();
  console.log("userData", userData);
  const nav = useNavigate();

  function getUser(data) {
    let user = data;
    return user;
  }

  async function display() {
    if (!token) {
      console.log("token", token);
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

// import { useState, useEffect } from "react";
// import { getToken, getUserData } from "../auth/localStorage";
// import { useNavigate } from "react-router-dom";

// export const SecureRoute = ({ children }) => {
//   const [isAdmin, setAdmin] = useState(false);
//   const token = getToken();
//   const userData = getUserData();
//   const nav = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       nav("/home");
//     } else if (userData.permissions !== "admin") {
//       setAdmin(true);
//       nav("/home");
//     }
//   }, [token, userData, nav]);

//   return children;
// };
