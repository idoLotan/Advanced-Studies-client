import axios from "axios";
import { useContext, useState } from "react";
import { baseUrl } from "../axios";
import { UserContext } from "../context/UserContext";

const useClass = () => {
  const [currentCourse, setCurrentCourse] = useState("");
  const [toggledCourse, setToggledCourse] = useState(false);
  const context = useContext(UserContext);

  const choseCourse = async (id, classesList) => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const resp = await axios.get(
          `${baseUrl}/courses/${id}`
          // {
          //   classId: id,
          // },
          // {
          //   headers: {
          //     Authorization: token,
          //   },
          // }
        );
        const course = resp?.data?.data;
        console.log("resp", resp);
        console.log("resp?.data?.data[0]", resp?.data.data);
        setCurrentCourse(course);
        setToggledCourse(!toggledCourse);
        console.log("currentCourse", currentCourse);
        // context.getUser();
      } catch (err) {
        console.log(err);
      }
    } else {
      // try {
      //   const resp = await axios.post(`${baseUrl}/class/notLogin/startClass`, {
      //     classId: id,
      //   });
      //   const currntClass = resp?.data?.data[0];
      //   setCurrntClass(currntClass);
      //   setToggledClass(!toggledClass);
      // } catch (err) {
      //   console.log(err);
      // }
    }
  };

  return { choseCourse, setToggledCourse, toggledCourse, currentCourse };
};

export default useClass;
