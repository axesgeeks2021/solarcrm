import React from "react";

function Input(props) {
  return (
    <>
      <div className="form-group">
        <span style={{padding: "0 12px"}}>{props.placeholder}</span>
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
        <span style={{paddingInline: props.years !== undefined ? "12px" : '0'}}>{props.years}</span>
        
      </div>
    </>
  );
}

export default Input;
