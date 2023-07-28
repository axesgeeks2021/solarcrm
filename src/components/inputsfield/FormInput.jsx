import React from 'react'

function FormInput(props) {
  return (
    <input type={props.type || 'text'} placeholder={props.placeholder} className='form__input' onChange={props.onChange} value={props.value} name={props.name} style={{width: props.width}} />
  )
}

export default FormInput