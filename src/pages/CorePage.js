import {useMemo} from "react";
import {createForm, setValidateLanguage} from "@formily/core";
import {
  FormProvider,
  FormConsumer,
  Field,
  FormItem,
} from "../components/my-formily/react-js";
import Input from "../components/Input";

export default function CorePage(props) {
  const form = useMemo(() => createForm({validateFirst: true}));
  console.log(
    "%c [ form ]-13",
    "font-size:13px; background:pink; color:#bf2c9f;",
    form
  );

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

  const submit = () => {
    console.log("form", form.values); //sy-log
  };

  return (
    <div>
      <h3>CorePage</h3>
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
          reactions={createPasswordEqualValidate("confirm_password")}
        />

        <button onClick={submit}>submit</button>
        <div>
          <FormConsumer>{() => form.values.name}</FormConsumer>
        </div>
      </FormProvider>
    </div>
  );
}
