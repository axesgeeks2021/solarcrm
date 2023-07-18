import React from "react";

function Heading(props) {
  return (
    <>
      <p
        className={`heading ${props.classname}`}
        style={{
          fontSize: props.size,
          fontWeight: props.weight,
          color: props.color,
          textAlign: props.align || "center",
          padding: "0 10px",
        }}
      >
        {props.heading}
      </p>
    </>
  );
}

export default Heading;
