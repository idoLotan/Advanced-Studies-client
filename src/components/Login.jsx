import { useState } from "react";
import { baseUrl } from "../axios";
import Button from "../Layouts/Button/Button";
import { useRef } from "react";
import axios from "axios";
import { storeToken, storeUserData } from "../auth/localStorage";

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

    console.log("resp", resp);
    const token = resp.data.data.access_token;
    const userObj = resp.data.data.user;
    storeToken(token);
    storeUserData(userObj);
    window.location.reload();
  };

  const renderError = () => {
    if (error.length !== 0) {
      return error.map((err) => <h3 key={err}>{err}</h3>);
    } else {
      return null;
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
        <Button icon={"times"} className="close-btn" onClick={onClose}></Button>
        <div className="row">
          <button className="btn black " onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="errorUser">{renderError()}</div>
      </div>
    </div>
  );
};
