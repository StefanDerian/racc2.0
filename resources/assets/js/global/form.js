/**
Global variable for validating form


**/


import { Form, Text, Field } from 'react-form';
import React from 'react'
  const Message = ({ color, message }) => (
    <div className="mb-4" style={{ color }}>
      <small>{message}</small>
    </div>
  )

  const validateNonNumber = (value) => {
    var regex1 = RegExp("^[a-zA-Z ]*$");
    if(!value || value.trim() === ""){
      return ({error: !value || value.trim() === "" ? "This field is required" : null,})
    }
    return ({error: !regex1.test(value) ? "This field must be filled with alphabets only" : null})
  }
  const validateAlphaNumber = (value) => {
    var regex1 = RegExp("^[a-zA-Z0-9 ]*$");
    if(!value || value.trim() === ""){
      return ({error: !value || value.trim() === "" ? "This field is required" : null,})
    }
    return ({error: !regex1.test(value) ? "This field must be filled with number or alphabets only" : null})
  }
  const validate = (value) => {
    return ({error: !value || value.trim() === "" ? "This field is required" : null,})
  }

  export const RequiredText = props => (

    // Use the form field and your custom input together to create your very own input!
    <Field validate={validate} field={props.field}>
      { fieldApi => {

        // Remember to pull off everything you dont want ending up on the <input>
        // thats why we pull off onChange, onBlur, and field
        // Note, the ...rest is important because it allows you to pass any
        // additional fields to the internal <input>.
        const { onChange, onBlur, field, addValidate, ...rest } = props

        const { value, error, warning, success, setValue, setTouched } = fieldApi

        return (
          <div>
            <input
              {...rest}
              value={value || ''}
              onChange={e => {
                setValue(e.target.value)
                if (onChange) {
                  onChange(e.target.value, e)
                }
              }}
              onBlur={e => {
                setTouched()
                if (onBlur) {
                  onBlur(e)
                }
              }}
            />
            {error ? <Message color="red" message={error} /> : null}
          </div>
        )
      }}
    </Field>
  )
  export const AlphaNumbericText = props => (

    // Use the form field and your custom input together to create your very own input!
    <Field validate={validateAlphaNumber} field={props.field}>
      { fieldApi => {

        // Remember to pull off everything you dont want ending up on the <input>
        // thats why we pull off onChange, onBlur, and field
        // Note, the ...rest is important because it allows you to pass any
        // additional fields to the internal <input>.
        const { onChange, onBlur, field, addValidate, ...rest } = props

        const { value, error, warning, success, setValue, setTouched } = fieldApi

        return (
          <div>
            <input
              {...rest}
              value={value || ''}
              onChange={e => {
                setValue(e.target.value)
                if (onChange) {
                  onChange(e.target.value, e)
                }
              }}
              onBlur={e => {
                setTouched()
                if (onBlur) {
                  onBlur(e)
                }
              }}
            />
            {error ? <Message color="red" message={error} /> : null}
          </div>
        )
      }}
    </Field>
  )
  export const AlphaText = props => (

    // Use the form field and your custom input together to create your very own input!
    <Field validate={validateNonNumber} field={props.field}>
      { fieldApi => {

        // Remember to pull off everything you dont want ending up on the <input>
        // thats why we pull off onChange, onBlur, and field
        // Note, the ...rest is important because it allows you to pass any
        // additional fields to the internal <input>.
        const { onChange, onBlur, field, addValidate, ...rest } = props

        const { value, error, warning, success, setValue, setTouched } = fieldApi

        return (
          <div>
            <input
              {...rest}
              value={value || ''}
              onChange={e => {
                setValue(e.target.value)
                if (onChange) {
                  onChange(e.target.value, e)
                }
              }}
              onBlur={e => {
                setTouched()
                if (onBlur) {
                  onBlur(e)
                }
              }}
            />
            {error ? <Message color="red" message={error} /> : null}
          </div>
        )
      }}
    </Field>
  )
