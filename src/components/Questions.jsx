import axios from "axios";
import React, { useContext, useState } from "react";
import { baseUrl } from "../axios";
import { UserContext } from "../context/UserContext";
import Button from "../Layouts/Button/Button";
import ButtonCol from "../Layouts/Button/ButtonCol";
import Animation from "./Animation";

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
  const [animation, setAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(UserContext);
  const qestion = courseQuestions[count];

  console.log("qestion", qestion);

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
      if (token) {
        const resp = await axios.post(
          `${baseUrl}/class/login/submitAnswer/${qestion._id}`,
          {
            classId: currentCourse._id,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }
      context.getUser();
    } catch (err) {
      console.log(err);
    }
  }

  function postSubmit() {
    setSubmit(false);
    setAnswerSubmited(false);
    setDisabled(false);
    setSubmit("");
  }

  function counter() {
    setCount(count + 1);
    setSubmit(false);
    setAnswerSubmited(false);
    setDisabled(false);
    setSubmit("");
    setChosenAnswer("");
  }

  function goBack() {
    if (count > 0) {
      setCount(count - 1);
      setSubmit(false);
      setAnswerSubmited(false);
      setSubmit("");
      setChosenAnswer("");
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
    <div className="class-page-content fade-in">
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
      <div className="row left"> animation</div>
      <div className="submit-btn col right">
        {answerSubmited ? (
          <>
            <div className="row  right">
              {submit === "wrong" && (
                <Button
                  icon={"redo"}
                  size={"fa-xs"}
                  text={" wrong try again"}
                  className="btn black"
                  onClick={postSubmit}
                ></Button>
              )}

              <button className="btn black" onClick={counter}>
                Next qestion
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row between" style={{ width: "100%" }}>
              <div className="col pad">
                <div
                  style={{ width: "50px" }}
                  className="btn row "
                  onClick={() => {
                    setAnimation(!animation);
                  }}
                >
                  <i class="far fa-lightbulb"></i>
                </div>
              </div>
              <div className="row right">
                <button
                  className="btn black"
                  onClick={goBack}
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
        {animation && (
          <div id="animation" className="animation fade-in">
            <div className=""></div>

            <Animation setAnimation={setAnimation}></Animation>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
