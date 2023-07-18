import React from "react";

function Button(props) {
  return (
    <button
      style={{
        width: props.width,
        color: props.color,
        background: props.background,
        margin: props.margin,
        padding: props.padding,
        alignSelf: props.alignSelf
      }}
      className={`button ${props.classname}`}
      type={props.type || 'button'}
      onClick={props.onclick}
      disabled={props.disabled || false}
    >
      {props.title}
    </button>
  );
}

export default Button;
