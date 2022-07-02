import {createContext} from "react";
import {Form, GeneralField} from "@formily/core";
import {SchemaReactComponents} from "./types";

export const FormContext = createContext<Form>(null);
export const FieldContext = createContext<GeneralField>(null);
export const SchemaComponentsContext = createContext<SchemaReactComponents>(
  null
);
