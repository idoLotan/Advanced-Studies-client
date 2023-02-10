import Button from "../Button/Button";
import "./SideBar.css";

export const Sidebar = ({ dispatch, state, title }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__title">{title}</div>
      <aside>
        <Button
          className={"pad"}
          icon="atom"
          onClick={() => dispatch({ type: "field" })}
          text={"field"}
          style={{ color: state.option === "field" && "gray" }}
        ></Button>
        <Button
          className={"pad"}
          icon="apple-alt"
          onClick={() => dispatch({ type: "course" })}
          text={"course"}
          style={{ color: state.option === "course" && "gray" }}
        ></Button>

        <Button
          className={"pad"}
          icon="question"
          onClick={() => dispatch({ type: "questions" })}
          text={"questions"}
          style={{ color: state.option === "questions" && "gray" }}
        ></Button>
      </aside>
    </div>
  );
};
