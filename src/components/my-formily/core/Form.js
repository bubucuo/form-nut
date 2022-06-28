import {getValidFormValues} from "./internals";

export class Form {
  constructor(props) {
    this.initialize(props);
    this.makeValues();
  }

  initialize = (props) => {
    this.props = {...props};
  };

  makeValues = () => {
    this.values = getValidFormValues(this.props.values);
    this.initialValues = getValidFormValues(this.props.initialValues);
  };
}
