import axios from "axios";
import { useState } from "react";
import { PostQuestions } from "../axios";
import { baseUrl } from "../axiosController";
import { Answer } from "./Answer";

export const AddQuestions = () => {
  const [message, setMessage] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState();
  const [question, setQuestion] = useState("");

  const handleCorrect = (e) => {
    setCorrectAnswer(e.target.value);
  };

  // async function postImage({ image }) {
  //   const id = await getCourseByName();
  //   const formData = new FormData();
  //   formData.append("image", image);

  //   const resp = await axios.post(
  //     `${baseUrl}/courses/images/${imageType}/${id}`,
  //     formData,
  //     {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     }
  //   );
  //   console.log(resp);
  //   return resp.data;
  // }

  const saveQuestions = async () => {
    let data = {
      question: question,
      optionalAnswers: [answerA, answerB, answerC, answerD],
      answer: correctAnswer,
      difficulty: 1,
    };
    try {
      const resp = await axios.post(
        `${baseUrl}/courses/questions/${courseName}`,
        data
      );
      console.log("resp", resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-question fade-in">
      <div className="pad">
        <h3>Add new questions </h3>
      </div>

      <div className="pad">
        <input
          type="text"
          placeholder="Course Name"
          onChange={(e) => setCourseName(e.target.value)}
        />
        <textarea
          placeholder="write your question..."
          className="pad"
          name="questions"
          onChange={(e) => setQuestion(e.target.value)}
        ></textarea>
      </div>
      <div className="pad">
        <input
          placeholder="Answer A"
          type="text"
          onChange={(e) => setAnswerA(e.target.value)}
          className="answer"
        />
        <input
          placeholder="Answer B"
          type="text"
          onChange={(e) => setAnswerB(e.target.value)}
          className="answer"
        />
        <input
          placeholder="Answer C"
          type="text"
          onChange={(e) => setAnswerC(e.target.value)}
          className="answer"
        />
        <input
          placeholder="Answer D"
          type="text"
          onChange={(e) => setAnswerD(e.target.value)}
          className="answer"
        />
      </div>
      <label htmlFor="">The correct answer </label>
      <select name="" id="" onChange={handleCorrect}>
        <option value="default" hidden></option>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
        <option value="4">D</option>
      </select>

      <div className="row right pad">
        <button onClick={saveQuestions} className="btn black">
          Add
        </button>
      </div>

      {message && <h4>{message}</h4>}
    </div>
  );
};
