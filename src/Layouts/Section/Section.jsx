import React, { useState } from "react";
import "./Section.css";
import Button from "../Button/Button";
import Question from "../../components/Question";
import { Video } from "../../components/Video";
import { baseUrl } from "../../axios";
import ObjectID from "bson-objectid";

const Section = ({ courseName, currentCourse }) => {
  const [courseInfo, setCourseInfo] = useState(false);
  function isMongoObjectId(id) {
    return ObjectID.isValid(id);
  }

  function isAWSDocument(str) {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]|\\;:'",.<>/?-]{1,1024}$/;
    return regex.test(str);
  }

  return (
    <div className="section ">
      <div className="section-btn" onClick={() => setCourseInfo(!courseInfo)}>
        <div> {courseName}</div>
        <Button
          style={{ width: "100%", hight: "100%" }}
          icon="chevron-right"
        ></Button>
      </div>

      {courseInfo && (
        <div className="course-info">
          <h3>course name</h3>
          <textarea className="section-textarea">
            {currentCourse.courseName}
          </textarea>
          <h3>course text</h3>
          <textarea className="section-textarea">
            {currentCourse.courseText}
          </textarea>
          {currentCourse.courseContent.map((paragraph) =>
            isMongoObjectId(paragraph) ? (
              <Question
                questionId={paragraph}
                currentCourse={currentCourse}
                key={paragraph}
              />
            ) : isAWSDocument(paragraph) ? (
              paragraph.includes("mp4") ? (
                <Video paragraph={paragraph} key={paragraph} />
              ) : (
                <div className="row">
                  <img src={`${baseUrl}/courses/images/${paragraph}`}></img>
                </div>
              )
            ) : (
              <textarea className="section-textarea" key={paragraph}>
                {paragraph}
              </textarea>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Section;
