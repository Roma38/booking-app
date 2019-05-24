import React from 'react';

import { Form, Message } from 'semantic-ui-react'

export const ReduxFormInput = ({
  input,
  label,
  type,
  meta: { touched, error}
}) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <Message content={error} negative /> }
    </Form.Field>
  )
}

export const required = value => (value || typeof value === 'number' ? undefined : 'Required')
export const minLength = value =>
  value && value.length < 6 ? `Must be ${6} characters or more` : undefined
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined