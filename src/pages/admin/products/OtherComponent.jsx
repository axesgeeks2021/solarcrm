import React, { useState, useEffect } from 'react'
import SideMenu from '../menu/SideMenu'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button';

import FormInput from '../../../components/inputsfield/FormInput';
import Heading from '../../../components/heading/Heading';
import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";



function OtherComponent() {

    const [cookies] = useCookies();

    const [otherComponentData, setotherComponentData] = useState([])

    const [displayForm, setDisplayForm] = useState(false)

    const [file, setFile] = useState(null)
    const [text, setText] = useState({
        code: "",
        manufacturer: "",
        smartMeter: "",
        componentType: "",
        productWarranty: "",
        optimisor: "",
        optimisorHeading: "",
        smartMeterHeading: "",
        title: ""
    })

    const {code, componentType, manufacturer, optimisor, optimisorHeading, productWarranty,smartMeter, smartMeterHeading, title } = text

    const handleText = e => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleFile = e => {
        setFile(e.target.files[0])
    }

    const fetchRecord = async () => {
        try {
            const url = "http://65.1.123.138:8000/other_component/"

            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })

            const data = await res.json()
            setotherComponentData(data)

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createOtherComponent = e => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd");

            const formdata = new FormData();
            formdata.append("code", title);
            formdata.append("component_logo", file);
            formdata.append("manufacturer", manufacturer);
            formdata.append("smart_meter", smartMeter);
            formdata.append("component_type", componentType);
            formdata.append("product_warranty", productWarranty);
            formdata.append("my_list", "true");
            formdata.append("optimisor", optimisor);
            formdata.append("optimisor_heading", optimisorHeading);
            formdata.append("smart_meter_heading", smartMeterHeading);
            formdata.append("title", title);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://65.1.123.138:8000/other_component/", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchRecord()

        return () => subscribe
    }, [])

    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <AdminSideNavigation />
                </div>
                <div className="container py-5">
                    <div className='py-2 flex justify-end'>
                        <Button title="Create New Other Component" background="aqua" color="gray" onclick={() => setDisplayForm(true)} />
                    </div>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Id</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Title</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Code</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Manufacturer</div>
                        </li>
                        {
                            otherComponentData.length < 1 ? <h2>There is no order available right now...</h2> : otherComponentData.map((ele, idx) => {
                                return (
                                    <Link to="/other-component-orders" state={{ ele }} key={idx}>
                                        <li className="table-row">
                                            <div className={`col col-2 text-center`}>{ele.id}</div>
                                            <div className={`col col-2 text-center`}>{ele.title}</div>
                                            <div className={`col col-2 text-center`}>{ele.code}</div>
                                            <div className={`col col-2 text-center`}>{ele.manufacturer}</div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div style={{ transition: "0.4s", width: "60%", height: '90vh', background: 'white', display: displayForm ? 'flex' : 'none', justifyContent: 'center', alignItems: 'flex-start', position: 'absolute', left: '50%', top: "50%", boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.2),-2px -2px 10px 1px rgba(0,0,0,0.2)', overflow: 'hidden', transform: 'translate(-50%, -50%)', overflowY: 'scroll' }}>
                {/* <ImCross style={{position: 'absolute', top: '5px', left: '10px', cursor: 'pointer'}} onClick={() => setDisplayForm(false)}/> */}
                <div className='my-10 flex flex-col justify-center items-center gap-3' style={{ width: "80%" }}>
                    <Heading heading="Enter details for creating new other components" color="black"/>
                    <form className='flex flex-col justify-center items-center gap-2' style={{ width: "100%" }} onSubmit={createOtherComponent}>
                    <FormInput width="100%" placeholder="Title" value={title} name="title" onChange={handleText}/>
                    <FormInput width="100%" placeholder="Product Code" value={code} name="code" onChange={handleText}/>
                    <FormInput width="100%" placeholder="upload your logo" type="file" onChange={handleFile} />
                    <FormInput width="100%" placeholder="Component Type"value={componentType} name="componentType" onChange={handleText} />
                    <FormInput width="100%" placeholder="Optimisor" value={optimisor} name="optimisor" onChange={handleText}/>
                    <FormInput width="100%" placeholder="Optimisor Heading" value={optimisorHeading} name="optimisorHeading" onChange={handleText}/>
                    <FormInput width="100%" placeholder="Product Warranty" value={productWarranty} name="productWarranty" onChange={handleText}/>
                    <FormInput width="100%" placeholder="Smart Meter" value={smartMeter} name="smartMeter" onChange={handleText}/>
                    <FormInput width="100%" placeholder="Smart Meter Heading" value={smartMeterHeading} name="smartMeterHeading" onChange={handleText}/>
                    <FormInput width="100%" placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleText}/>
                    <div className='flex gap-5 justify-end items-end' style={{ width: "100%" }}>
                        <Button title="Submit" background="orange" type="submit"/>
                        <Button title="Close" background="gray" type="button" onclick={() => setDisplayForm(false)} />
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default OtherComponent