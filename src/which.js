// import {createForm} from "@formily/core";
// import {
//   observable,
//   Tracker,
//   batch,
//   define,
//   action,
//   toJS,
//   autorun,
// } from "@formily/reactive";
// import {
//   FormProvider,
//   Field,
//   FormConsumer,
//   FieldContext,
//   useParentForm,
// } from "@formily/react";
// import {observer} from "@formily/reactive-react";
// import {FormItem, Input, Submit} from "@formily/antd";

import {
  FormPath,
  each,
  isFn,
  isValid,
  isUndef,
  isEmpty,
  isPlainObj,
  isNumberLike,
  clone,
  toArr,
} from "@formily/shared";

// todo
import {
  observable,
  Tracker,
  batch,
  define,
  action,
  toJS,
  autorun,
} from "@/components/my-formily/reactive";

import {createForm} from "@/components/my-formily/core";

import {observer} from "@/components/my-formily/reactive-react";

import {FormItem, Input, Submit} from "@/components/my-formily/antd";
import {
  FormProvider,
  Field,
  FormConsumer,
  FieldContext,
  useParentForm,
} from "@/components/my-formily/react";

export {
  // core
  createForm,
  // react
  FormProvider,
  Field,
  FormConsumer,
  FieldContext,
  // 用于读取最近的 Form 或者 ObjectField 实例，主要方便于调用子表单的 submit/validate
  useParentForm,
  // reactive
  observable,
  Tracker,
  batch,
  define,
  action,
  toJS,
  autorun,
  // reactive-react
  observer,
  // antd
  FormItem,
  Input,
  Submit,
  // shared
  FormPath,
  each,
  isFn,
  isValid,
  isUndef,
  isEmpty,
  isPlainObj,
  isNumberLike,
  clone,
  toArr,
};
