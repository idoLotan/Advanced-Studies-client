import React from "react";
import Card from "../Layouts/Card/Card";

const Search = ({ searchCourses, choseCourse }) => {
  console.log("searchCourses", searchCourses);
  return (
    <div className="search">
      <div className="search-grid">
        {searchCourses?.map(
          (course) =>
            course && (
              <Card
                currentCourse={course}
                courses={searchCourses}
                choseCourse={choseCourse}
                id={course?.id}
                key={course?.id}
                courseTitle={course?.courseName}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Search;
