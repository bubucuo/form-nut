import React from "react";
import {ContextCleaner, FormContext} from "./context";
import {useAttach} from "./hooks";
import {IProviderProps} from "./types";

interface FormProviderProps extends IProviderProps {
  children: React.ReactElement[];
}

export const FormProvider: React.FC<FormProviderProps> = (props) => {
  const form = useAttach(props.form);

  return (
    <ContextCleaner>
      <FormContext.Provider value={form}>{props.children}</FormContext.Provider>
    </ContextCleaner>
  );
};
