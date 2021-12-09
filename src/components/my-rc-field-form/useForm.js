import React from "react";

class FormStore {
  constructor() {
    this.store = {}; // 状态库
    this.fieldEntities = [];

    this.callbacks = {}; // 存储回调
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  //  注册与取消注册，监听与取消监听  都要成对出现
  setFieldEntities = (field) => {
    this.fieldEntities.push(field);

    return () => {
      // 取消注册
      this.fieldEntities = this.fieldEntities.filter((item) => item !== field);
      delete this.store[field.props.name];
    };
  };

  // get all
  getFieldsValue = () => {
    return { ...this.store };
  };

  // get some value
  getFieldValue = (name) => {
    return this.store[name];
  };

  //   name: value
  setFieldsValue = (newStore) => {
    // update store
    this.store = {
      ...this.store,
      ...newStore,
    };

    // update 组件
    // update field onStoreChange
    //

    // this.fieldEntities.forEach((field) => {
    //   field.onStoreChange();
    // })

    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validate = () => {
    let err = [];

    // todo 检验 rules

    return err;
  };
  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks;
    let err = this.validate();

    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}

function useForm(form) {
  // 组件初次加载的时候，初始化一个状态仓库
  // 在组件卸载前，都要用到同一个状态仓库

  const formRef = React.useRef();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}

export default useForm;
