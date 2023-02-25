import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, getPopularCourses } from "../axios";
import Courses from "../components/Courses";

import Search from "../components/Search";
import { getCourses } from "../helper";
import useCourse from "../Hooks/useCourse";
import SearchBar from "../Layouts/SearchBar/SearchBar";
import CoursePage from "./CoursePage";

const CoursesPage = () => {
  const { choseCourse, currentCourse, toggledCourse, setToggledCourse } =
    useCourse();

  const [searchCourses, setSearchCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toggledResult, setToggledResult] = useState(false);
  const [popCourses, setPopCourses] = useState([]);

  useEffect(() => {
    getCourses(getPopularCourses, setPopCourses);
  }, []);

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
    <div className="classes-page  fade-in">
      {loader && <span class="loader"></span>}
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
              <>
                <Courses
                  courses={popCourses}
                  title={"Popular Courses"}
                  choseCourse={choseCourse}
                  myCoursesIds={""}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
