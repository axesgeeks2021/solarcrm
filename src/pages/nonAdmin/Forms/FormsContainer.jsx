import React from 'react'

function FormsContainer(props) {
  return (
    <div style={{overflow: props.overflow,width: "90%", height: props.height,display: 'flex', justifyContent: props.justifyContent || 'center' , alignItems: props.alignItems || 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: props.flexDirection, background: props.background || 'white', boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.3), -2px -2px 5px 0px rgba(0,0,0,0.3)'}}>
        {props.children}
    </div>
  )
}

export default FormsContainer