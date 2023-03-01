export const getCourses = async (getCourses, setCourses) => {
  console.log("getCourses, setCourses", getCourses, setCourses);
  const courses = await getCourses();
  console.log("courses", courses);
  setCourses(courses);
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("personObject"));
  return user;
};
