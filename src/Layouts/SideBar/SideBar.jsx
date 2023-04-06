import Button from "../Button/Button";
import ButtonCol from "../Button/ButtonCol";
import SideBarButton from "../Button/SideBarButton";
import "./SideBar.css";

export const Sidebar = ({ dispatch, state, title }) => {
  console.log(state.option === "field" && "red");
  return (
    <div className="sidebar">
      <div className="sidebar__title">{}</div>
      <aside>
        <SideBarButton
          className={"pad"}
          icon="atom"
          onClick={() => dispatch({ type: "field" })}
          text={"field"}
          style={state.option === "field"}
        ></SideBarButton>
        <SideBarButton
          className={"pad"}
          icon="apple-alt"
          onClick={() => dispatch({ type: "course" })}
          text={"course"}
          style={state.option === "course"}
        ></SideBarButton>

        <SideBarButton
          className={"pad"}
          icon="question"
          onClick={() => dispatch({ type: "courses" })}
          text={"courses"}
          style={state.option === "courses"}
        ></SideBarButton>
      </aside>
    </div>
  );
};
