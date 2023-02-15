import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../axios";
import InputFile from "../Layouts/InputFile/InputFile";

export const AddQuestions = () => {
  const [message, setMessage] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [file, setFile] = useState();
  const [question, setQuestion] = useState("");

  const handleCorrect = (e) => {
    setCorrectAnswer(e.target.value);
  };

  async function postImage(imageType, id, file) {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const resp = await axios.post(
        `${baseUrl}/courses/images/${imageType}/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(resp);
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

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
      const id = resp.data._id;
      postImage("question", id, file);
      setMessage(id ? "question added!" : "item already exist!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-question fade-in">
      <div className="pad">
        <h2>Add new questions </h2>
      </div>
      <div className="row left pad">
        <InputFile setFile={setFile} title={"question image"}></InputFile>
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
      <div className="pad">
        <h5>correct answer</h5>
        <select name="" id="" onChange={handleCorrect}>
          <option value="default" hidden></option>
          <option value="1">A</option>
          <option value="2">B</option>
          <option value="3">C</option>
          <option value="4">D</option>
        </select>
      </div>

      <div className="col right pad">
        <button onClick={saveQuestions} className="btn black">
          Add
        </button>
        {message && <h4>{message}</h4>}
      </div>
    </div>
  );
};
