const Input = (props) => {
  return (
    <input
      {...props}
      value={props.value || ""}
      style={{...props.style, border: "solid 1px green"}}
    />
  );
};

export default Input;
