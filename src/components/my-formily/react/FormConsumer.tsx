import React, { Fragment } from 'react'
import { observer } from '@formily/reactive-react'
import { isFn } from '@formily/shared'
import { useForm } from './hooks';
import { IFormSpyProps } from './types';


export const FormConsumer: React.FC<IFormSpyProps> = props => {

  const children = props.children(useForm())//isFn(props.children) ? props.children(useForm()) : null

  return <Fragment>{children}</Fragment>
};