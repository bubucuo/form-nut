import React from "react";
import {observer} from "@formily/reactive-react";
import {useContext} from "react";
import {FieldContext} from "./context";

const FormItem = observer(({children}) => {
  const field = useContext(FieldContext);

  return (
    <div>
      <div>{field.title}</div>
      {children}
      <div className="red">{field.selfErrors.join(",")}</div>
    </div>
  );
});

export default FormItem;
