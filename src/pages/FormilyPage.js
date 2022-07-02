import React from "react";
import {createForm} from "@formily/core";
// import {FormProvider, FormConsumer, Field} from "@formily/react";
import {FormItem, Input, FormButtonGroup, Submit} from "@formily/antd";

import {
  FormProvider,
  FormConsumer,
  Field,
} from "../components/my-formily/react";

const form = createForm();

export default function FormilyPage(props) {
  return (
    <div>
      <h3 className="red"> FormilyPage</h3>
      <FormProvider form={form}>
        <Field
          name="input"
          title="输入框"
          required
          initialValue="Hello world"
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormConsumer>
          {() => <div>实时响应：{form.values.input}</div>}
        </FormConsumer>
        {/* <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup> */}
      </FormProvider>
    </div>
  );
}
