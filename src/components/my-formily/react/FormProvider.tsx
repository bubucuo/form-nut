import React from 'react'
import { FormContext } from './context'
import { useAttach } from './hooks'
import { Form } from "@formily/core";


interface FormProviderProps {
  form: Form,
  children: React.ReactElement
}

export const FormProvider: React.FC<FormProviderProps> = props => {

  const form = useAttach(props.form)

  return <FormContext.Provider value={form}>
    {props.children}
  </FormContext.Provider>


};