import React, { useState } from "react";
import image from "../assets/img/lamp-ending-page.png";

const EndPage = ({ setToggledCourse, currentCourse }) => {
  const [isLoading, setIsLoading] = useState(true);

  function handleImageLoaded() {
    setIsLoading(false);
  }
  return (
    <div
      className="end-page fade-in"
      style={{ display: isLoading ? "none" : "block" }}
    >
      <div className="content">
        <div className="row">
          <h2 className="end-page-title pad">Well Done!</h2>
        </div>
        <p className="row ">{`you finish the ${currentCourse.courseName} course, keep up the good work! `}</p>
        <div className="row pad">
          <img
            src={image}
            onLoad={handleImageLoaded}
            style={{ width: "var(--img-sm)" }}
          />
        </div>
        <div className="row right pad">
          <button
            className="btn black start-class-btn"
            onClick={(toggledCourse) => {
              setToggledCourse(!toggledCourse);
            }}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndPage;
