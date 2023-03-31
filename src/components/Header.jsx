import { useEffect, useState, useReducer } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/atom.png";
import { getToken, getUserData, logout } from "../auth/auth";
import Button from "../Layouts/Button/Button";
import Modal from "../Layouts/Modal/Modal";
import Navbar from "./Navbar";
import { SignUp } from "../pages/SignUp";
import { Login } from "../pages/Login";

const Header = () => {
  const [isLogin, setLogin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const token = getToken();

  const navigate = useNavigate();

  useEffect(() => {
    permission();
    if (token) {
      setLogin(true);
    }
  }, [isLogin]);

  const initialState = { option: null };
  function reducer(state, action) {
    return { option: action.type };
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  function onClose() {
    dispatch({ type: "close" });
  }

  function toggleModal() {
    setIsShowing(!isShowing);
  }

  function permission() {
    if (!token) {
      return;
    }
    let user = getUserData();
    if (user.permissionId == 1) {
      setAdmin(true);
    }
  }

  function handleLogOut() {
    logout();
    window.location.reload();
    setLogin(false);
    setAdmin(false);
  }
  return (
    <header className="header">
      <div className="row between">
        <div className="row ">
          <div className="header-title">
            <div className="row pad">
              <h3>
                <b>Advanced Studies</b>
              </h3>
              <img src={logo} className="header-img"></img>
            </div>
          </div>
          <Navbar />
        </div>
        <Button icon={"bars"} onClick={toggleModal}></Button>

        {state.option === "login" && (
          <Login setLogin={setLogin} onClose={onClose} />
        )}

        {state.option === "signUp" && (
          <SignUp setLogin={setLogin} onClose={onClose} />
        )}

        {isShowing && (
          <Modal isShowing={isShowing} onClose={toggleModal} style={"modal"}>
            <div className="col left pad ">
              {!isLogin && (
                <>
                  <div
                    className="pointer pad"
                    onClick={() => dispatch({ type: "login" })}
                  >
                    Login
                  </div>
                  <div
                    className="pointer pad"
                    onClick={() => dispatch({ type: "signUp" })}
                  >
                    Sign Up
                  </div>
                </>
              )}

              {isLogin && (
                <div onClick={handleLogOut} className="pad pointer">
                  Log out
                </div>
              )}
              <div className="col left pad">
                {isAdmin && (
                  <NavLink to={"/admin"} className="nav-link">
                    Admin
                  </NavLink>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </header>
  );
};

export default Header;
