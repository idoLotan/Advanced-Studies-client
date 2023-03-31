import React, { useEffect, useRef, useState } from "react";
import { baseUrl } from "../axios";
import Button from "../Layouts/Button/Button";
import Question from "./Question";
import { Video } from "./Video";
const ObjectID = require("bson-objectid");

function Content({ setIsReading, img, text }) {
  const [currentParagraph, setCurrentParagraph] = useState(1);
  const [displayText, setDisplayText] = useState([text[0]]);
  const videoRef = useRef(null);

  console.log(displayText);

  function isMongoObjectId(id) {
    return ObjectID.isValid(id);
  }

  function isAWSDocument(str) {
    const regex = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]|\\;:'",.<>/?-]{1,1024}$/;
    return regex.test(str);
  }

  function handleNextParagraph() {
    setCurrentParagraph(currentParagraph + 1);
    setDisplayText((displayText) => [...displayText, text[currentParagraph]]);
    if (currentParagraph + 1 == text.length) {
      setIsReading(false);
    }
  }

  return (
    <div className="content">
      <div className="row ">
        <img src={`${baseUrl}/courses/images/${img}`} className="intro-img" />
      </div>
      {displayText.map((paragraph) =>
        isMongoObjectId(paragraph) ? (
          <Question questionId={paragraph} />
        ) : isAWSDocument(paragraph) ? (
          paragraph.includes("mp4") ? (
            <Video paragraph={paragraph} />
          ) : (
            <div className="row">
              <img src={`${baseUrl}/courses/images/${paragraph}`}></img>
            </div>
          )
        ) : (
          <p key={paragraph}>{paragraph}</p>
        )
      )}

      {currentParagraph < text.length && (
        <div className="row right">
          <Button
            className="btn black "
            text={"continue"}
            onClick={handleNextParagraph}
          ></Button>
        </div>
      )}
    </div>
  );
}

export default Content;
