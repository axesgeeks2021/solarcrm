import React from 'react'

function AdminInput(props) {
    return (
        <div className="floating-label">
            <input placeholder={props.placeholder} type={`Email` || props.type} name={props.name} id={props.id} onChange={props.onChange}/>
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <div className="icon">
                {props.svgIcon}
            </div>
        </div>
    )
}

export default AdminInput