import React, { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../Layouts/Button/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const handleCourses = useCallback(() => {
    navigate("/courses");
  }, [navigate]);

  return (
    <div className="navbar">
      <div className="row">
        <Button
          className={"bottom-line "}
          icon={"home"}
          text={"Home"}
          onClick={handleHome}
          style={location.pathname === "/home" ? "2px solid black" : ""}
        />
        <Button
          className={"bottom-line"}
          icon={"paste"}
          text={"Courses"}
          style={location.pathname === "/courses" ? "2px solid black" : ""}
          onClick={handleCourses}
        />
      </div>
    </div>
  );
};

export default Navbar;
