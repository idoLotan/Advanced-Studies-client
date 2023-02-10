import React from "react";
import Card from "../Layouts/Card/Card";

const Search = ({ searchClasses, choseClass }) => {
  const courses = searchClasses?.data?.data;

  console.log("courses", courses);

  return (
    <div className="search">
      <div className="search-grid">
        {courses?.map((course) => (
          <Card
            currentCourse={course}
            courses={courses}
            choseCourse={choseClass}
            id={course?.id}
            key={course?.id}
            courseTitle={course.courseName}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
