import axios from "axios";
import { useEffect, useState } from "react";
import { handleTokenExpiration } from "../auth/auth";
import { baseUrl, getCoursesByField } from "../axios";
import Courses from "../components/Courses";
import Search from "../components/Search";
import useCourse from "../Hooks/useCourse";
import SearchBar from "../Layouts/SearchBar/SearchBar";
import CoursePage from "./CoursePage";

const CoursesPage = () => {
  const { choseCourse, currentCourse, toggledCourse, setToggledCourse } =
    useCourse();

  const [searchCourses, setSearchCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toggledResult, setToggledResult] = useState(false);
  const [physicsCourses, setPhysicsCourses] = useState([]);
  const [chemistryCourses, setChemistryCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleTokenExpiration();
    async function getCourses() {
      const phyicsCourses = await getCoursesByField("phyics");
      const chemistryCourses = await getCoursesByField("chemistry");
      setPhysicsCourses(phyicsCourses);
      setChemistryCourses(chemistryCourses);
    }
    getCourses();
  }, []);

  function handleImageLoaded() {
    setIsLoading(false);
  }

  const onSearch = async (searchInput) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${baseUrl}/courses/search/?text=${searchInput}`
      );
      if (response.data.status == 404) {
        setSearchCourses([]);
        setToggledResult(false);
        setLoader(false);
        return;
      }
      setSearchCourses(response.data);
      setToggledResult(true);
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  return (
    <div
      className="classes-page  "
      style={{ display: isLoading ? "none" : "block" }}
    >
      {loader && <span className="loader"></span>}
      <div className="classes-page-section col pad">
        {toggledCourse ? (
          <>
            <CoursePage
              currentCourse={currentCourse}
              setToggledCourse={setToggledCourse}
            />
          </>
        ) : (
          <>
            <SearchBar onSearch={onSearch} />

            {toggledResult ? (
              <Search
                searchCourses={searchCourses}
                choseCourse={choseCourse}
                currntClass={currentCourse}
              ></Search>
            ) : (
              <div className="fade-in">
                <Courses
                  courses={physicsCourses}
                  title={"Physics Courses"}
                  choseCourse={choseCourse}
                  handleImageLoaded={handleImageLoaded}
                />
                <Courses
                  courses={chemistryCourses}
                  title={"chemistry Courses"}
                  choseCourse={choseCourse}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
