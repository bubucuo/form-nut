import {observer} from "@/which";
import {useContext} from "react";
import {FormContext} from "./context";

const FormConsumer = observer((props) => {
  const form = useContext(FormContext);
  const children = props.children(form);
  return children;
});

export default FormConsumer;
