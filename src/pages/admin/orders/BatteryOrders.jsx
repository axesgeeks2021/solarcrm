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


function BatterOrders() {

    const data = useLocation()
    const [cookies] = useCookies();
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [displayForm, setDisplayForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [batteryData, setBatteryData] = useState({})
    const [deleteForm, setDeleteForm] = useState(false)
    const handlefile = e => {
        setFile(e.target.files[0])
    }
    const [value, setValue] = useState({
        code: "",
        totalenergy: "",
        manufacturer: "",
        productwarranty: "",
        title: "",
        mylist: "",
        quantity: ""
    })

    const { code, manufacturer, mylist, productwarranty, title, totalenergy, quantity } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const updateOrder = () => {
        try {
            const loadingId = toast.loading('Please wait.....')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const formdata = new FormData();
            formdata.append("code", code !== "" ? code : batteryData?.code);
            // formdata.append("battery_logo", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2022-11-10 10-56-48.png" !== "" ?  : batteryData?.);
            formdata.append("manufacturer", manufacturer !== "" ? manufacturer : batteryData?.manufacturer);
            formdata.append("title", title !== "" ? title : batteryData?.title);
            formdata.append("total_energy", totalenergy !== "" ? totalenergy : batteryData?.total_energy);
            formdata.append("product_warranty", productwarranty !== "" ? productwarranty : batteryData?.product_warranty);
            formdata.append("my_list", "true");
            formdata.append("add_new_quantity", quantity !== "" ? quantity : batteryData?.add_new_quantity);

            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/battery_module/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: 'Product updated successfully', isLoading: false, autoClose: true, type: 'success' })
                    console.log(result)
                    setDisplayForm(false)
                    return fetchRecord()
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const fetchRecord = async () => {
        try {
            const url = `https://solar365.co.in/battery_module/${data?.state?.ele?.id}`

            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)
            const res = await fetch(url, {
                headers: headers
            })
            const result = await res.json()
            setBatteryData(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchRecord()

        return () => [subscribe]
    }, [])

    const deleteRecord = () => {
        try {
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/battery_module/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, {render: 'Deleted Successfully', isLoading: false, autoClose: true, type: 'success'})
                    console.log(result)
                    return navigate(-1)
                })
                .catch(error => console.log('error', error));
        } catch (error) {

        }
    }


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
                    <Button title="Delete" color="white" background="red" onclick={() => setDeleteForm(true)}/>
                    {
                        deleteForm && 
                        <div style={{ padding: '0px 20px',paddingBottom: '20px', background: 'beige', position: 'fixed', top: "50%", left: "50%", transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.1), -2px -2px 10px 2px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                        <p style={{margin: '20px 0'}}>Are you sure want to delete?</p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <Button title="Ok" background="#4bb543" margin="0px 10px" color="#fff" onclick={deleteRecord}/>
                          <Button title="Cancel" background="orange" color="#fff" onclick={() => setDeleteForm(false)}/>
                        </div>
                      </div>
                      }
                </div>
            </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Battery Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Code" value={batteryData?.code} />
                        <Line title="Title" value={batteryData?.title} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Manufacturer" value={batteryData?.manufacturer} />
                        <Line title="Product Warranty" value={batteryData?.product_warranty} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Total Energy" value={batteryData?.total_energy} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your battery details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Code" value={code} name="code" onChange={handleChange} />
                            <Input placeholder="Title" value={title} name="title" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Total energy" value={totalenergy} name="totalenergy" onChange={handleChange} />
                            <Input placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Battery Logo" type="file" onChange={handlefile} />
                            <Input placeholder="Product Warranty" value={productwarranty} name="productwarranty" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Input width="100%" placeholder="Add Quantity" value={quantity} name="quantity" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="button" background="orange" color="white" onclick={updateOrder} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default BatterOrders