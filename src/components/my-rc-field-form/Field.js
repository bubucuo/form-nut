import React, { Component } from "react";
import FiledContext from "./FiledContext";

export default class Field extends Component {
  static contextType = FiledContext;

  onStoreChange = () => {
    this.forceUpdate();
  };

  componentDidMount() {
    this.unsetFieldEntities = this.context.setFieldEntities(this);
  }

  componentWillUnmount() {
    this.unsetFieldEntities();
  }

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;

    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value;
        console.log("newValue", newValue); //sy-log
        setFieldsValue({ [name]: newValue });
      },
    };
  };
  render() {
    console.log("render"); //sy-log
    const returnChildNode = React.cloneElement(
      this.props.children,
      this.getControlled()
    );

    return returnChildNode;
  }
}
