import {useEffect} from "react";
import {FormContext} from "./context";

export default function FormProvider(props) {
  useEffect(() => {
    //挂载表单
    props.form?.onMount();
    return () => {
      //卸载表单
      props.form?.onUnmount();
    };
  }, []);

  return (
    <FormContext.Provider value={props.form}>
      {props.children}
    </FormContext.Provider>
  );
}
