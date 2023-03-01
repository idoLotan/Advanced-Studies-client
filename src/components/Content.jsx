import React, { useState } from "react";
import { baseUrl } from "../axios";
import Button from "../Layouts/Button/Button";

function Content({ setIsReading, img, text }) {
  const [currentParagraph, setCurrentParagraph] = useState(1);

  function handleNextParagraph() {
    setCurrentParagraph(currentParagraph + 1);
    if (currentParagraph + 1 == text.length) {
      setIsReading(false);
    }
  }

  return (
    <div className="content">
      <div className="row ">
        <img src={`${baseUrl}/courses/images/${img}`} className="intro-img" />
      </div>

      {text.slice(0, currentParagraph).map((paragraph) => (
        <p key={paragraph}>{paragraph} </p>
      ))}
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
