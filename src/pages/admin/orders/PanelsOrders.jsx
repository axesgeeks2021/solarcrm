import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'
import AdminSideNavigation from '../menu/AdminSideNavigation'

import { useCookies } from "react-cookie";


function PanlesOrders() {

    const [cookies] = useCookies();

    const data = useLocation()

    const navigate = useNavigate()

    const [file, setFile] = useState()

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const [displayForm, setDisplayForm] = useState(false)

    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState({
        code: "",
        manufacturer: "",
        technology: "",
        productwarranty: "",
        performancewarranty: "",
        title: "",
        mylist: ""
    })

    const { code, manufacturer, mylist, technology, performancewarranty, productwarranty, title } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const updateOrder = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("code", code);
            formdata.append("panel_logo", file);
            formdata.append("manufacturer", manufacturer);
            formdata.append("technology", technology);
            formdata.append("product_warranty", productwarranty);
            formdata.append("performance_warranty", performancewarranty);
            formdata.append("my_list", "true");
            formdata.append("title", title);

            let requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://solar365.co.in/module/${data.state.ele.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTimeout(() => {
                        setLoading(false)
                        console.log(result)
                    }, 1000);
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='admin__order__container' style={{ justifyContent: 'flex-start' }}>

            <div className='flex justify-between items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid white' }}>
                <div>
                    <Button title="Go Back" background="white" alignSelf="flex-start" onclick={() => navigate(-1)} />
                </div>
                <div className='flex justify-end gap-10'>
                    <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                    <Button title="Delete" color="white" background="red" />
                </div>
            </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Panels Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Code" value={data.state.ele.code} />
                        <Line title="Title" value={data.state.ele.title} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Product Warranty" value={data.state.ele.product_warranty} />
                        <Line title="Performance Warranty" value={data.state.ele.performance_warranty} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Technology" value={data.state.ele.technology} />
                        <Line title="Manufacturer" value={data.state.ele.manufacturer} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your panels details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Code" value={code} name="code" onChange={handleChange} />
                            <FormInput placeholder="Title" value={title} name="title" onChange={handleChange} />
                            <FormInput placeholder="Panel Logo" type="file" onChange={handlefile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Technology" value={technology} name="technology" onChange={handleChange} />
                            <FormInput placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Product Warranty" value={productwarranty} name="productwarranty" onChange={handleChange} />
                            <FormInput placeholder="Performance warranty" value={performancewarranty} name="performancewarranty" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default PanlesOrders