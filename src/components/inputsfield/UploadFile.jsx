import React from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai'

function UploadFile({label,width,onchange, name, id}) {
    return (
        <>
            <div className="file my-1" style={{width: width, display: 'flex' }}>
                <label htmlFor={id} className='file__label'>{label}
                    <AiOutlineCloudUpload size={15} />
                </label>
                <input id={id} name={name} type="file" onChange={onchange} multiple />
            </div>
        </>
    )
}

export default UploadFile
