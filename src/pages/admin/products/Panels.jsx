import React, { useState, useEffect } from 'react';
import SideMenu from '../menu/SideMenu';
import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button';

import FormInput from '../../../components/inputsfield/FormInput';
import Heading from '../../../components/heading/Heading';
import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input';
import Loading from '../../../components/loading/Loading';



function Panels() {

    const [cookies] = useCookies();


    const [panelsData, setPanelsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [displayForm, setDisplayForm] = useState(false)

    const [file, setFile] = useState(null)
    const [text, setText] = useState({
        title: "",
        code: "",
        manufacturer: "",
        technology: "",
        productWarranty: "",
        performanceWarranty: "",
        quantity: ""
    })

    const {code, manufacturer,performanceWarranty, productWarranty,technology, title, quantity  } = text

    const handleText = e => {
        setText({...text, [e.target.name]: e.target.value})
    }

    const handleFile = e => {
        setFile(e.target.files[0])
    }
    
    const fetchRecord = async () => {
        try {
            const url = "https://solar365.co.in/module/"

            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })

            const data = await res.json()
            return setPanelsData(data)

        } catch (error) {
            console.log(error)
        }
    }

    const createPanels = e => {
        e.preventDefault()
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd");

            const formdata = new FormData();
            formdata.append('title', title)
            formdata.append("code", code);
            formdata.append("panel_logo", file);
            formdata.append("manufacturer", manufacturer);
            formdata.append("technology", technology);
            formdata.append("product_warranty", productWarranty);
            formdata.append("performance_warranty", performanceWarranty);
            formdata.append("add_new_quantity", quantity);
            formdata.append("my_list", "false");

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/module/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    setDisplayForm(false)
                    console.log(result)
                    return fetchRecord()
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchRecord()

        return () => subscribe
    }, [])

    if(loading){
        return <Loading />
    }

    return (
        <>
            <div className='container-fluid overflow-hidden' style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <AdminSideNavigation />
                </div>
                <div className="container py-5 flex flex-col overflow-hidden">
                    <div className='py-2 flex justify-end'>
                        <Button title="Create New Panel" background="aqua" color="gray" onclick={() => setDisplayForm(true)} />
                    </div>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Id</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Title</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Code</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Manufacturer</div>
                        </li>
                        {
                            panelsData.length < 1 ? <h2>There is no order available right now...</h2> : panelsData.map((ele, idx) => {
                                return (
                                    <Link to="/panels-orders" state={{ ele }} key={idx}>
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
            <div style={{ transition: "0.4s", width: "60%", height: '90vh', background: 'white', display: displayForm ? 'flex' : 'none', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', left: '50%', top: "50%", boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.2),-2px -2px 10px 1px rgba(0,0,0,0.2)', overflowY: 'scroll', transform: 'translate(-50%, -50%)', flexDirection: 'column' }}>
                {/* <ImCross style={{position: 'absolute', top: '5px', left: '10px', cursor: 'pointer'}} onClick={() => setDisplayForm(false)}/> */}
                <div className='my-10 flex flex-col justify-center items-center gap-3' style={{ width: "80%" }}>
                <Heading heading="Enter details for creating new Panels" size="24px"/>
                    <form className='flex flex-col justify-center items-center gap-3' style={{ width: "100%" }} onSubmit={createPanels}>
                    <Input width="100%" placeholder="Product Code" value={code} name="code" onChange={handleText}/>
                    <Input width="100%" placeholder="Title" value={title} name="title" onChange={handleText}/>
                    <Input width="100%" placeholder="upload your logo" type="file" onChange={handleFile}/>
                    <Input width="100%" placeholder="Technology" value={technology} name="technology" onChange={handleText}/>
                    <Input width="100%" placeholder="Product warranty" value={productWarranty} name="productWarranty" onChange={handleText}/>
                    <Input width="100%" placeholder="Performance Warranty" value={performanceWarranty} name="performanceWarranty" onChange={handleText}/>
                    <Input width="100%" placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleText}/>
                    <Input width="100%" placeholder="Add Quantity" value={quantity} name="quantity" onChange={handleText}/>
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

export default Panels