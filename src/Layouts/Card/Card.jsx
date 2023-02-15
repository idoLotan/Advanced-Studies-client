import React from "react";
import { baseUrl } from "../../axios";
import coursePage from "../../pages/CoursePage";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Card.css";

const Card = ({
  courses,
  courseTitle,
  precent,
  isOpen,
  choseCourse,
  currentCourse = [""],
}) => {
  console.log("currentCourse", currentCourse._id);
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
          ></img>
        )}

        {isOpen && <ProgressBar percent={precent}></ProgressBar>}
      </div>
    </div>
  );
};

export default Card;
