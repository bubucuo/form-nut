import {define, observable} from "@/which";

// 数据层的Field
export default class Field {
  constructor(name, props, form) {
    this.name = name;
    this.props = {...props};
    this.form = form;

    this.form.fields[name] = this;

    this.component = props.component;
    this.decorator = props.decorator;

    this.selfErrors = [];

    this.value = this.form.values[name];

    this.makeObservable();
  }

  makeObservable = () => {
    define(this, {
      value: observable,
      selfErrors: observable,
    });
  };

  onInput = (e) => {
    const newValue = e.target.value;

    this.value = newValue;
    this.form.values[this.props.name] = newValue;

    // todo 校验
  };
}
