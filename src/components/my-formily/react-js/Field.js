import React, {useContext, useEffect} from "react";
import {observer} from "@formily/reactive-react";
import {FormContext, FieldContext} from "./context";

// 状态桥接器组件
const Field = observer((props) => {
  const form = useContext(FormContext);

  // 创建字段
  const field = form.createField(props);
  console.log(
    "%c [ field ]-11",
    "font-size:13px; background:pink; color:#bf2c9f;",
    field
  );

  useEffect(() => {
    // 挂载
    form.onMount();
    // 卸载字段
    return () => {
      form.onUnmount();
    };
  }, []);

  if (!field.visible || field.hidden) {
    return null;
  }

  // 渲染字段，将字段与UI组件关联
  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput,
  });

  // 渲染字段包装器
  const decorator = React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  );

  return (
    <FieldContext.Provider value={field}>{decorator}</FieldContext.Provider>
  );
});

export default Field;
