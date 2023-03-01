import axios from "axios";
import { useRef, useState } from "react";
import { baseUrl, postImage } from "../axios";

import InputFile from "../Layouts/InputFile/InputFile";

export const AddCourse = () => {
  const [message, setMessage] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [cardImage, setCardImage] = useState([]);
  const [pageImage, setPageImage] = useState([]);
  const courseTextRef = useRef();
  const text1stRef = useRef();
  const text2ndRef = useRef();
  const text3rdRef = useRef();
  const text4thRef = useRef();

  // async function getCourseIdByName() {
  //   const resp = await axios.get(
  //     `${baseUrl}/courses/name?courseName=${courseName}`
  //   );
  //   const id = resp.data.data._id;
  //   return id;
  // }

  async function saveCourse() {
    let data = {
      courseName: courseName,
      courseText: courseTextRef.current.value,
      courseContent: [
        text1stRef.current.value,
        text2ndRef.current.value,
        text3rdRef.current.value,
        text4thRef.current.value,
      ],
    };
    try {
      const resp = await axios.post(
        `${baseUrl}/courses/addCourse/${fieldName}`,
        data
      );
      console.log("resp", resp);
      const id = await resp.data._id;
      postImage("card", cardImage, id);
      postImage("page", pageImage, id);
      const itemAdded = resp.data._id;
      return setMessage(itemAdded ? "course added!" : "course already exist");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="add-course pad fade-in">
      <h2 className="pad">Add new Course</h2>
      <div className="row left">
        <div className=" pad">
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

          <div className="row left">
            <InputFile setFile={setCardImage} title={"card image"}></InputFile>
          </div>
          <div className="row left">
            <InputFile setFile={setPageImage} title={"page image"}></InputFile>
          </div>

          {/* <button className="btn black" onClick={() => postImage("card")}>
            img
          </button> */}
        </div>
      </div>
      <textarea type="text" placeholder="Course Text..." ref={courseTextRef} />
      <textarea
        type="text"
        placeholder="Course Content 1st paragraph"
        ref={text1stRef}
      />

      <textarea
        type="text"
        placeholder="Course Content 2nd paragraph"
        ref={text2ndRef}
      />
      <textarea
        type="text"
        placeholder="Course Content 3rd paragraph"
        ref={text3rdRef}
      />
      <textarea
        type="text"
        placeholder="Course Content 4th paragraph"
        ref={text4thRef}
      />

      <div className="row right pad">
        <button className="btn black" onClick={saveCourse}>
          Add
        </button>

        {message && <h4>{message}</h4>}
      </div>
    </div>
  );
};
