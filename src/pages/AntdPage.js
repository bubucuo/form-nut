import {
  createForm,
  FormProvider,
  Field,
  FormConsumer,
  FormItem,
  Input,
  Submit,
} from "@/which";

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

// 注册
export default function AntdPage(props) {
  return (
    <div>
      <h3>AntdPage</h3>
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
        <Field
          name="confirm_password"
          title="Confirm Password"
          required
          decorator={[FormItem]}
          component={[Input, {type: "password", placeholder: "Please Input"}]}
          reactions={createPasswordEqualValidate("password")}
        />

        <Submit
          onSubmit={(res) => {
            console.log(res); //sy-log
          }}
          onSubmitSuccess={() => {
            console.log("omg success"); //sy-log
          }}
          onSubmitFailed={() => {
            console.log("omg failed"); //sy-log
          }}>
          提交
        </Submit>

        <div>
          <FormConsumer>{() => form.values.name}</FormConsumer>
        </div>
      </FormProvider>
    </div>
  );
}
