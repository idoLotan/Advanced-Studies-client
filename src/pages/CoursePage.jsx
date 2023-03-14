import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../axios";
import Questions from "../components/Questions";
import EndgPage from "../components/EndPage";
import Button from "../Layouts/Button/Button";
import Loader from "../Layouts/Loader/Loader";
import IntroPage from "../components/IntroPage";
import Content from "../components/Content";

const CoursePage = ({ currentCourse, setToggledCourse }) => {
  const [toggleQuestions, setToggleQuestions] = useState(true);
  const [count, setCount] = useState(0);
  const [courseQuestions, setCourseQuestions] = useState();
  const [qestion, setQuestion] = useState();
  const [previousBtnDisplay, setPreviousBtnDisplay] = useState("none");
  const [classEnded, setClassEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isReading, setIsReading] = useState(true);

  const img = currentCourse?.pageImgUrl ? currentCourse?.pageImgUrl : "";

  function handleImageLoaded() {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    getQuestions();
  }, []);

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

  async function getQuestions() {
    try {
      const questionsList = [];
      const resp = await axios.get(`${baseUrl}/courses/${currentCourse._id}`);
      const questionsIds = resp.data.data.questions;

      const promises = questionsIds.map((questionId) =>
        axios.get(`${baseUrl}/courses/questions/${questionId}`)
      );
      const temp = await Promise.all(promises);

      temp.forEach((response) => {
        questionsList.push(response.data.data);
      });

      setCourseQuestions(questionsList);
    } catch (err) {
      console.log(err);
    }
  }

  const handleQuestions = () => {
    setToggleQuestions(!toggleQuestions);
  };

  return (
    <div className="fade-in">
      <div className="row"> {isLoading && <Loader />}</div>

      {classEnded ? (
        <EndgPage
          setToggledCourse={setToggledCourse}
          currentCourse={currentCourse}
        />
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
            text="Back to Courses"
            className="back-btn pad"
          />
          {toggleQuestions ? (
            <IntroPage
              img={img}
              handleImageLoaded={handleImageLoaded}
              currentCourse={currentCourse}
              handleQuestions={handleQuestions}
            />
          ) : (
            <>
              <Content
                setIsReading={setIsReading}
                img={img}
                text={currentCourse.courseContent}
              />

              {!isReading && (
                <Questions
                  currentCourse={currentCourse}
                  setCount={setCount}
                  count={count}
                  qestion={qestion}
                  setQuestion={setQuestion}
                  previousBtnDisplay={previousBtnDisplay}
                  courseQuestions={courseQuestions}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
