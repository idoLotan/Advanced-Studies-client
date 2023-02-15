import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Card from "../Layouts/Card/Card";

const PopularCourses = ({ choseCourse }) => {
  const [popCourses, setPopCourses] = useState([]);

  useEffect(() => {
    getPopularCourses();
    console.log(popCourses);
  }, []);

  async function getPopularCourses() {
    try {
      const temp = await axios.get(`${baseUrl}/courses/popular`);
      setPopCourses(temp.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="popular-classes ">
      <div className="cards-title">Popular Classes</div>
      <div className="courses row left">
        {popCourses?.map(
          (course) =>
            course && (
              <Card
                courses={popCourses}
                currentCourse={course}
                choseCourse={choseCourse}
                key={course._id}
                courseTitle={course.courseName}
                isOpen={false}
                precent={course.precent}
              />
            )
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
