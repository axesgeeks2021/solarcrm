import React from "react";

function Input(props) {
  return (
    <>
      <div className="form-group">
        <span>{props.name}</span>
        <input
          className="form-field"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onchange}
          name={props.name}
          required
        />
      </div>
    </>
  );
}

export default Input;
