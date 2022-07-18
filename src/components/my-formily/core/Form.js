import Field from "./Field";
import {define, observable} from "@/which";

export default class Form {
  constructor(props) {
    this.initialize(props);
    this.makeObservable();
  }

  initialize = (props) => {
    this.props = {...props};
    this.fields = {};
    this.initialValues = props.initialValues;
    // 所有field的value
    this.values = {...props.initialValues};
  };

  makeObservable = () => {
    define(this, {
      fields: observable.shallow,
      values: observable,
    });
  };

  createField = (props) => {
    const {name} = props;
    if (!this.fields[name]) {
      new Field(name, props, this);
    }

    return this.fields[name];
  };

  onMount = () => {};
  onUnmount = () => {};
  submit = () => {
    console.log(
      "%c [  ]-38",
      "font-size:13px; background:pink; color:#bf2c9f;",
      this.values
    );
  };
}
