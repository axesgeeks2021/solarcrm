import React, { useState, useEffect } from 'react'
import SideMenu from '../menu/SideMenu'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button/Button';

import FormInput from '../../../components/inputsfield/FormInput';
import Heading from '../../../components/heading/Heading';
import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input';
import Loading from '../../../components/loading/Loading';
import { toast } from 'react-toastify';

function Battery() {
    const [batteryData, setBatteryData] = useState([])

    const [displayForm, setDisplayForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const [cookies] = useCookies();

    const [file, setFile] = useState(null)

    const [text, setText] = useState({
        code: "",
        manufacturer: "",
        title: "",
        totalEnergy: "",
        productWarranty: "",
        myList: "",
        quantity: ""
    })

    const { code, manufacturer, myList, productWarranty, title, totalEnergy, quantity } = text

    const handleText = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

    const handleFile = e => {
        setFile(e.target.files[0])
    }

    const fetchRecord = async () => {
        try {
            const url = "http://13.126.231.119/battery_module/"

            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })

            const data = await res.json()
            setBatteryData(data)

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const createBattery = (e) => {
        e.preventDefault()
        try {
            // setLoading(true)
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd");
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            const formdata = new FormData();
            formdata.append("code", code);
            // formdata.append("battery_logo", file);
            formdata.append("manufacturer", manufacturer);
            formdata.append("title", title);
            formdata.append("total_energy", totalEnergy);
            formdata.append("product_warranty", productWarranty);
            formdata.append("my_list", "true");
            formdata.append("add_new_quantity", quantity);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://13.126.231.119/battery_module/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // setLoading(false)
                    toast.update(loadingId, {render: 'New battery successfully addedd...', isLoading: false, type: 'success', autoClose: true})
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
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <AdminSideNavigation />
                </div>
                <div className="container py-5">
                    <div className='py-2 flex justify-end'>
                        <Button title="Create New Battries" background="aqua" color="gray" onclick={() => setDisplayForm(true)} />
                    </div>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Id</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Title</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Code</div>
                            <div className="col col-3 text-center text-slate-50 text-base font-bold">Manufacturer</div>
                        </li>
                        {
                            batteryData.length < 1 ? <h2>There is no order available right now...</h2> : batteryData.map((ele, idx) => {
                                return (
                                    <Link to="/battery-orders" state={{ ele }} key={idx}>
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
            <div style={{ transition: "0.4s", width: "60%", height: '90vh', background: 'white', display: displayForm ? 'flex' : 'none', justifyContent: 'flex-start', alignItems: 'center', position: 'absolute', left: '50%', top: "50%", boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.2),-2px -2px 10px 1px rgba(0,0,0,0.2)', overflowY: 'scroll', transform: 'translate(-50%, -50%)', flexDirection: "column" }}>
                {/* <ImCross style={{position: 'absolute', top: '5px', left: '10px', cursor: 'pointer'}} onClick={() => setDisplayForm(false)}/> */}
                <div className='my-10 flex flex-col justify-center items-center gap-3' style={{ width: "80%" }}>
                <Heading heading="Enter details for creating new Panels" size="24px"/>
                    <form style={{width: '100%'}} className='my-10 flex flex-col justify-center items-center gap-3' onSubmit={createBattery}>
                        <Input width="100%" placeholder="Title" value={title} name="title" onChange={handleText}  />
                        <Input width="100%" placeholder="Product Code" value={code} name="code" onChange={handleText}  />
                        <Input width="100%" placeholder="upload your logo" type="file" onChange={handleFile}  />
                        <Input width="100%" placeholder="Rated Output Power..." value={totalEnergy} name="totalEnergy" onChange={handleText}  />
                        <Input width="100%" placeholder="Product warranty" value={productWarranty} name="productWarranty" onChange={handleText}  />
                        <Input width="100%" placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleText}  />
                        <Input width="100%" placeholder="Add Quantity" value={quantity} name="quantity" onChange={handleText} />
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

export default Battery