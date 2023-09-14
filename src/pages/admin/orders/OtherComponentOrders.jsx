import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";


function OtherComponentOrders() {

    const [cookies] = useCookies();

    const navigate = useNavigate()
    
    const data = useLocation()

    const [file, setFile] = useState()

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const [displayForm, setDisplayForm] = useState(false)

    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState({
        code: "",
        manufacturer: "",
        smartmeter: "",
        componenttype: "",
        productwarranty: "",
        mylist: "",
        optimisor:"",
        optimisorheading: "",
        smartmeterheading: "",
        title: ""
    })

    const { code,componenttype,manufacturer,mylist,optimisor, optimisorheading,productwarranty,smartmeter,smartmeterheading, title} = value

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
            formdata.append("component_logo", file);
            formdata.append("manufacturer", manufacturer);
            formdata.append("smart_meter", smartmeter);
            formdata.append("component_type", componenttype);
            formdata.append("product_warranty", productwarranty);
            formdata.append("my_list", "true");
            formdata.append("optimisor", optimisor);
            formdata.append("optimisor_heading", optimisorheading);
            formdata.append("smart_meter_heading", smartmeterheading);
            formdata.append("title", title);
            
            let requestOptions = {
              method: 'PATCH',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            
            fetch(`https://solar365.co.in/other_component/${data.state.ele.id}/`, requestOptions)
              .then(response => response.text())
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
        <div className='admin__order__container' style={{justifyContent: 'flex-start'}}>
          <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
        <div style={{ width: '50%' }}>
          <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
          <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
          <Button title="Delete" color="white" background="red" />
        </div>
      </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Other Component Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Code" value={data.state.ele.code} />
                        <Line title="Title" value={data.state.ele.title} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Product Warranty" value={data.state.ele.product_warranty} />
                        <Line title="Manufacturer" value={data.state.ele.manufacturer} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Optimisor" value={data.state.ele.optimisor} />
                        <Line title="Optimisor Heading" value={data.state.ele.optimisor_heading} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Smart Meter" value={data.state.ele.smart_meter} />
                        <Line title="Smart Meter Heading" value={data.state.ele.smart_meter_heading} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your Other component details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Code" value={code} name="code" onChange={handleChange} />
                            <FormInput placeholder="Title" value={title} name="title" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Smart Meter" value={smartmeter} name="smartmeter" onChange={handleChange} />
                            <FormInput placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Component Logo" type="file" onChange={handlefile} />
                            <FormInput placeholder="Product Warranty" value={productwarranty} name="productwarranty" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Optimisor" value={optimisor} name="optimisor" onChange={handleChange} />
                            <FormInput placeholder="Optimisor Heading" value={optimisorheading} name="optimisorheading" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Component Type" value={componenttype} name="componenttype" onChange={handleChange} />
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

export default OtherComponentOrders