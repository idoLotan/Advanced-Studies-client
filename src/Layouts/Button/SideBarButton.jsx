import Icon from "../Icon/Icon";
import "./Button.css";
const SideBarButton = ({ icon, onClick, text, className, style, size }) => {
  return (
    <div
      className={`custom-btn ${className} row  left ${style && "color-blue"}`}
      style={{ color: style.color }}
      onClick={onClick}
    >
      {icon && <Icon Icon={icon} size={size} />}
      <div className="text">{text}</div>
    </div>
  );
};

export default SideBarButton;
