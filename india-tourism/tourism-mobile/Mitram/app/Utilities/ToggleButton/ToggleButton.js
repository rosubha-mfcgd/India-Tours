import "./ToggleButton.css";

const ToggleButton = (props) => {

  const { checked, name, value, onPress } = props;
  
  return (
    <input
      checked={checked}
      name={name}
      value={value}
      type="checkbox"
      id="checkbox"
      onPress={onPress}
      className="switch"
      onChange={() => console.log("I am change")}
    />
  );
};

export default ToggleButton;
