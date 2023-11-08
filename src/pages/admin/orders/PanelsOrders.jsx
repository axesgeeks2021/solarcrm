import React, { useEffect } from 'react'

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
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'


function PanlesOrders() {

    const [cookies] = useCookies();
    const data = useLocation()
    const navigate = useNavigate()
    const [file, setFile] = useState()

    const handlefile = e => {
        setFile(e.target.files[0])
    }
    const [deleteForm, setDeleteForm] = useState(false)
    const [displayForm, setDisplayForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [panelsData, setPanelsData] = useState({})
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

    const updateOrder = () => {
        try {
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const formdata = new FormData();
            formdata.append("code", code !== "" ? code : panelsData?.code);
            // formdata.append("panel_logo", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2022-11-10 10-56-20.png");
            formdata.append("manufacturer", manufacturer !== "" ? manufacturer : panelsData?.manufacturer);
            formdata.append("technology", technology !== "" ? technology : panelsData?.technology);
            formdata.append("product_warranty", productwarranty !== "" ? productwarranty : panelsData?.product_warranty);
            formdata.append("performance_warranty", performancewarranty !== "" ? performancewarranty : panelsData?.performance_warranty);
            formdata.append("my_list", "false");
            formdata.append("title", title !== "" ? title : panelsData?.title);

            const requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/module/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: "Product updated successfully...", isLoading: false, autoClose: true, type: 'success' })
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

            fetch(`https://solar365.co.in/module/${data?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    toast.update(loadingId, {render: 'Deleted Successfully...', type: 'success', autoClose: true, isLoading: false})
                    return navigate(-1)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRecord = async () => {
        try {
            const url = `https://solar365.co.in/module/${data?.state?.ele?.id}/`
            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)
            const res = await fetch(url, {
                headers: headers
            })
            const result = await res.json()
            setPanelsData(result)

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

            <div className='flex justify-between items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid white' }}>
                <div>
                    <Button title="Go Back" background="white" alignSelf="flex-start" onclick={() => navigate(-1)} />
                </div>
                <div className='flex justify-end gap-10'>
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
                        <Heading heading="Panels Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Code" value={panelsData?.code} />
                        <Line title="Title" value={panelsData?.title} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Product Warranty" value={panelsData?.product_warranty} />
                        <Line title="Performance Warranty" value={panelsData?.performance_warranty} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Technology" value={panelsData?.technology} />
                        <Line title="Manufacturer" value={panelsData?.manufacturer} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your panels details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Code" value={code} name="code" onChange={handleChange} />
                            <Input placeholder="Title" value={title} name="title" onChange={handleChange} />
                            <Input placeholder="Panel Logo" type="file" onChange={handlefile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Technology" value={technology} name="technology" onChange={handleChange} />
                            <Input placeholder="Manufacturer" value={manufacturer} name="manufacturer" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Product Warranty" value={productwarranty} name="productwarranty" onChange={handleChange} />
                            <Input placeholder="Performance warranty" value={performancewarranty} name="performancewarranty" onChange={handleChange} />
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

export default PanlesOrders