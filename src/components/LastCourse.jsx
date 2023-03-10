import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, config, getUserData } from "../axios";

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
    <div className="">
      <div className="last-course-title "> pick up where you left off</div>

      <div className="last-course row between">
        <div className="row left">
          {course?.pageImgUrl && (
            <img
              className="last-course-image"
              style={{ height: "200px" }}
              src={`${baseUrl}/courses/images/${course?.pageImgUrl}`}
            ></img>
          )}
        </div>
        <div className="col left">
          <h1> {course?.courseName}</h1>

          <button
            className="btn black"
            onClick={() => {
              choseCourse(course._id);
            }}
          >
            resome course
          </button>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default LastCourse;
