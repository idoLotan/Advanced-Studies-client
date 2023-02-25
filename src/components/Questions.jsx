import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../axios";
import Button from "../Layouts/Button/Button";
import ButtonCol from "../Layouts/Button/ButtonCol";

const Questions = ({
  setCount,
  count,
  previousBtnDisplay,
  courseQuestions,
  currentCourse,
}) => {
  const [chosenAnswer, setChosenAnswer] = useState("");
  const [submit, setSubmit] = useState("");
  const [styles, setStyles] = useState("");
  const [answerSubmited, setAnswerSubmited] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const qestion = courseQuestions[count];

  function handleImageLoaded() {
    setIsLoading(false);
  }

  function onSubmit() {
    if (chosenAnswer == qestion.answer) {
      submitAnswer();
      setSubmit("right");
      setStyles("var(--clr-success)");
    } else {
      setSubmit("wrong");
      setStyles("var(--clr---clr-danger)");
    }
    setAnswerSubmited(true);
    setDisabled(true);
  }

  async function submitAnswer() {
    try {
      const token = localStorage.getItem("Token");
      const user = JSON.parse(localStorage.getItem("personObject"));
      if (token) {
        const resp = await axios.post(
          `${baseUrl}/courses/login/submitAnswer/${qestion._id}`,
          {
            courseId: currentCourse._id,
            userId: user._id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  function reset() {
    setAnswerSubmited(false);
    setDisabled(false);
    setSubmit("");
    setChosenAnswer("");
  }

  function nextQuestion() {
    setCount((c) => c + 1);
    reset();
  }

  function previousQuestion() {
    if (count > 0) {
      setCount((c) => c - 1);
      reset();
    }
  }

  const commonProps = {
    className: "btn gray",
    setChosenAnswer,
    chosenAnswer,
    submit,
    styles,
    disabled,
  };

  return (
    <div
      className="class-page-content fade-in"
      style={{ display: qestion?.questionImg && isLoading ? "none" : "block" }}
    >
      <div className="row">
        {qestion?.questionImg && (
          <img
            src={`${baseUrl}/courses/images/${qestion?.questionImg}`}
            onLoad={handleImageLoaded}
            className="qestion-img pad"
          />
        )}
      </div>

      <div className="row between">
        <div className="col left">
          <div className="qestion-text">
            <h4>
              <b>{`Qestion ${count + 1}`}</b>
            </h4>
            <p>{qestion?.question}</p>
          </div>
        </div>

        <div className="col right ">
          {qestion?.optionalAnswers.map((answer, index) => (
            <ButtonCol
              key={index}
              text={answer}
              qestionIndex={index + 1}
              {...commonProps}
            />
          ))}
        </div>
      </div>
      <div className="submit-btn col right">
        {answerSubmited ? (
          <>
            <div className="row  right">
              {submit === "wrong" && (
                <Button
                  icon={"redo"}
                  size={"fa-xs"}
                  text={"wrong try again"}
                  className="btn black"
                  onClick={reset}
                ></Button>
              )}

              <button className="btn black" onClick={nextQuestion}>
                Next qestion
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row between" style={{ width: "100%" }}>
              <div className="col pad"></div>
              <div className="row right">
                <button
                  className="btn black"
                  onClick={previousQuestion}
                  style={{ display: previousBtnDisplay }}
                >
                  previous qestion
                </button>
                <button
                  className="btn black"
                  onClick={onSubmit}
                  disabled={!chosenAnswer}
                >
                  submit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;
