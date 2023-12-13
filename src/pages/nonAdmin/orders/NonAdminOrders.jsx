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

import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai"
import { toast } from 'react-toastify'
import Input from '../../../components/inputsfield/Input'


function AdminOrders() {

  const [cookies] = useCookies();
  const data = useLocation()

  const navigate = useNavigate()

  const [showState, setShowState] = useState(false)
  const [showState1, setShowState1] = useState(false)
  const [showState2, setShowState2] = useState(false)
  const [showState3, setShowState3] = useState(false)
  const [listofSlotsModal, setListOfSlotsModal] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderDetails, setOrderDetails] = useState([])
  const [listOfSlots, setListOfSlots] = useState({})
  const [bookModal, setBookModal] = useState({
    status: false,
    date: null
  })

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

  const fetchSlots = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/slots_list/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setListOfSlots(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const updateSlots = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const formdata = new FormData();
      formdata.append("appointment_date", bookModal.date);
      formdata.append("project", data?.state?.project);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/take-appointment/", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result?.message === 'success') {
            toast.success('Your appointment has been booked')
            setBookModal({
              status: false,
              date: null
            })
            setListOfSlotsModal(false)
            return fetchSlots()
          }
          console.log(result)
        }
        )
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
   
  }, [])

  const updateOrder = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      let myHeaders = new Headers();
      myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

      let formdata = new FormData();
      formdata.append("quotation", quotation);
      formdata.append("quantity", quantity);
      formdata.append("rate", rate);
      formdata.append("due_date", dueDate);
      formdata.append("full_pay_due_date", fullpayduedate);
      formdata.append("pay", pay);

      let requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/order/${data.state.ele.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setTimeout(() => {
            setLoading(false)
            // console.log(result)
            setOrderDetails(result)
          }, 1000);
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  const fetchOrderDetails = () => {
    try {
      setLoading(true)
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/non-admin-order/${data?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => 
          {
              setLoading(false)
              console.log('orders;,',result)
              setOrderDetails(result)
          })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = fetchOrderDetails()

    const subscribe2 = fetchSlots()

    return () => [subscribe, subscribe2]

  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div style={{ width: '100%', background: 'yellow', padding: '5px 20px', display: 'flex', justifyContent: 'flex-start',  }}>
        <p>Your appointment has been already booked</p>
      </div>
      <div className='admin__order__container' style={{ position: 'relative', filter: listOfSlots ? 'blur(0px)' : 'blur(10px)' }}>
        <div style={{ zIndex: 1000, width: '40%', background: '#fff', position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', height: '30%', display: bookModal.status ? 'flex' : 'none', justifyContent: 'space-between', boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3), -2px -2px 20px 2px rgba(0,0,0,0.3)', borderRadius: '5px', backfaceVisibility: 'hidden', alignItems: 'center', flexDirection: 'column' }}>
          <p style={{ fontSize: '1.1rem', margin: '5% 2%', alignSelf: 'flex-start' }}>Please press confirm to book your slot</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <button style={{ background: 'green', color: 'white', fontWeight: '600', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px' }} onClick={updateSlots}>Confirm</button>
            <button onClick={() => setBookModal({
              status: false,
              date: null
            })} style={{ background: '', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px', fontWeight: '600' }}>Cancel</button>
          </div>
        </div>
        <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
          <div style={{ width: '50%' }}>
            <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />

          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
            <Button title="Book Your Slot" color="black" background="lightgreen" onclick={() => setListOfSlotsModal(!listofSlotsModal)} />
            <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
            <Button title="Delete" color="white" background="red" />
          </div>
        </div>
        <div className='admin__card'>
          <div className='admin__order__details'>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Customer Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr> */}
            {/* Customer Details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
              <div className='accordian__box'>
                <div className='accordian__question' onClick={() => setShowState(!showState)}>Customer Details
                  {
                    !showState ? <AiOutlinePlus size={40} onClick={() => setShowState(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState(false)} style={{ transition: '0.3s' }} />
                  }
                </div>
                <div style={{ height: showState ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                  <Line title="Project" value={data?.state?.project} />
                  <Line title="Customer Email" value={data?.state?.to_address?.user?.email} />
                  {/*<Line title="Installation Type" value={data?.state?.installation_type} />*/}
                  <Line title="Building Type" value={data?.state?.building_Type} />
                  {/* <Line title="Quotation" value={data?.state?.quotation} /> */}
                  <Line title="Nmi Number" value={data?.state?.nmi_no} />
                  <Line title="Meter Phase" value={data?.state?.meter_Phase} />
                  <Line title="Status" value={data?.state?.order_status} />
                </div>
              </div>
            </div>
            {/* Panels Details */}
            <hr></hr>
            {/*<div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
              <div className='accordian__box'>
                <div className='accordian__question' onClick={() => setShowState1(!showState1)}>Panels Details
                  {
                    !showState1 ? <AiOutlinePlus size={40} onClick={() => setShowState1(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState1(false)} style={{ transition: '0.3s' }} />
                  }
                </div>
                <div style={{ height: showState1 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                  <Line title="Title" value={orderDetails?.panels?.title} />
                  <Line title="Code" value={orderDetails?.panels?.code} />
                  <Line title="Manufacturer" value={orderDetails?.panels?.manufacturer} />
                  <Line title="Performance Warranty" value={orderDetails?.panels?.performance_warranty} />
                  <Line title="Product Warranty" value={orderDetails?.panels?.product_warranty} />
                  <Line title="Technology" value={orderDetails?.panels?.technology} />
                </div>
              </div>
                </div>*/}
            {/* Panels Details */}
            <hr></hr>
            {/*<div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
              <div className='accordian__box'>
                <div className='accordian__question' onClick={() => setShowState2(!showState2)}>Inverter Details
                  {
                    !showState2 ? <AiOutlinePlus size={40} onClick={() => setShowState2(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState2(false)} style={{ transition: '0.3s' }} />
                  }
                </div>
                <div style={{ height: showState2 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                  <Line title="Title" value={orderDetails?.inverter?.title} />
                  <Line title="Code" value={orderDetails?.inverter?.code} />
                  <Line title="Manufacturer" value={orderDetails?.inverter?.manufacturer} />
                  <Line title="Inverter Type" value={orderDetails?.inverter?.inverter_type} />
                  <Line title="Product Warranty" value={orderDetails?.inverter?.product_warranty} />
                  <Line title="Rated Output Power" value={orderDetails?.inverter?.rated_ouptut_power} />
                </div>
              </div>
                </div>*/}
            <hr></hr>
            {/* Other Component */}
            {/*<div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
              <div className='accordian__box'>
                <div className='accordian__question' onClick={() => setShowState3(!showState3)}>Other Component Details
                  {
                    !showState3 ? <AiOutlinePlus size={40} onClick={() => setShowState3(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState3(false)} style={{ transition: '0.3s' }} />
                  }
                </div>
                <div style={{ height: showState3 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                  {
                    orderDetails?.other_component?.map((ele, idx) => {
                      return (
                        <div key={idx} style={{ borderRight: '1px solid black' }}>
                          <Line title="Title" value={ele?.title} />
                          <Line title="Code" value={ele?.code} />
                          <Line title="Manufacturer" value={ele?.manufacturer} />
                          <Line title="Optimisor" value={ele?.optimisor} />
                          <Line title="Optimisor Heading" value={ele?.optimisor_heading} />
                          <Line title="Product Warranty" value={ele?.product_warranty} />
                          <Line title="Smart Meter" value={ele?.smart_meter} />
                          <Line title="Smart Meter Heading" value={ele?.smart_meter_heading} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
                </div>*/}
          </div>
        </div>
        {
          displayForm && <FormsContainer flexDirection="column">
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <Heading heading="Update your order..." size="200%" />
            </div>
            <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Quotation" value={quotation} name="quotation" onChange={handleChange} />
                <Input placeholder="Quantity" value={quantity} name="quantity" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Rate" value={rate} name="rate" onChange={handleChange} />
                <Input placeholder="Due Date" type="date" value={dueDate} name="dueDate" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Installation Type" value={installationType} name="installationType" onChange={handleChange} />
                <Input placeholder="Is Delivered" value={isDelivered} name="isDelivered" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Is Send" value={isSend} name="isSend" onChange={handleChange} />
                <Input placeholder="Description" value={description} name="description" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Other Component" value={otherComponenet} name="otherComponenet" onChange={handleChange} />
                <Input placeholder="Document File" type="file" onChange={handleFile} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Full pay due date" type="date" value={fullpayduedate} name="fullpayduedate" onChange={handleChange} />
                <Input placeholder="Pay" value={pay} name="pay" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                <Button title="Submit" background="orange" color="white" />
                <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
              </div>
            </form>
          </FormsContainer>
        }
        {
          <div style={{
            transform: listofSlotsModal ? 'translateY(100px)' : 'translateY(-500px)', background: 'white',
            transition: '0.3s', width: "90%", border: '1px solid black', display: 'flex', justifyContent: 'flex-start', padding: '10px 10px',
            alignItems: 'center', flexDirection: 'column', height: 'auto', overflow: 'hidden',
            position: 'absolute', top: '0', zIndex: 100, boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.3), -2px -2px 10px 2px rgba(0,0,0,0.3)', borderRadius: '4px',
            backdropFilter: 'blur(10px)'
          }}>
            <AiOutlineClose onClick={() => setListOfSlotsModal(false)} size={25} style={{ alignSelf: 'flex-end', cursor: 'pointer', background: 'gray', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2), -2px -2px 10px 2px rgba(0,0,0,0.2)', borderRadius: '2px' }} />
            <table style={{ background: 'gray', border: '2px solid white', margin: '20px 10px' }}>
              <thead >
                <tr>
                  <th style={{ padding: '10px 0' }}>S.No</th>
                  <th style={{ padding: '10px 0' }}>Dates</th>
                  <th style={{ padding: '10px 0' }}>Slots</th>
                  <th style={{ padding: '10px 0' }}>Booking</th>
                </tr>
              </thead>
              <tbody>
                {
                  listOfSlots?.data?.slice(0, 7).map((ele, idx) => {
                    return (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? 'black' : 'white', border: idx % 2 === 0 ? '2px solid white' : '2px solid black' }}>
                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{idx + 1}</td>
                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{ele?.date}</td>
                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{ele?.remaininig_slots}</td>
                        <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>
                          <button onClick={() => setBookModal({
                            status: true,
                            date: ele?.date
                          })} style={{ background: idx % 2 === 0 ? 'white' : 'black', color: idx % 2 !== 0 ? 'white' : 'black', padding: '4px 15px', borderRadius: '3px' }}>Book</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </>
  )
}

export default AdminOrders;