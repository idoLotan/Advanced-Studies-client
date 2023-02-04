import React from "react";
import Card from "../Layouts/Card/Card";

const Search = ({ searchClasses, choseClass }) => {
  const courses = searchClasses?.data?.data;

  return (
    <div className="search">
      <div className="search-grid">
        {courses?.map((course) => (
          <Card
            currentClass={course}
            courses={courses}
            choseClass={choseClass}
            id={course?.id}
            key={course?.id}
            classTitle={course.courseName}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
