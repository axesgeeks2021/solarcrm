import React from 'react'

function Loading(props) {
  return (
    <div className="loadingContainer">
            <div className="scene">
                <div className="cube-wrapper">
                    <div className="cube">
                        <div className="cube-faces">
                            <div className="cube-face shadow" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div>
                            <div className="cube-face bottom" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div>
                            <div className="cube-face top" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div>
                            {/* <div className="cube-face left" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div> */}
                            <div className="cube-face right" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div>
                            <div className="cube-face back" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div>
                            <div className="cube-face front" style={{background: props.background || "#FF5714", border: props.border || "1px solid #1982C4"}}></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
  )
}

export default Loading