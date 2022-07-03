import {createForm} from "@formily/core";
import {FormProvider, Field, FormConsumer} from "@formily/react";
// import {FormItem, Input, Submit} from "@formily/antd";

import {FormItem, Input, Submit} from "../components/my-formily/antd";

const form = createForm();

const createPasswordEqualValidate = (equalName) => (field) => {
  if (
    form.values.confirm_password &&
    field.value &&
    form.values[equalName] !== field.value
  ) {
    field.selfErrors = ["Password does not match Confirm Password."];
  } else {
    field.selfErrors = [];
  }
};

export default function ReactPage(props) {
  return (
    <div>
      <h3>ReactPage</h3>
      <FormProvider form={form}>
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, {placeholder: "Please Input"}]}
        />

        <Field
          name="password"
          title="Password"
          required
          decorator={[FormItem]}
          component={[Input, {type: "password", placeholder: "Please Input"}]}
          // reactions={createPasswordEqualValidate("confirm_password")}
        />

        <Submit onSubmit={console.log}>提交</Submit>

        <div>
          <FormConsumer>{() => form.values.name}</FormConsumer>
        </div>
      </FormProvider>
    </div>
  );
}
