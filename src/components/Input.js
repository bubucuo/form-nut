// import React from "react";

// const Input = (props) => {
//   return <input {...props} />;
// };

// class CustomizeInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   render() {
//     const {value = "", ...otherProps} = this.props;
//     return (
//       <div style={{padding: 10}}>
//         <Input style={{outline: "none"}} value={value} {...otherProps} />
//       </div>
//     );
//   }
// }

// export default CustomizeInput;

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
