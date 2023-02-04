import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axiosController";
import Questions from "../components/Questions";
import EndgPage from "../components/EndPage";
import Button from "../Layouts/Button/Button";
import Loader from "../Layouts/Loader/Loader";

const ClassPage = ({ setToggledClass, currntClass }) => {
  const [toggleQuestions, setToggleQuestions] = useState(true);
  const [count, setCount] = useState(0);
  const [classQuestions, getClassQuestions] = useState();
  const [qestion, setQuestion] = useState();
  const [previousBtnDisplay, setPreviousBtnDisplay] = useState("none");
  const [classEnded, setClassEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const img = currntClass.img ? currntClass.img : "";

  function handleImageLoaded() {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (count > 0) {
      setPreviousBtnDisplay("block");
    } else {
      setPreviousBtnDisplay("none");
    }
    if (count >= classQuestions?.length) {
      setClassEnded(true);
    }
  }, [count]);

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const classQuestionsTemp = [];
      const resp = await axios.get(`${baseUrl}/class/${currntClass._id}`);
      const questionsIds = await resp.data.data.question;
      for (let questionId of questionsIds) {
        const temp = await axios.get(`${baseUrl}/class/question/${questionId}`);

        classQuestionsTemp.push(temp.data.data);
      }
      getClassQuestions(classQuestionsTemp);
    } catch (err) {
      console.log(err);
    }
  }

  const handleQuestions = () => {
    setToggleQuestions(!toggleQuestions);
  };

  return (
    <div
      className="class-page fade-in"
      // style={{ display: isLoading ? "none" : "block" }}
    >
      <div className="row"> {isLoading && <Loader />}</div>

      {classEnded ? (
        <EndgPage setToggledClass={setToggledClass} />
      ) : (
        <div
          className="class-page-intro fade-in"
          style={{ display: isLoading ? "none" : "block" }}
        >
          <Button
            icon={"chevron-left"}
            onClick={(toggledClass) => {
              setToggledClass(!toggledClass);
            }}
            text="Back to Classes"
            className="back-btn"
          ></Button>
          {toggleQuestions ? (
            <div className="">
              <div className="class-page-content col ">
                <div
                  className="title"
                  style={{ fontFamily: "Helvetica", fontWeight: 100 }}
                >
                  <h2>
                    <b>{currntClass.className}</b>
                  </h2>
                </div>

                <img
                  src={`${baseUrl}/class/getpic/pic/${img}`}
                  onLoad={handleImageLoaded}
                  className="intro-img"
                />

                <div className="pad">
                  <p>{currntClass.classText}</p>
                </div>
                <button className="pad btn black" onClick={handleQuestions}>
                  Start Class
                </button>
              </div>
            </div>
          ) : (
            <Questions
              currntClass={currntClass}
              setCount={setCount}
              count={count}
              qestion={qestion}
              setQuestion={setQuestion}
              previousBtnDisplay={previousBtnDisplay}
              classQuestions={classQuestions}
            ></Questions>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassPage;
