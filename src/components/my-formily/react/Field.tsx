import React from "react";
import {useForm, useField, useAttach} from "./hooks";
import {FieldContext} from "./context";
import {ReactiveField} from "./ReactiveField";
import {JSXComponent, IFieldProps} from "./types";

export const Field = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C>
) => {
  const form = useForm();

  const parent = useField();

  const field = useAttach(
    form.createField({basePath: parent?.address, ...props})
  );

  return (
    <FieldContext.Provider value={field}>
      <ReactiveField field={field}>{props.children}</ReactiveField>
    </FieldContext.Provider>
  );
};
