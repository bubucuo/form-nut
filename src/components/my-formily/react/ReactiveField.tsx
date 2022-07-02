import React, { Fragment, useContext } from 'react';


import { observer } from '@formily/reactive-react';
import { GeneralField, Form, isVoidField } from '@formily/core';
import { RenderPropsChildren } from './types';
import { isFn } from '../reactive/checkers';
import { SchemaComponentsContext } from './context'
import { FormPath } from '@formily/shared';
import { toJS } from '@formily/reactive';


interface IReactiveFieldProps {
  field: any //GeneralField
  children?: RenderPropsChildren<GeneralField>
}



const mergeChildren = (

  children: RenderPropsChildren<GeneralField>,
  content: React.ReactNode
) => {
  if (!children && !content) { return }
  if (isFn(children)) { return }

  return <Fragment>{children}{content}</Fragment>

}

const isValidComponent = (target: any) =>
  target && (typeof target === 'object' || typeof target === 'function')

const renderChildren = (
  children: RenderPropsChildren<GeneralField>,
  field?: GeneralField,
  form?: Form
) => {
  return isFn(children) ? children(field, form) : children
}

const ReactiveInternal: React.FC<IReactiveFieldProps> = (props) => {


  const components = useContext(SchemaComponentsContext)


  if (!props.field) {

    return <Fragment>{renderChildren(props.children)}</Fragment>
  }



  const { field, children } = props

  const content = mergeChildren(renderChildren(children, field, field.form), field.content ?? field.componentProps.children)




  const getComponent = (target: any) => {
    return isValidComponent(target) ? target : FormPath.getIn(components, target) ?? target
  }



  const renderDecorator = (children: React.ReactNode) => {
    if (!field.decoratorType) {

      return <Fragment>{children}</Fragment>
    }

    const res =
      React.createElement(getComponent(field.decoratorType), toJS(field.decoratorProps), children)

    return res
  }



  const renderComponent = () => {
    if (!field.componentType) return content
    const value = !isVoidField(field) ? field.value : undefined
    const onChange = !isVoidField(field)
      ? (...args: any[]) => {


        console.log('val', args[0].target.value); //sy-log
        field.onInput(...args)
        field.componentProps?.onChange?.(...args)
      }
      : field.componentProps?.onChange
    const onFocus = !isVoidField(field)
      ? (...args: any[]) => {
        field.onFocus(...args)
        field.componentProps?.onFocus?.(...args)
      }
      : field.componentProps?.onFocus
    const onBlur = !isVoidField(field)
      ? (...args: any[]) => {
        field.onBlur(...args)
        field.componentProps?.onBlur?.(...args)
      }
      : field.componentProps?.onBlur
    const disabled = !isVoidField(field)
      ? field.pattern === 'disabled' || field.pattern === 'readPretty'
      : undefined
    const readOnly = !isVoidField(field)
      ? field.pattern === 'readOnly'
      : undefined
    return React.createElement(
      getComponent(field.componentType),
      {
        disabled,
        readOnly,
        ...toJS(field.componentProps),
        value,
        onChange,
        onFocus,
        onBlur,
      },
      content
    )
  }

  return renderDecorator(renderComponent())





}


export const ReactiveField = observer(ReactiveInternal, { forwardRef: true })