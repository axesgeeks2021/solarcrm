import React from 'react'

import { useLocation } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input'


function InverterOrders() {

    const data = useLocation()

    const [cookies] = useCookies();

    const [file, setFile] = useState()

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const [displayForm, setDisplayForm] = useState(false)

    const [loading, setLoading] = useState(false)

    const [value, setValue] = useState({
        code: "",
        inverterType: "",
        ratedOutputPower: "",
        productwarranty: "",
        additionalpartwarranty: "",
        defaultinverterrange: "",
        manufacturer: "",
        title: ""
    })

    const { additionalpartwarranty, code, defaultinverterrange, inverterType, manufacturer, productwarranty, ratedOutputPower, title } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const updateOrder = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            var formdata = new FormData();
            formdata.append("code", code);
            formdata.append("inverter_logo", file);
            formdata.append("inverter_type", inverterType);
            formdata.append("rated_output_power", ratedOutputPower);
            formdata.append("product_warranty", productwarranty);
            formdata.append("additional_part_warranty",additionalpartwarranty);
            formdata.append("my_list", "true");
            formdata.append("default_inverter_range", defaultinverterrange);
            formdata.append("manufacturer", manufacturer);
            formdata.append("title", title);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://13.126.231.119/inverter_module/${data.state.ele.id}/`, requestOptions)
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
        <div className='admin__order__container' style={{justifyContent: 'flex-start'}}>
            <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid white' }}>
                <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                <Button title="Delete" color="white" background="red" />
            </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Inverter Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Code" value={data.state.ele.code} />
                        <Line title="Title" value={data.state.ele.title} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Manufacturer" value={data.state.ele.manufacturer} />
                        <Line title="Product Warranty" value={data.state.ele.product_warranty} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Inverter Type" value={data.state.ele.inverter_type} />
                        <Line title="Rated Output Power" value={data.state.ele.rated_output_power} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Additional part warranty" value={data.state.ele.additional_part_warranty} />
                        <Line title="Default Inverter Range" value={data.state.ele.default_inverter_range} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your inverter details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Code" value={code} name="code" onChange={handleChange} />
                            <Input placeholder="Title" value={title} name="title" onChange={handleChange} />

                            <Input placeholder="Inverter Logo" type="file" onChange={handlefile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Inverter Type" value={inverterType} name="inverterType" onChange={handleChange} />
                            <Input placeholder="Rated Output Power" value={ratedOutputPower} name="ratedOutputPower" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Product Warranty" value={productwarranty} name="productwarranty" onChange={handleChange} />
                            <Input placeholder="Additional part warranty" value={additionalpartwarranty} name="additionalpartwarranty" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Default inverter range" value={defaultinverterrange} name="defaultinverterrange" onChange={handleChange} />
                            <Input placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleChange} />
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

export default InverterOrders