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


function OtherComponentOrders() {

    const [cookies] = useCookies();
    const navigate = useNavigate()
    const data = useLocation()
    const [file, setFile] = useState(null)

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const [displayForm, setDisplayForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otherComponentData, setotherComponentData] = useState({})

    const [value, setValue] = useState({
        code: "",
        manufacturer: "",
        smartmeter: "",
        componenttype: "",
        productwarranty: "",
        mylist: "",
        optimisor: "",
        optimisorheading: "",
        smartmeterheading: "",
        title: "",
        quantity: "",
    })

    const { code, quantity, componenttype, manufacturer, mylist, optimisor, optimisorheading, productwarranty, smartmeter, smartmeterheading, title } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const updateOrder = async () => {
        try {
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const formdata = new FormData();
            formdata.append("code", code !== "" ? code : otherComponentData?.code);
            // formdata.append("component_logo", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2022-11-10 10-57-00.png" !== "" ?  : otherComponentData?.);
            formdata.append("manufacturer", manufacturer !== "" ? manufacturer : otherComponentData?.manufacturer);
            // formdata.append("smart_meter", smartmeter !== "" ?  : otherComponentData?.smart_meter);
            // formdata.append("component_type", componenttype !== "" ?  : otherComponentData?.com);
            // formdata.append("product_warranty", productwarranty !== "" ?  : otherComponentData?.);
            formdata.append("my_list", "true");
            // formdata.append("optimisor", optimisor !== "" ?  : otherComponentData?.);
            // formdata.append("optimisor_heading", optimisorheading !== "" ?  : otherComponentData?.);
            // formdata.append("smart_meter_heading", smartmeterheading !== "" ?  : otherComponentData?.);
            formdata.append("title", title !== "" ? title : otherComponentData?.title);
            formdata.append("add_new_quantity", quantity !== "" ? quantity : otherComponentData?.add_new_quantity);

            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/other_component/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: 'Updated successfully...', autoClose: true, isLoading: false, type: 'success' })
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
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/other_component/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: 'Deleted successfully...', isLoading: false, type: 'success', autoClose: true })
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
            const url = `https://solar365.co.in/other_component/${data?.state?.ele?.id}/`
            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)
            const res = await fetch(url, {
                headers: headers
            })
            const result = await res.json()
            setotherComponentData(result)
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
                    <Button title="Delete" color="white" background="red" onclick={() => setDeleteForm(true)} />

                    {
                        deleteForm &&
                        <div style={{ padding: '0px 20px', paddingBottom: '20px', background: 'beige', position: 'fixed', top: "50%", left: "50%", transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.1), -2px -2px 10px 2px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                            <p style={{ margin: '20px 0' }}>Are you sure want to delete?</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button title="Ok" background="#4bb543" margin="0px 10px" color="#fff" onclick={deleteRecord} />
                                <Button title="Cancel" background="orange" color="#fff" onclick={() => setDeleteForm(false)} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Other Component Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Id" value={otherComponentData?.id} />
                        <Line title="Code" value={otherComponentData?.code} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Title" value={otherComponentData?.title} />
                        <Line title="Manufacturer" value={otherComponentData?.manufacturer} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        {/*<Line title="Previous Quantity" value={otherComponentData?.previous_quantity}  />*/}
                        <Line title="Current Quantity" value={otherComponentData?.total_quantity} />
                    </div>
                </div>
                <div className="container__table completeContainer" >
                    <div className="completejobs__box">
                        <div className="header">
                            <p style={{alignSelf: 'flex-start'}}>Stock History</p>
                        </div>
                        <div className='content' style={{overflowY: 'scroll',padding: '10px 10px', height: '40vh', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                            {
                                otherComponentData?.stocks?.map((ele, idx) => {
                                    return(
                                        <p key={idx}>{ele?.updated_at.split(' ')[0]} : {ele?.stock_quantity} </p>
                                    )
                                })                         
                            }

                        </div>
                    </div>

                </div>

            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your Other component details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Code" value={code} name="code" onChange={handleChange} />
                            <Input placeholder="Title" value={title} name="title" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleChange} />
                            <Input width="100%" placeholder="Add Quantity" value={quantity} name="quantity" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            {/*<Input placeholder="Component Logo" type="file" onChange={handlefile} />*/}
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

export default OtherComponentOrders