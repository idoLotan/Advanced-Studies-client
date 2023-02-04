import React, { useState } from "react";
import "./InputFile.css";

const InputFile = ({ setFile }) => {
  const [fileLoaded, setFileLoaded] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    setFile(file);
    setFileLoaded(fileName);
  };

  return (
    <div className="input-file">
      <div className="input-file-content">
        <input
          type="file"
          className={`custom-file-input`}
          accept="image/*"
          onChange={handleChange}
        />
        <h5>{fileLoaded}</h5>
      </div>
    </div>
  );
};

export default InputFile;
