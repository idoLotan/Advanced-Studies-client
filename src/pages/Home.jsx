import "../assets/index.css";
import homePagePhoto from "../assets/img/science.png";
import { useContext, useEffect, useState } from "react";
import ClassPage from "./ClassPage";
import useClass from "../Hooks/useClass";
import MyClasses from "../components/MyClasses";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { baseUrl } from "../axios";
import PopularCourses from "../components/PopularCourses";
import { isLoggedIn } from "../auth/localStorage";

const Home = () => {
  const { choseCourse, currentCourse, setToggledCourse, toggledCourse } =
    useClass();
  const [recomendedClass, setRecomendedClass] = useState([]);
  const context = useContext(UserContext);
  const myClassesIds = context?.user?.myClass;
  const islogged = isLoggedIn();

  useEffect(() => {
    getRecomendedClasses();
  }, []);

  const getRecomendedClasses = async () => {
    const token = localStorage.getItem("Token");

    try {
      const resp = await axios.get(`${baseUrl}/users/recommended`, {
        headers: {
          Authorization: token,
        },
      });

      setRecomendedClass(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home-page   fade-in">
      <canvas id="canvas" width="500" height="500"></canvas>

      {toggledCourse ? (
        <ClassPage
          currentCourse={currentCourse}
          setToggledCourse={setToggledCourse}
        />
      ) : (
        <>
          <div className="welcome-section row between ">
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
          {islogged && (
            <MyClasses choseCourse={choseCourse} myClassesIds={myClassesIds} />
          )}

          <PopularCourses
            choseCourse={choseCourse}
            currentCourse={currentCourse}
          />
        </>
      )}
    </div>
  );
};

export default Home;
