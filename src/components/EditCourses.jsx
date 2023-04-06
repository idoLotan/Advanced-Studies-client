import React, { useEffect, useState } from "react";
import { baseUrl, config } from "../axios";
import axios from "axios";
import Section from "../Layouts/Section/Section";

const EditCourses = () => {
  const [courses, setCourses] = useState();
  console.log(courses);
  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/courses`, config);
        const courses = response.data;
        setCourses(courses);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCourses();
  }, []);

  return (
    <div className="edit-course">
      <h2 className="edit-course-title ">Edit</h2>
      {courses &&
        courses.map((course) => (
          <Section
            courseName={course?.courseName}
            currentCourse={course}
            key={course._id}
          />
        ))}
    </div>
  );
};

export default EditCourses;
