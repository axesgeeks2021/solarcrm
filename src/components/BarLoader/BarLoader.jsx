import React from 'react'

function BarLoader() {
    return (
        <div style={{ height: '20vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="bar__loader__container">
                <div className="loading"></div>
            </div>
        </div>
    )
}

export default BarLoader
