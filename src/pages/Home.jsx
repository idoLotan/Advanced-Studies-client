import "../assets/index.css";
import homePagePhoto from "../assets/img/science.png";
import { useContext, useEffect, useState } from "react";
import CoursePage from "./CoursePage";
import { UserContext } from "../context/UserContext";
import { getMyCourses, getPopularCourses } from "../axios";
import { handleTokenExpiration, isLoggedIn } from "../auth/auth";
import useCourse from "../Hooks/useCourse";
import Courses from "../components/Courses";
import { getCourses } from "../helper";
import LastCourse from "../components/LastCourse";

const Home = () => {
  const { choseCourse, currentCourse, setToggledCourse, toggledCourse } =
    useCourse();
  const [popCourses, setPopCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myCoursesIds, setMyCoursesIds] = useState([]);
  console.log(popCourses);
  const context = useContext(UserContext);

  useEffect(() => {
    handleTokenExpiration();
    getMyCourses(setMyCourses, setMyCoursesIds);
    getCourses(getPopularCourses, setPopCourses);
  }, []);

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
            <div className="col left ">
              {!islogged && (
                <h2>
                  <b>Welcome to Advanced Studies!</b>
                </h2>
              )}

              {islogged && (
                <>
                  {context?.user?.firstName && (
                    <>
                      <h2>
                        <b>{`Hello ${context?.user?.firstName}! `} </b>
                      </h2>
                    </>
                  )}
                </>
              )}
              <h3>ready to discover new ideas and expand your knowledge?</h3>
            </div>
            <div className=" row right">
              <img src={homePagePhoto} className="homePagePhoto"></img>
            </div>
          </div>
          <div className="fade-in">
            {islogged && (
              <>
                <LastCourse choseCourse={choseCourse}></LastCourse>
                <Courses
                  courses={myCourses}
                  title={"My Courses"}
                  choseCourse={choseCourse}
                  myCoursesIds={myCoursesIds}
                  isOpen={true}
                />
              </>
            )}
            <Courses
              courses={popCourses}
              title={"Popular Courses"}
              choseCourse={choseCourse}
              handleImageLoaded={handleImageLoaded}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
