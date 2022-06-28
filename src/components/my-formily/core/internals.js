import {clone} from "../shared/clone";

export const getValidFormValues = (values) => {
  // if (isObservable(values)) return values;
  return clone(values || {});
};
