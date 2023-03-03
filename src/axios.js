import axios from "axios";
import { getToken, storeToken, storeUserData } from "./auth/user";

export const baseUrl = "http://localhost:4000";

export const config = {
  headers: {
    authorization: getToken(),
  },
};

export const PostAuth = async (data) => {
  try {
    const returnValue = [];
    const response = await axios.post(`${baseUrl}/users/register`, data);
    console.log("response", response);

    storeToken(response.data.data.access_token);
    storeUserData(data.data);
  } catch (err) {
    console.log(err);
  }
};

export const postImage = async (imageType, image, id) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const resp = await axios.post(
      `${baseUrl}/courses/images/${imageType}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: getToken(),
        },
      }
    );
    console.log(resp);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

export const getPopularCourses = async () => {
  try {
    const temp = await axios.get(`${baseUrl}/courses/popular`, config);
    const PopCourses = temp.data.data;
    console.log("PopCourses", PopCourses);
    return PopCourses;
  } catch (err) {
    console.log(err);
  }
};

export const getPhysicsCourses = async () => {
  try {
    const temp = await axios.get(`${baseUrl}/courses/fields/phyiscs`, config);
    const PopCourses = temp.data.data;
    return PopCourses;
  } catch (err) {
    console.log(err);
  }
};

export const getMyCourses = async () => {
  const user = JSON.parse(localStorage.getItem("personObject"));
  const myCoursesIds = user.courses;
  console.log("myCoursesIds", myCoursesIds);
  let tempCourseList = [];
  try {
    for (let key in myCoursesIds) {
      let temp = await axios.get(`${baseUrl}/courses/${key}`, config);
      tempCourseList.push(temp?.data?.data);
    }
    return tempCourseList.reverse().splice(0, 4);
  } catch (err) {
    console.log(err);
  }
};

export const getCoursesByField = async (fieldName) => {
  console.log("fieldName", fieldName);
  try {
    const response = await axios.get(
      `${baseUrl}/courses/fields/name?fieldName=${fieldName}`,
      config
    );
    console.log("response", response);
    const coursesIds = response.data.course.splice(0, 4);
    let courseList = [];
    coursesIds.forEach(async (id) => {
      let temp = await axios.get(`${baseUrl}/courses/${id}`);
      courseList.push(temp?.data.data);
    });
    console.log(courseList);
    return courseList;
  } catch (err) {
    console.log(err);
  }
};

export const getPhyicsCourses = async () => {
  const phyicsCourses = await getCoursesByField("phyics");
  console.log("phyicsCourses", phyicsCourses);
  return phyicsCourses;
};

export const getChemistryCourses = async () => {
  const chemistryCourses = await getCoursesByField("chemistry");
  console.log("chemistryCourses", chemistryCourses);
  return chemistryCourses;
};
