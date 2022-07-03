const Input = (props) => {
  return (
    <input
      {...props}
      value={props.value || ""}
      style={{
        ...props.style,
        border: "2px solid rgb(186 203 255)",
        borderRadius: 6,
        width: "100%",
        height: 28,
        padding: "0 5px",
      }}
    />
  );
};

export default Input;
