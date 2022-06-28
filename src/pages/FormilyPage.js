import React from "react";

// import {createForm} from "@formily/core";
// import {FormProvider, FormConsumer, Field} from "@formily/react";
// import {
//   FormItem,
//   FormLayout,
//   // Input,
//   FormButtonGroup,
//   Submit,
// } from "@formily/antd";

import {createForm} from "../components/my-formily/core";
import {
  FormProvider,
  FormConsumer,
  Field,
} from "../components/my-formily/react";
import Input from "../components/Input";
// import {Input, FormButtonGroup, Submit} from "@formily/antd";

const form = createForm();

console.log("form", form); //sy-log

export default function FormilyPage(props) {
  return (
    <FormProvider form={form}>
      <Field
        name="input"
        title="输入框"
        required
        initialValue="Hello world"
        // decorator={[FormItem]}
        component={[Input]}
      />

      <FormConsumer>
        {() => <div>实时响应：{form.values.input}</div>}
      </FormConsumer>

      {/* <FormButtonGroup>
        <Submit onSubmit={console.log}>提交</Submit>
      </FormButtonGroup> */}
    </FormProvider>
  );
}
