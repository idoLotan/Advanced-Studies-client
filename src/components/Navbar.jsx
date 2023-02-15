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
          icon={"home"}
          text={"Home"}
          onClick={handleHome}
          border={location.pathname === "/home" ? "2px solid black" : ""}
        />
        <Button
          icon={"paste"}
          text={"Courses"}
          border={location.pathname === "/courses" ? "2px solid black" : ""}
          onClick={handleCourses}
        />
      </div>
    </div>
  );
};

export default Navbar;
