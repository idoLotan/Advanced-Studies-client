import Card from "../Layouts/Card/Card";

const Courses = ({
  handleImageLoaded,
  courses,
  title,
  choseCourse,
  myCoursesIds = "",
  isOpen,
}) => {
  const coursesToRender = courses?.filter((course) => {
    const courseId = course?._id;
    const completed =
      myCoursesIds[courseId]?.length === course?.questions?.length;
    return !completed;
  });
  return (
    <div className="courses">
      <div className="cards-title">{courses?.length ? title : ""}</div>
      <div className="courses row left">
        {coursesToRender?.map((course) => (
          <Card
            handleImageLoaded={handleImageLoaded}
            currentCourse={course}
            Courses={courses}
            choseCourse={choseCourse}
            key={course._id}
            courseTitle={course.courseName}
            isOpen={isOpen}
            precent={
              (myCoursesIds[course._id]?.length * 100) /
              course?.questions?.length
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
