import React from 'react'

function FormsContainer(props) {
  return (
    <div style={{width: "90%",display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: props.flexDirection, background: props.background || 'white', boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.3), -2px -2px 5px 0px rgba(0,0,0,0.3)'}}>
        {props.children}
    </div>
  )
}

export default FormsContainer