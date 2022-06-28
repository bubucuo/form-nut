import {FieldContext} from "./context";

export default function Field(props) {
  const field = null;
  return (
    <FieldContext.Provider value={field}>
      {props.children}
    </FieldContext.Provider>
  );
}
