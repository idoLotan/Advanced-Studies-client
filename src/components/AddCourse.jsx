import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseUrl, getFields, postFile, postImage } from "../axios";
import InputFile from "../Layouts/InputFile/InputFile";
import { AddQuestions } from "./AddQuestions";

export const AddCourse = () => {
  const courseTextRef = useRef();
  const [message, setMessage] = useState("");
  const [courseName, setCourseName] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldsList, setFieldsList] = useState("");
  const [cardImage, setCardImage] = useState([]);
  const [pageImage, setPageImage] = useState([]);
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [questionData, setQuestionData] = useState([]);
  const inputRefs = useRef([]);

  useEffect(() => {
    async function getFieldsList() {
      try {
        const fields = await getFields();
        setFieldsList(fields);
      } catch (err) {
        console.log(err);
      }
    }

    getFieldsList();
  }, []);

  const saveQuestions = async (questionData) => {
    try {
      const resp = await axios.post(
        `${baseUrl}/courses/questions/${courseName}`,
        questionData
      );
      console.log(resp);
      const id = resp.data._id;
      return id;
    } catch (err) {
      console.log(err);
    }
  };

  async function saveCourse() {
    const courseContent = await handleSubmit();

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

      if (input.type === "question") {
        return (
          <div className="add-content-unit left" key={index}>
            <i
              className="fas fa-times"
              onClick={() => removeDynamicInput(index)}
            />
            <AddQuestions
              setQuestionData={setQuestionData}
              onChange={(questionData) =>
                setFormValues({
                  ...formValues,
                  [name]: questionData,
                })
              }
            />
          </div>
        );
      }

      return (
        <div className="add-content-unit left" key={index}>
          <i
            className="fas fa-times"
            onClick={() => removeDynamicInput(index)}
          />
          <div>
            <div>
              <input
                className={
                  input.type === "text"
                    ? "custom-content-input-text"
                    : "custom-content-input "
                }
                type={input.type}
                placeholder={input.placeholder}
                name={name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [name]:
                      input.type === "file"
                        ? e.target.files[0]
                        : e.target.value,
                  })
                }
              />
              {formValues[name]?.name}
            </div>
          </div>
        </div>
      );
    });
  };

  const addFieldsList = () => {
    return (
      fieldsList && (
        <select
          onChange={(e) => setFieldName(e.target.value)}
          defaultValue="chose course"
        >
          <option selected>Choose a course</option>
          {fieldsList?.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      )
    );
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
    const newData = [];
    for (let key in formValues) {
      if (formValues[key].type === "question") {
        try {
          const id = await saveQuestions(formValues[key]);
          newData.push(id);
        } catch (error) {
          console.error(`Error saving questions: ${error}`);
        }
      } else if (
        formValues[key].type === "image/png" ||
        formValues[key].type === "video/mp4"
      ) {
        const referenceString = await postFile(formValues[key]);
        newData.push(referenceString);
      } else {
        newData.push(formValues[key]);
      }
    }
    return newData;
  }

  return (
    <div>
      <div className="add-course pad ">
        <h2 className="pad">Add new Course</h2>

        <div className="row left">
          <div className=" pad">
            <div className="add-course-content ">
              {addFieldsList()}
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
          <button
            className="btn black"
            onClick={() => addDynamicInput("question")}
          >
            Add Question
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
