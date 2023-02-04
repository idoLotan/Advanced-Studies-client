import React from "react";
import { baseUrl } from "../../axiosController";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./Card.css";

const Card = ({
  classes,
  classTitle,
  precent,
  isOpen,
  choseClass,
  currentClass = [""],
}) => {
  console.log("currentClass?.iconImgUrl", currentClass?.iconImgUrl);
  return (
    <div
      className="card  pad"
      onClick={() => {
        choseClass(currentClass._id, classes);
      }}
    >
      <div className="col between">
        <div className="class-title  pad">{classTitle}</div>

        {currentClass?.iconImgUrl && (
          <img
            src={`${baseUrl}/courses/images/${currentClass?.iconImgUrl}`}
            className="card-img pad"
          ></img>
        )}

        {isOpen && <ProgressBar percent={precent}></ProgressBar>}
      </div>
    </div>
  );
};

export default Card;
