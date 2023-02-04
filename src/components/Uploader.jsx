import { useState } from "react";
import axios from "axios";
import InputFile from "../Layouts/InputFile/InputFile";
import { baseUrl } from "../axiosController";

const Uploader = ({ courseName = "", imageType }) => {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  async function getCourseByName() {
    console.log("courseName", courseName);
    const resp = await axios.get(
      `${baseUrl}/courses/name?courseName=${courseName}`
    );

    console.log("resp", resp);
    const id = resp.data.data._id;
    console.log("id", id);
    return id;
  }

  async function postImage({ image }) {
    const id = await getCourseByName();
    const formData = new FormData();
    formData.append("image", image);

    const resp = await axios.post(
      `${baseUrl}/courses/images/${imageType}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(resp);
    return resp.data;
  }

  async function submit(e) {
    e.preventDefault();
    const result = await postImage({ image: file });
    console.log(result);
    setImages([result.image, ...images]);
  }

  return (
    <div className="Uploader row">
      <div className="col " style={{ width: "240px" }}>
        <InputFile setFile={setFile}></InputFile>

        <button className="btn " onClick={submit}>
          Submit
        </button>
      </div>

      {images.map((image) => (
        <div key={image}>
          <img src={image}></img>
        </div>
      ))}
    </div>
  );
};

export default Uploader;
