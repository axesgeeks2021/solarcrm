import React from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai'

function UploadFile({label,width, onchange}) {
    return (
        <>
            <div className="file" style={{width: width, display: 'flex' }}>
                <label htmlFor="file">{label}
                    <AiOutlineCloudUpload size={15} />
                </label>
                <input id="file" type="file" onChange={onchange} />
            </div>
        </>
    )
}

export default UploadFile
