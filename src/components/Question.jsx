import axios from "axios";
import { config } from "../axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Button from "../Layouts/Button/Button";
import ButtonCol from "../Layouts/Button/ButtonCol";

const Question = ({ questionId, currentCourse }) => {
  const [chosenAnswer, setChosenAnswer] = useState("");
  const [submit, setSubmit] = useState("");
  const [styles, setStyles] = useState("");
  const [answerSubmited, setAnswerSubmited] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [qestion, setQestion] = useState();

  useEffect(() => {
    async function getQuestion() {
      try {
        const resp = await axios.get(
          `${baseUrl}/courses/questions/${questionId}`,
          config
        );
        console.log(resp.data.data);
        setQestion(resp.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getQuestion();
  }, []);

  function handleImageLoaded() {
    setIsLoading(false);
  }

  function onSubmit() {
    if (chosenAnswer == qestion.answers) {
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
      console.log(qestion);
      console.log(user);
      console.log(currentCourse);
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

  //   function nextQuestion() {
  //     reset();
  //   }

  //   function previousQuestion() {
  //     if (count > 0) {
  //       reset();
  //     }
  //   }

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
      className="content fade-in"
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

              {/* <button className="btn black" onClick={nextQuestion}>
                Next qestion
              </button> */}
            </div>
          </>
        ) : (
          <>
            <div className="row between" style={{ width: "100%" }}>
              <div className="col pad"></div>
              <div className="row right">
                {/* <button
                  className="btn black"
                  onClick={previousQuestion}
                  style={{ display: previousBtnDisplay }}
                >
                  previous qestion
                </button> */}
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

export default Question;
