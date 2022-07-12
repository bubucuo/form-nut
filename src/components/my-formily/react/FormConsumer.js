import {observer} from "@/which";
import {FormContext} from "./context";
import {useContext} from "react";

const FormConsumer = observer((props) => {
  const form = useContext(FormContext);
  return props.children(form);
});
export default FormConsumer;
