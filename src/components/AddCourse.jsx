import axios from "axios";
import { useRef, useState } from "react";
import { baseUrl } from "../axiosController";
import Uploader from "./Uploader";

export const AddCourse = () => {
  const [message, setMessage] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fieldName, setFieldName] = useState("");

  const courseTextRef = useRef();

  async function saveCourse() {
    let data = {
      courseName: courseName,
      courseText: courseTextRef.current.value,
    };
    try {
      const resp = await axios.post(
        `${baseUrl}/courses/addCourse/${fieldName}`,
        data
      );
      // const itemAdded = resp.data.payload.success;
      // return setMessage(itemAdded ? "field added!" : "field already exist");
      console.log("resp", resp);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="add-course pad fade-in">
      <div className="row left">
        <div className="col pad">
          <div className="add-course-content ">
            <input
              type="text"
              placeholder="Field Name"
              onChange={(e) => setFieldName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Course Name"
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <Uploader courseName={courseName} imageType={"card-img"}></Uploader>
          <Uploader courseName={courseName} imageType={"page-img"}></Uploader>
        </div>
      </div>
      <textarea type="text" placeholder="Course Text..." ref={courseTextRef} />
      <div className="row right pad">
        <button className="btn black" onClick={saveCourse}>
          Add
        </button>

        {message && <h4>{message}</h4>}
      </div>
    </div>
  );
};
