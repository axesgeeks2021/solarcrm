import React from 'react'

function FormInput(props) {
  return (
    <>
      <label htmlFor={props.label}></label>
      <input id={props.label} type={props.type || 'text'} placeholder={props.placeholder} className='form__input' onChange={props.onChange} value={props.value} name={props.name} style={{ width: props.width, color: props.color || 'black' }} min={props.min} />
    </>

  )
}

export default FormInput