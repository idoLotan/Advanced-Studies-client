import axios from "axios";
import { useRef, useState } from "react";
import { baseUrl, postImage } from "../axios";
import InputFile from "../Layouts/InputFile/InputFile";
export const AddCourse = () => {
  const courseTextRef = useRef();
  const [message, setMessage] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [cardImage, setCardImage] = useState([]);
  const [pageImage, setPageImage] = useState([]);
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [courseContent, setCourseContent] = useState([]);

  const inputRefs = useRef([]);

  async function saveCourse() {
    handleSubmit();
    let data = {
      courseName: courseName,
      courseText: courseTextRef.current.value,
      courseContent: courseContent,
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

  const renderDynamicInputs = () => {
    return dynamicInputs.map((input, index) => {
      const name = `input-${index}`;

      return (
        <div className="add-content-unit left" key={index}>
          <i
            className="fas fa-times"
            onClick={() => removeDynamicInput(index)}
          />
          <div>
            <input
              className={
                input.type == "text"
                  ? "custom-content-input-text"
                  : "custom-content-input "
              }
              type={input.type}
              placeholder={input.placeholder}
              ref={(el) => (inputRefs.current[index] = el)}
              name={name}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [name]:
                    input.type == "file" ? e.target.files[0] : e.target.value,
                })
              }
            />
          </div>
        </div>
      );
    });
  };

  const addDynamicInput = (type) => {
    setDynamicInputs([
      ...dynamicInputs,
      {
        type: type,
        placeholder: `Course Content ${dynamicInputs.length + 1} paragraph`,
      },
    ]);
  };

  const removeDynamicInput = (index) => {
    inputRefs.current = inputRefs.current.filter((_, i) => i !== index); // Remove input ref
    setDynamicInputs(
      dynamicInputs.filter((_, i) => {
        console.log(i, index);
        return i !== index;
      })
    );
  };

  async function handleSubmit() {
    const refs = inputRefs.current.filter((el) => el !== null); // filter out null values
    const newData = [];
    for (const el of refs) {
      if (el.type === "text") {
        newData.push(el.value);
      } else if (el.type === "file") {
        const referenceString = await postFile(el.files[0]);
        console.log("referenceString", referenceString);
        newData.push(referenceString);
      }
    }
    setCourseContent(newData);
    console.log(newData);
  }

  async function postFile(file) {
    try {
      if (file.type === "image/png") {
        const formData = new FormData();
        formData.append("image", file);
        const resp = await axios.post(`${baseUrl}/courses/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(resp);
        return resp.data;
      }
      if (file.type === "video/mp4") {
        const formData = new FormData();
        formData.append("video", file);
        const resp = await axios.post(`${baseUrl}/courses/videos`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(resp);
        return resp.data.Key;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
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
              <InputFile
                setFile={setCardImage}
                title={"card image"}
              ></InputFile>
            </div>
            <div className="row left">
              <InputFile
                setFile={setPageImage}
                title={"page image"}
              ></InputFile>
            </div>
          </div>
        </div>

        <div className="add-content pad">
          <textarea
            type="text"
            placeholder="Course intro Text..."
            ref={courseTextRef}
            className="pad "
          />
          <h5 className="pad">add content</h5>
          {renderDynamicInputs()}
          <button className="btn black" onClick={() => addDynamicInput("text")}>
            Add Text
          </button>
          <button className="btn black" onClick={() => addDynamicInput("file")}>
            Add File
          </button>
          <button className="btn black" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div className="row right pad">
          <button className="btn black" onClick={saveCourse}>
            Add
          </button>

          {message && <h4>{message}</h4>}
        </div>
      </div>
    </div>
  );
};
