import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Card from "../Layouts/Card/Card";

const MyCourses = ({ choseCourse }) => {
  const [myCourses, setMyCourses] = useState([]);
  const renderCourse = useRef([]);
  const user = JSON.parse(localStorage.getItem("personObject"));
  const myCoursesIds = user.courses;

  useEffect(() => {
    getMyCourses();
  }, []);

  async function getMyCourses() {
    let tempCourseList = [];
    try {
      for (let key in myCoursesIds) {
        console.log("`${baseUrl}/courses/${key}`", `${key}`);
        let temp = await axios.get(`${baseUrl}/courses/${key}`);
        console.log("temp", temp?.data?.data);
        tempCourseList.push(temp?.data?.data);
        renderCourse.current = tempCourseList;
      }
      console.log("tempCourseList", tempCourseList);
      setMyCourses(tempCourseList);
    } catch (err) {
      console.log(err);
    }
  }

  console.log("myCoursesIds", myCoursesIds["63e63b1940ea8f683e29a030"].length);

  const title = myCourses.length ? "My Courses" : "";
  const topFourCourses = myCourses.slice(0, 4);

  return (
    <div className="my-courses">
      <div className="courses">
        <div className="cards-title row  left">{title}</div>

        {topFourCourses.map(
          (course) =>
            course && (
              <Card
                currentCourse={course}
                Courses={myCourses}
                choseCourse={choseCourse}
                key={course._id}
                courseTitle={course.courseName}
                isOpen={true}
                precent={
                  !myCoursesIds[course._id].length
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

export default MyCourses;
