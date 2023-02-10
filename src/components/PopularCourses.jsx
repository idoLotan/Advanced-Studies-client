import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Card from "../Layouts/Card/Card";

const PopularCourses = ({ choseCourse }) => {
  const [popCourses, setPopCourses] = useState([]);

  console.log("popCourses", popCourses);

  useEffect(() => {
    getPopularCourses();
    console.log(popCourses);
  }, []);

  async function getPopularCourses() {
    try {
      console.log(`${baseUrl}/courses/popular`);
      const temp = await axios.get(`${baseUrl}/courses/popular`);
      console.log(temp);
      setPopCourses(temp.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="popular-classes ">
      <div className="cards-title">Popular Classes</div>
      <div className="classes ">
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
