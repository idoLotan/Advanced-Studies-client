import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axiosController";
import Card from "../Layouts/Card/Card";

const PopularCourses = ({ choseClass }) => {
  const [popCourses, setPopCourses] = useState(null);

  useEffect(() => {
    getPopularCourses();
  }, []);

  async function getPopularCourses() {
    const temp = await axios.get(`${baseUrl}/courses/popular`);
    console.log(temp);
    setPopCourses(temp.data.data);
  }

  return (
    <div className="popular-classes ">
      <div className="cards-title">Popular Classes</div>
      <div className="classes ">
        {popCourses?.map((course) => (
          <Card
            classes={popCourses}
            currentClass={course}
            choseClass={choseClass}
            key={course._id}
            classTitle={course.courseName}
            isOpen={false}
            precent={course.precent}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
