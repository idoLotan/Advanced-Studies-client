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
import { isLoggedIn } from "../auth/auth";
import useCourse from "../Hooks/useCourse";
import Courses from "../components/Courses";
import { getCourses, getUser } from "../helper";

const Home = () => {
  const { choseCourse, currentCourse, setToggledCourse, toggledCourse } =
    useCourse();

  const [popCourses, setPopCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myCoursesIds, setMyCoursesIds] = useState([]);

  useEffect(() => {
    const user = getUser();
    if (user) {
      setMyCoursesIds(user.courses);
      getCourses(getMyCourses, setMyCourses);
    }
    getCourses(getPopularCourses, setPopCourses);
  }, []);

  const context = useContext(UserContext);
  const islogged = isLoggedIn();

  function handleImageLoaded() {
    setIsLoading(false);
  }

  return (
    <div className="home-page   ">
      {toggledCourse ? (
        <CoursePage
          currentCourse={currentCourse}
          setToggledCourse={setToggledCourse}
        />
      ) : (
        <div>
          <div className="welcome-section row between">
            <h2 className="col left ">
              {!islogged && <b>Wellcom to Advanced Studies!</b>}

              {islogged && (
                <>
                  <b>{`Hello ${context?.user?.firstName}! `}</b>
                  <b>{`ready to discover new ideas and expand your knowledge?`}</b>
                </>
              )}
            </h2>
            <div className=" row right">
              <img src={homePagePhoto} className="homePagePhoto"></img>
            </div>
          </div>
          <div
            style={{ display: isLoading ? "none" : "block" }}
            className="fade-in"
          >
            {islogged && (
              <Courses
                courses={myCourses}
                title={"my Courses"}
                choseCourse={choseCourse}
                myCoursesIds={myCoursesIds}
                isOpen={true}
                handleImageLoaded={handleImageLoaded}
              />
            )}
            <Courses
              courses={popCourses}
              title={"Popular Courses"}
              choseCourse={choseCourse}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
