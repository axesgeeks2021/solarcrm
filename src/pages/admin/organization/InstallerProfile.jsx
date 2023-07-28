import React, { useState, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";
import Accordian from '../../../components/Accordian'

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai"


function AdminOrders() {

    const [cookies] = useCookies();

    const data = useLocation()

    const navigate = useNavigate()

    const [showState, setShowState] = useState(false)
    const [showState1, setShowState1] = useState(false)
    const [showState2, setShowState2] = useState(false)
    const [showState3, setShowState3] = useState(false)


    const [displayForm, setDisplayForm] = useState(false)

    const [loading, setLoading] = useState(false)

    const [listOfAvailableDates, setListOfAvailableDates] = useState({})
    const [previousRecordsOfAvailability, setPreviousRecordsOfAvailability] = useState([])
    const [installerProfile, setInstallerProfile] = useState({})

    const [file, setFile] = useState()

    const handleFile = e => {
        setFile(e.target.files[0])
    }

    const [value, setValue] = useState({
        quotation: "",
        quantity: "",
        rate: "",
        dueDate: "",
        fullpayduedate: "",
        pay: "",
        installationType: "",
        isDelivered: "",
        isSend: "",
        description: "",
        otherComponenet: "",
    })

    const { dueDate, fullpayduedate, pay, quantity, quotation, rate, description, installationType, isDelivered, isSend, otherComponenet } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const fetchLatestAvailability = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/inst-avail/31/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    setListOfAvailableDates(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchHistoryOfRecords = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/inst-avail-list/31/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('history', result)
                    setPreviousRecordsOfAvailability(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchInstallerDetails = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/get_installer_profile/2/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setInstallerProfile(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchLatestAvailability()

        const subscribe1 = fetchHistoryOfRecords()

        const subscribe2 = fetchInstallerDetails()

        return () => [subscribe, subscribe1, subscribe2]
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className='admin__order__container'>
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
                    {/* Customer Details */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
                        <div className='accordian__box'>
                            <div className='accordian__question' onClick={() => setShowState(!showState)}>Installer Profile
                                {
                                    !showState ? <AiOutlinePlus size={40} onClick={() => setShowState(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState(false)} style={{ transition: '0.3s' }} />
                                }
                            </div>
                            <div style={{ height: showState ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                                <Line title="ID" value={installerProfile?.id} />
                                <Line title="Username" value={installerProfile?.admin?.user?.username} />
                                <Line title="First Name" value={installerProfile?.admin?.user?.first_name} />
                                <Line title="Last Name" value={installerProfile?.admin?.user?.last_name} />
                                <Line title="Email" value={installerProfile?.admin?.user?.email} />
                                <Line title="Mobile" value={installerProfile?.admin?.user?.phone} />
                                <Line title="Department" value={installerProfile?.department} />
                            </div>
                        </div>
                    </div>
                    {/* Latest Availability */}
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
                        <div className='accordian__box'>
                            <div className='accordian__question' onClick={() => setShowState1(!showState1)}>Latest Availability
                                {
                                    !showState1 ? <AiOutlinePlus size={40} onClick={() => setShowState1(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState1(false)} style={{ transition: '0.3s' }} />
                                }

                            </div>
                            <div style={{ height: showState1 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                                <table style={{ background: 'gray', border: '2px solid white', margin: '20px 10px' }}>
                                    <thead>
                                        <th>S.No</th>
                                        <th>Dates</th>
                                        <th>Working</th>
                                        <th>Status</th>
                                    </thead>
                                    <tbody>
                                        {
                                            listOfAvailableDates?.available_days?.map((ele, idx) => {
                                                return (
                                                    <tr key={idx} style={{ background: idx % 2 === 0 ? 'black' : 'white', border: idx % 2 === 0 ? '2px solid white' : '2px solid black' }}>
                                                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black',fontWeight: '600' }}>{idx + 1}</td>
                                                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black',fontWeight: '600' }}>{ele?.date}</td>
                                                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black',fontWeight: '600' }}>Working</td>
                                                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black',fontWeight: '600' }}>Done</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Previous Records of works */}
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
                        <div className='accordian__box'>
                            <div className='accordian__question' onClick={() => setShowState2(!showState2)}>History
                                {
                                    !showState2 ? <AiOutlinePlus size={40} onClick={() => setShowState2(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState2(false)} style={{ transition: '0.3s' }} />
                                }

                            </div>
                            <div style={{ height: showState2 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                                <table style={{ background: 'gray', border: '2px solid white', margin: '20px 10px',  }}>
                                    <thead>
                                        <th style={{padding: '10px 0'}}>S.No</th>
                                        <th style={{padding: '10px 0'}}>Dates</th>
                                        <th style={{padding: '10px 0'}}>Working</th>
                                        <th style={{padding: '10px 0'}}>Status</th>
                                    </thead>
                                    <tbody>
                                        {
                                            previousRecordsOfAvailability?.available_days?.map((ele, idx) => {
                                                return(
                                                    <tr key={idx} style={{ background: idx % 2 === 0 ? 'black' : 'white', border: idx % 2 === 0 ? '2px solid white' : '2px solid black' }}>
                                                    <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{idx + 1}</td>
                                                    <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{ele?.date}</td>
                                                    <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>Working</td>
                                                    <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>Done</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
                    </div>
                    <hr></hr>
                    {/* Other Component */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
                        <div className='accordian__box'>
                            <div className='accordian__question' onClick={() => setShowState3(!showState3)}>Other Component Details
                                {
                                    !showState3 ? <AiOutlinePlus size={40} onClick={() => setShowState3(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState3(false)} style={{ transition: '0.3s' }} />
                                }

                            </div>
                            <div style={{ height: showState3 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                         
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your order..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Quotation" value={quotation} name="quotation" onChange={handleChange} />
                            <FormInput placeholder="Quantity" value={quantity} name="quantity" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Rate" value={rate} name="rate" onChange={handleChange} />
                            <FormInput placeholder="Due Date" type="date" value={dueDate} name="dueDate" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Installation Type" value={installationType} name="installationType" onChange={handleChange} />
                            <FormInput placeholder="Is Delivered" value={isDelivered} name="isDelivered" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Is Send" value={isSend} name="isSend" onChange={handleChange} />
                            <FormInput placeholder="Description" value={description} name="description" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Other Component" value={otherComponenet} name="otherComponenet" onChange={handleChange} />
                            <FormInput placeholder="Document File" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Full pay due date" type="date" value={fullpayduedate} name="fullpayduedate" onChange={handleChange} />
                            <FormInput placeholder="Pay" value={pay} name="pay" onChange={handleChange} />
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

export default AdminOrders