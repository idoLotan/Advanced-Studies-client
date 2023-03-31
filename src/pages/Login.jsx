import { useState } from "react";
import { baseUrl } from "../axios";
import Button from "../Layouts/Button/Button";
import { useRef } from "react";
import axios from "axios";
import { storeToken, storeUserData } from "../auth/auth";

export const Login = ({ onClose }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState([]);

  const handleSubmit = async () => {
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const resp = await axios.post(`${baseUrl}/users/login`, userData);
    console.log("resp", resp.data.status);
    console.log(resp.data.status == 404);
    if (resp.data.status == 404) {
      setError("user not found");
      return;
    } else {
      const token = resp.data.data.access_token;
      const userObj = resp.data.data.user;
      storeToken(token);
      storeUserData(userObj);
      window.location.reload();
    }
  };

  return (
    <div className="login">
      <div className="content">
        <div className="title">
          <h3>Login</h3>
        </div>
        <div className="col">
          <input
            className="loginInputs"
            type="text"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            type="password"
            className="loginInputs"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <Button
          icon={"times"}
          className="close-btn pad"
          onClick={onClose}
        ></Button>
        <div className="row">
          <button className="btn black " onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div style={{ color: "red" }} className="row ">
          {error}
        </div>
      </div>
    </div>
  );
};
