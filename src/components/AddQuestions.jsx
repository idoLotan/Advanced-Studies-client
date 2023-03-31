import { useEffect, useState } from "react";
export const AddQuestions = ({
  currentCourseName,
  onChange,
  setQuestionData,
}) => {
  const [message, setMessage] = useState([]);
  const [courseName, setCourseName] = useState(currentCourseName);
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setCourseName(currentCourseName);
  }, [currentCourseName]);

  useEffect(() => {
    let data = {
      question: question,
      optionalAnswers: [answerA, answerB, answerC, answerD],
      answer: correctAnswer,
      difficulty: 1,
      type: "question",
    };
    console.log(data);
    setQuestionData(data);
    onChange(data);
  }, [answerA, answerB, answerC, answerD, question, correctAnswer]);

  const handleCorrect = (e) => {
    setCorrectAnswer(e.target.value);
  };

  return (
    <div className="add-question fade-in">
      <div className="pad">
        <h5>Add new questions </h5>
      </div>

      <div className="pad">
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
        {/* <button onClick={onSave} className="btn black">
          Add
        </button> */}
        {message && <h4>{message}</h4>}
      </div>
    </div>
  );
};
