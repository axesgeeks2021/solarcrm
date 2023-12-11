import React from "react";

function Input(props) {
  return (
    <>
      <div className="form-group">
        <span>{props.placeholder}</span>
        <input
          className="form-field"
          type={props.type || 'text'}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          disabled={props.disabled}
          required={props.required}                                                                                                                                                                                                                                                                                              
          min={props.min}
        />
      </div>
    </>
  );
}

export default Input;
