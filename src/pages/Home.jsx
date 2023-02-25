import "../assets/index.css";
import homePagePhoto from "../assets/img/science.png";
import { useContext, useEffect, useState } from "react";
import CoursePage from "./CoursePage";
import { UserContext } from "../context/UserContext";
import {
  getCoursesByField,
  getMyCourses,
  getPhyicsCourses,
  getPopularCourses,
} from "../axios";
import { isLoggedIn } from "../auth/localStorage";
import useCourse from "../Hooks/useCourse";
import Courses from "../components/Courses";
import { getCourses, getUser } from "../helper";

const Home = () => {
  const { choseCourse, currentCourse, setToggledCourse, toggledCourse } =
    useCourse();

  const [popCourses, setPopCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [physicsCourses, setPhysicsCourses] = useState([]);
  const [myCoursesIds, setMyCoursesIds] = useState([]);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setMyCoursesIds(user.courses);
      getCourses(getMyCourses, setMyCourses);
    }
    getCourses(getPopularCourses, setPopCourses);
    getCourses(getPhyicsCourses, setPhysicsCourses);
  }, []);

  const context = useContext(UserContext);
  const islogged = isLoggedIn();

  return (
    <div className="home-page   fade-in">
      {toggledCourse ? (
        <CoursePage
          currentCourse={currentCourse}
          setToggledCourse={setToggledCourse}
        />
      ) : (
        <>
          <div className="welcome-section row between">
            <h2 className="col left ">
              {!islogged && <b>Wellcom to Advanced Studies!</b>}

              {islogged && (
                <>
                  <b>{`Hello ${context?.user?.firstName} `}</b>
                  <b>{`Discover the world of science and math `}</b>
                </>
              )}
            </h2>
            <div className=" row right">
              <img src={homePagePhoto} className="homePagePhoto"></img>
            </div>
          </div>
          {/* 
          <PopularCourses
            choseCourse={choseCourse}
            currentCourse={currentCourse}
          /> */}
          <Courses
            courses={popCourses}
            title={"Popular Courses"}
            choseCourse={choseCourse}
            myCoursesIds={""}
          />
          <Courses
            courses={physicsCourses}
            title={"physicsCourses"}
            choseCourse={choseCourse}
            myCoursesIds={""}
          />

          {islogged && (
            // <MyCourses choseCourse={choseCourse} />
            <Courses
              courses={myCourses}
              title={"my Courses"}
              choseCourse={choseCourse}
              myCoursesIds={myCoursesIds}
              isOpen={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
