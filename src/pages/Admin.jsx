import { useReducer, useState } from "react";
import { AddCourse } from "../components/AddCourse";
import { AddField } from "../components/AddField";
import { AddQuestions } from "../components/AddQuestions";
import { Sidebar } from "../Layouts/SideBar/SideBar";

export const Admin = () => {
  const [fieldName, setFieldName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [questions, setQuestions] = useState("");

  const initialState = { option: "field" };
  function reducer(state, action) {
    return { option: action.type };
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="admin-page">
      <Sidebar
        dispatch={dispatch}
        state={state}
        title={"ADD SECTION"}
      ></Sidebar>
      <div className="admin-page-form">
        <div className="row between">
          <div style={{ width: "100px" }}></div>
        </div>

        {state.option === "field" && (
          <>
            <div className="col left"></div>
            <AddField
              setFieldName={setFieldName}
              fieldName={fieldName}
              state={state}
            />
          </>
        )}
        {state.option === "course" && (
          <div>
            <AddCourse
              setFieldName={setFieldName}
              fieldName={fieldName}
              state={state}
              setCourseName={setCourseName}
              courseName={courseName}
            />
          </div>
        )}
        {state.option === "questions" && (
          <div>
            <AddQuestions
              setCourseName={setCourseName}
              state={state}
              setQuestions={setQuestions}
              question={questions}
              courseName={courseName}
            />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};
