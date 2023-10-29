import React, { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'


function InverterOrders() {

    const data = useLocation()
    const [cookies] = useCookies();
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const [displayForm, setDisplayForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inverterData, setInverterData] = useState({})
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

    const updateOrder = () => {
        try {
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const formdata = new FormData();
            formdata.append("code", code !== "" ? code : inverterData?.code);
            // formdata.append("inverter_logo", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2022-11-10 10-56-29.png");
            formdata.append("inverter_type", inverterType !== "" ? inverterType : inverterData?.inverter_type);
            formdata.append("rated_output_power", ratedOutputPower !== "" ? ratedOutputPower : inverterData?.rated_output_power);
            formdata.append("product_warranty", productwarranty !== "" ? productwarranty : inverterData?.product_warranty);
            formdata.append("additional_part_warranty", additionalpartwarranty !== "" ? additionalpartwarranty : inverterData?.additional_part_warranty);
            formdata.append("my_list", "true");
            formdata.append("default_inverter_range", defaultinverterrange !== "" ? defaultinverterrange : inverterData?.default_inverter_range);
            formdata.append("manufacturer", manufacturer !== "" ? manufacturer : inverterData?.manufacturer);
            formdata.append("title", title !== "" ? title : inverterData?.title);

            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/inverter_module/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: 'Product updated successfully...', autoClose: true, isLoading: false, type: 'success' })
                    console.log(result)
                    setDisplayForm(false)
                    return fetchRecord()
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const deleteRecord = () => {
        try {
            const loadingId = toast.loading('Please wait....')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/inverter_module/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, {render: 'Deleted Successfully...', isLoading: false, autoClose: true, type: 'success'})
                    console.log(result)
                    return navigate(-1)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRecord = async () => {
        try {
            const url = `https://solar365.co.in/inverter_module/${data?.state?.ele?.id}`
            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)
            const res = await fetch(url, {
                headers: headers
            })
            const result = await res.json()
            setInverterData(result)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchRecord()

        return () => [subscribe]
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className='admin__order__container' style={{ justifyContent: 'flex-start' }}>
            <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
                <div style={{ width: '50%' }}>
                    <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
                </div>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
                    <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                    <Button title="Delete" color="white" background="red" onclick={deleteRecord}/>
                </div>
            </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Inverter Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Code" value={inverterData?.code} />
                        <Line title="Title" value={inverterData?.title} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Manufacturer" value={inverterData?.manufacturer} />
                        <Line title="Product Warranty" value={inverterData?.product_warranty} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Inverter Type" value={inverterData?.inverter_type} />
                        <Line title="Rated Output Power" value={inverterData?.rated_output_power} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Additional part warranty" value={inverterData?.additional_part_warranty} />
                        <Line title="Default Inverter Range" value={inverterData?.default_inverter_range} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your inverter details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
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
                            <Button title="Submit" background="orange" color="white" onclick={updateOrder} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default InverterOrders