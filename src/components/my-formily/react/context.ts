import React, {createContext} from "react";
import {Form, GeneralField} from "@formily/core";
import {SchemaReactComponents} from "./types";

const createContextCleaner = <T>(...contexts: React.Context<T>[]) => {
  return ({children}) => {
    return contexts.reduce((buf, ctx) => {
      return React.createElement(ctx.Provider, {value: undefined}, buf);
    }, children);
  };
};

export const FormContext = createContext<Form>(null);
export const FieldContext = createContext<GeneralField>(null);
export const SchemaComponentsContext = createContext<SchemaReactComponents>(
  null
);

export const ContextCleaner = createContextCleaner(
  FieldContext
  // SchemaMarkupContext,
  // SchemaContext,
  // SchemaExpressionScopeContext,
  // SchemaComponentsContext,
  // SchemaOptionsContext
);
