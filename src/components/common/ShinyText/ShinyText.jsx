/* eslint-disable react/prop-types */
import "../../../styles/shinytext.css";

const ShinyText = ({ text, disabled = false, speed = 10, className = "dark:text-gray-800" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div className={`shiny-text ${disabled ? "disabled" : ""} ${className}`} style={{ animationDuration }}>
      {text}
    </div>
  );
};

export default ShinyText;
