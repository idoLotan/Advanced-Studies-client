import axios from "axios";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { baseUrl, config } from "../axios";
import InputFile from "../Layouts/InputFile/InputFile";

export const AddField = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const fieldNameRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  async function saveField() {
    let data = {
      field: fieldNameRef.current.value,
    };
    try {
      const resp = await axios.post(`${baseUrl}/courses/fields`, data);
      const itemAdded = resp.data.payload.success;
      return setMessage(itemAdded ? "field added!" : "field already exist");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="add-field fade-in pad ">
        <h2 className="pad">Add new field</h2>
        <input ref={fieldNameRef} type="text" placeholder="Field Name" />
      </div>
      <div className="col right pad">
        <button onClick={saveField} className="btn black">
          Add
        </button>

        {message && <h5>{message}</h5>}
      </div>
    </>
  );
};
