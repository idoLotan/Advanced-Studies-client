export const getCourses = async (getCourses, setCourses) => {
  const courses = await getCourses();
  setCourses(courses);
};

export const getUser = () => {
  const user = JSON.parse(localStorage.getItem("personObject"));
  return user;
};
