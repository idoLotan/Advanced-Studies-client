import Card from "../Layouts/Card/Card";

const Courses = ({
  handleImageLoaded,
  courses,
  title,
  choseCourse,
  myCoursesIds = "",
  isOpen,
}) => {
  console.log("myCoursesIds courses compoennt", myCoursesIds);
  return (
    <div className="my-courses">
      <div className="cards-title">{title}</div>
      <div className=" courses row left">
        {courses.map(
          (course) =>
            course && (
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
            )
        )}
      </div>
    </div>
  );
};

export default Courses;
