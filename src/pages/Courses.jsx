import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../axios";
import PopularCourses from "../components/PopularCourses";
import Search from "../components/Search";
import useClass from "../Hooks/useClass";
import SearchBar from "../Layouts/SearchBar/SearchBar";
import ClassPage from "./ClassPage";

const Courses = () => {
  const { choseCourse, currentCourse, toggledCourse, setToggledCourse } =
    useClass();

  const [searchInput, setSearchInput] = useState("");
  const [searchClasses, setSearchClasses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toggledResult, setToggledResult] = useState(false);

  const onSearch = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${baseUrl}/courses/search/?text=${searchInput}`
      );
      setSearchClasses(response);
    } catch (err) {
      console.log(err);
    }
    setTimeout(
      function () {
        setLoader(false);
      },
      [500]
    );
  };

  return (
    <div className="classes-page  fade-in">
      {loader && <span class="loader"></span>}
      <div className="classes-page-section col pad">
        {toggledCourse ? (
          <>
            <ClassPage
              currentCourse={currentCourse}
              setToggledCourse={setToggledCourse}
            />
          </>
        ) : (
          <>
            <h3 className="col pad ">
              <b>
                <div>Search </div>
                <div>Classes</div>
              </b>
            </h3>
            <SearchBar
              setSearchInput={setSearchInput}
              searchInput={searchInput}
              onSearch={onSearch}
              setToggledResult={setToggledResult}
            />
            {toggledResult ? (
              <Search
                searchClasses={searchClasses}
                choseCourse={choseCourse}
                currntClass={currentCourse}
              ></Search>
            ) : (
              <PopularCourses
                choseCourse={choseCourse}
                currentCourse={currentCourse}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
