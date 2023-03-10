import { useState } from "react";
import { PostAuth } from "../axios";
import Button from "../Layouts/Button/Button";

export const SignUp = ({ setLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState([]);

  const handleSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password,
      userName,
    };

    const post = await PostAuth(userData);

    console.log("post", post[0]);

    if (post.length !== 0) {
      setError(post[0]);
      return;
    }
    setLogin(true);
    window.location.reload();
  };

  return (
    <div className="sign-up">
      <div className="content">
        <div className="title  row pad">
          <h3>Sign Up</h3>
        </div>
        <div className="col pad">
          <input
            className="loginInputs"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="loginInputs"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="loginInputs"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="loginInputs"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="loginInputs"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <Button icon={"times"} className="closeBtn" onClick={onClose}></Button>
        <div className="row">
          <button onClick={handleSubmit} className="btn black">
            Submit
          </button>
        </div>
        <div className="errorUser" style={{ color: "red" }}>
          {error}
        </div>
      </div>
    </div>
  );
};
