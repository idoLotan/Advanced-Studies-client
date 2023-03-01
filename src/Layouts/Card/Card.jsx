import React from "react";
import { baseUrl } from "../../axios";
import coursePage from "../../pages/CoursePage";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Card.css";

const Card = ({
  handleImageLoaded,
  courses,
  courseTitle,
  precent,
  isOpen,
  choseCourse,
  currentCourse = [""],
}) => {
  return (
    <div
      className="card  pad"
      onClick={() => {
        choseCourse(currentCourse._id, courses);
      }}
    >
      <div className="col between">
        <div className="class-title  pad">{courseTitle}</div>

        {currentCourse?.iconImgUrl && (
          <img
            src={`${baseUrl}/courses/images/${currentCourse?.iconImgUrl}`}
            className="card-img pad"
            onLoad={handleImageLoaded}
          ></img>
        )}

        {isOpen && <ProgressBar percent={precent}></ProgressBar>}
      </div>
    </div>
  );
};

export default Card;
