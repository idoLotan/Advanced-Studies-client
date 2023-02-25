import Card from "../Layouts/Card/Card";

const Courses = ({
  courses,
  title,
  choseCourse,
  myCoursesIds = "",
  isOpen,
}) => {
  console.log("courses", courses);
  return (
    <div className="my-courses">
      <div className="cards-title">{title}</div>
      <div className=" courses row left">
        {courses.map(
          (course) =>
            course && (
              <Card
                currentCourse={course}
                Courses={courses}
                choseCourse={choseCourse}
                key={course._id}
                courseTitle={course.courseName}
                isOpen={isOpen}
                precent={
                  myCoursesIds && !myCoursesIds[course._id].length
                    ? 0
                    : (myCoursesIds[course._id]?.length * 100) /
                      course?.questions?.length
                }
              />
            )
        )}
      </div>
    </div>
  );
};

export default Courses;
