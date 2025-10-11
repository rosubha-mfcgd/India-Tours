import "./ToggleButton.css";

const ToggleButton = (props) => {

  const { checked, name, value, onClick } = props;
  
  return (
    <input
      checked={checked}
      name={name}
      value={value}
      type="checkbox"
      id="checkbox"
      onClick={onClick}
      className="switch"
      onChange={() => console.log("I am change")}
    />
  );
};

export default ToggleButton;
