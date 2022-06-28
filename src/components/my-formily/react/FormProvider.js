import {FormContext} from "./context";

export default function FormProvider(props) {
  const form = null; //useAttach(props.form)

  return (
    <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
  );
}
