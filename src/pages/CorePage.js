import {
  createForm,
  FormProvider,
  Field,
  FormConsumer,
  FormItem,
  Input,
  Submit,
} from "@/which";

const form = createForm({
  initialValues: {name: "hello world"},
});

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

const CorePage = () => {
  return (
    <div>
      <h3>CorePage</h3>

      <FormProvider form={form}>
        <Field
          name="name"
          title="Name"
          required
          decorator={[FormItem]}
          component={[Input, {placeholder: "Please Input ur name"}]}
        />

        <Field
          name="password"
          title="Password"
          required
          decorator={[FormItem]}
          component={[
            Input,
            {type: "password", placeholder: "Please Input ur password"},
          ]}
          reactions={createPasswordEqualValidate("confirm_password")}
        />
        <Field
          name="confirm_password"
          title="Confirm Password"
          required
          decorator={[FormItem]}
          component={[
            Input,
            {type: "password", placeholder: "Please Input ur confirm_password"},
          ]}
          reactions={createPasswordEqualValidate("password")}
        />

        <Submit
          onSubmit={(...args) => {
            console.log("onSubmit", args); //sy-log
          }}
          onSubmitSuccess={() => {
            console.log("onSubmitSuccess"); //sy-log
          }}
          onSubmitFailed={(...args) => {
            console.log("onSubmitFailed", args); //sy-log
          }}>
          提交
        </Submit>

        <div>
          <FormConsumer>{() => form.values.name}</FormConsumer>
        </div>
      </FormProvider>
    </div>
  );
};
export default CorePage;
