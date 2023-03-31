import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, config } from "../axios";
import Button from "../Layouts/Button/Button";

const LastCourse = ({ choseCourse }) => {
  const [course, setCourse] = useState();

  useEffect(() => {
    async function getCourse() {
      try {
        const userData = await axios.get(`${baseUrl}/users/me`, config);
        const response = await axios.get(
          `${baseUrl}/courses/${userData?.data?.data?.lastCourse}`,
          config
        );
        setCourse(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    getCourse();
  }, []);

  return (
    <div className="pad">
      {course && (
        <>
          <div className="last-course-title">Pick up where you left off</div>
          <div className="last-course row between">
            <div className="row between">
              {course?.pageImgUrl && (
                <img
                  className="last-course-image "
                  src={`${baseUrl}/courses/images/${course?.pageImgUrl}`}
                ></img>
              )}

              <div className="last-course-name  pad">
                <h2>
                  <b>{course?.courseName}</b>
                </h2>
                <div className="last-course-text">{course?.courseText}</div>

                <Button
                  className="btn black last-course-btn"
                  onClick={() => {
                    choseCourse(course._id);
                  }}
                  text={"Resume course"}
                  icon={"play"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LastCourse;
