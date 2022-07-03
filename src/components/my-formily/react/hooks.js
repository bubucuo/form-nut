import {useContext} from "react";
import {FormContext} from "./context";

export function useParentForm() {
  const form = useContext(FormContext);

  return form;
}
