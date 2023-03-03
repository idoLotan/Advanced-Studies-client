import axios from "axios";
import { useState } from "react";
import { baseUrl, config } from "../axios";

const useCourse = () => {
  const [currentCourse, setCurrentCourse] = useState("");
  const [toggledCourse, setToggledCourse] = useState(false);

  async function rateAndSaveCourse(courseId) {
    try {
      const userJsonObject = localStorage.getItem("personObject");
      const userObject = JSON.parse(userJsonObject);
      const userId = userObject._id;
      const rateResponse = await axios.post(
        `${baseUrl}/courses/login/rate/${userId}`,

        {
          id: courseId,
        },
        config
      );
      console.log("rateResponse", rateResponse);
    } catch (err) {
      console.log(err);
    }
  }

  async function rateCourse(courseId) {
    const rateResponse = await axios.post(
      `${baseUrl}/courses/rate/${courseId}`,
      config
    );
    return rateResponse;
  }

  const choseCourse = async (id) => {
    const token = localStorage.getItem("Token");
    if (token) {
      try {
        const resp = await axios.get(`${baseUrl}/courses/${id}`, config);
        const course = resp?.data?.data;
        setCurrentCourse(course);
        setToggledCourse(!toggledCourse);
        rateAndSaveCourse(id);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const resp = await axios.get(`${baseUrl}/courses/${id}`, config);
        const course = resp?.data?.data;
        const response = await rateCourse(id);
        setCurrentCourse(course);
        setToggledCourse(!toggledCourse);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return { choseCourse, setToggledCourse, toggledCourse, currentCourse };
};

export default useCourse;
