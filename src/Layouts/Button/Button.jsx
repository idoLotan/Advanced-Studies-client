import Icon from "../Icon/Icon";
import "./Button.css";
const Button = ({ icon, onClick, text, className, style, size }) => {
  return (
    <div
      className={`custom-btn ${className} row`}
      style={style}
      onClick={onClick}
    >
      {icon && <Icon Icon={icon} size={size} />}
      <div className="text">{text}</div>
    </div>
  );
};

export default Button;
