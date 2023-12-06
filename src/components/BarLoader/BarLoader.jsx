import React from 'react'

function BarLoader() {
    return (
        <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div class="bar__loader__container">
                <div class="loading"></div>
            </div>
        </div>
    )
}

export default BarLoader
