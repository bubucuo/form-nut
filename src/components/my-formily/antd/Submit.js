import {useParentForm} from "@/which";

const Submit = ({
  children,
  onSubmit,
  onSubmitSuccess,
  onSubmitFailed,
  onClick,
}) => {
  // 获取form表单
  const form = useParentForm();
  return (
    <button
      onClick={(e) => {
        if (onClick) {
          if (onClick(e) === false) {
            return;
          }
        }
        if (onSubmit) {
          form
            .submit(onSubmit)
            .then(onSubmitSuccess)
            .catch(onSubmitFailed);
        }
      }}>
      {children}
    </button>
  );
};

export default Submit;
