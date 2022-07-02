import {useEffect, useContext} from "react";
import {Form, GeneralField} from "@formily/core";
import {FormContext, FieldContext} from "./context";

interface IRecycleTarget {
  onMount: () => void;
  onUnmount: () => void;
}

export const useAttach = <T extends IRecycleTarget>(target: T): T => {
  useEffect(() => {
    target.onMount();

    return target.onUnmount();
  }, [target]);
  return target;
};

export const useForm = <T extends object = any>(): Form<T> => {
  return useContext(FormContext);
};

export const useField = <T = GeneralField>(): T => {
  return useContext(FieldContext) as any;
};
