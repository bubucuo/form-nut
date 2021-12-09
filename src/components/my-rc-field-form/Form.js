import useForm from "./useForm";
import FiledContext from "./FiledContext";

export default function Form({ children, form, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);

  formInstance.setCallbacks({ onFinish, onFinishFailed });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FiledContext.Provider value={formInstance}>
        {children}
      </FiledContext.Provider>
    </form>
  );
}
