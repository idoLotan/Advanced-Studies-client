import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Questions from "../components/Questions";
import EndgPage from "../components/EndPage";
import Button from "../Layouts/Button/Button";
import Loader from "../Layouts/Loader/Loader";
import IntroPage from "../components/IntroPage";

const ClassPage = ({ currentCourse, setToggledCourse }) => {
  const [toggleQuestions, setToggleQuestions] = useState(true);
  const [count, setCount] = useState(0);
  const [courseQuestions, setCourseQuestions] = useState();
  const [qestion, setQuestion] = useState();
  const [previousBtnDisplay, setPreviousBtnDisplay] = useState("none");
  const [classEnded, setClassEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const img = currentCourse?.pageImgUrl ? currentCourse?.pageImgUrl : "";

  console.log("currentCourse", currentCourse);

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
    if (count >= courseQuestions?.length) {
      setClassEnded(true);
    }
  }, [count]);

  useEffect(() => {
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const questionsList = [];
      const resp = await axios.get(`${baseUrl}/courses/${currentCourse._id}`);
      const questionsIds = await resp.data.data.questions;
      console.log("resp", questionsIds);
      for (let questionId of questionsIds) {
        const temp = await axios.get(
          `${baseUrl}/courses/questions/${questionId}`
        );

        questionsList.push(temp.data.data);
      }
      console.log("questionsList", questionsList);
      setCourseQuestions(questionsList);
    } catch (err) {
      console.log(err);
    }
  }

  const handleQuestions = () => {
    setToggleQuestions(!toggleQuestions);
  };

  console.log(`${baseUrl}/courses/images/${img}`);

  return (
    <div className="class-page fade-in">
      <div className="row"> {isLoading && <Loader />}</div>

      {classEnded ? (
        <EndgPage setToggledCourse={setToggledCourse} />
      ) : (
        <div
          className="course-page fade-in"
          style={{ display: isLoading ? "none" : "block" }}
        >
          <Button
            icon={"chevron-left"}
            onClick={(toggledClass) => {
              setToggledCourse(!toggledClass);
            }}
            text="Back to Classes"
            className="back-btn"
          ></Button>
          {toggleQuestions ? (
            <IntroPage
              img={img}
              handleImageLoaded={handleImageLoaded}
              currentCourse={currentCourse}
              handleQuestions={handleQuestions}
            ></IntroPage>
          ) : (
            <Questions
              currentCourse={currentCourse}
              setCount={setCount}
              count={count}
              qestion={qestion}
              setQuestion={setQuestion}
              previousBtnDisplay={previousBtnDisplay}
              courseQuestions={courseQuestions}
            ></Questions>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassPage;
