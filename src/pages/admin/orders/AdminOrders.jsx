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
import Input from '../../../components/inputsfield/Input'

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
  const [ordersDetails, setOrderDetails] = useState([])
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

  const { dueDate, fullpayduedate, pay, quantity, quotation, rate,description, installationType, isDelivered, isSend, otherComponenet } = value

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
            setLoading(false)
            console.log(result)
            setOrderDetails(result)
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  const fetchOrderDetails = () => {
    try {
      // setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/order/${data.state.ele.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // setLoading(false)
          console.log('order detials',result)
          setOrderDetails(result)
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = fetchOrderDetails()

    return () => subscribe
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
        {/* <div className='admin__order__image'>
          <img src={airplane} alt={airplane} className='img-fluid' />
        </div> */}
        <div className="container__table completeContainer">
     
        <div className="completejobs__box">
            <div className="header">
                <p>Personal Details</p>
            </div>
            <div className='content'>
                <div>
                    <p>Project Id: {ordersDetails?.project}</p>
                    <p>Name: {ordersDetails?.to_address?.user?.first_name} {ordersDetails?.to_address?.user?.last_name}</p>
                </div>
                <div>
                    <p>Email: {ordersDetails?.to_address?.user?.email}</p>
                    <p>Phone: {ordersDetails?.to_address?.user?.phone}</p>
                </div>
                <div>
                    <p>Address: {ordersDetails?.to_address?.address_line}</p>
                    <p>City: {ordersDetails?.to_address?.city}</p>
                </div>
                <div>
                    <p>State: {ordersDetails?.to_address?.state}</p>
                    <p>Country: {ordersDetails?.to_address?.country}</p>
                </div>
                <div>
                    <p>Latitude: {ordersDetails?.to_address?.latitude}</p>
                    <p>Longitude: {ordersDetails?.to_address?.longitude}</p>
                </div>
            </div>
        </div>
        <div className="completejobs__box">
            <div className="header">
                <p>Project Details</p>
            </div>
            <div className='content'>
                <div>
                    <p>Building Type: {ordersDetails?.building_Type}</p>
                    <p>Meter Phase: {ordersDetails?.meter_Phase}</p>
                </div>
                <div>
                    <p>Monitoring: {ordersDetails?.monitoring}</p>
                    <p>Monitoring Qty: {ordersDetails?.monitoring_quantity}</p>
                </div>
                <div>
                    <p>NMI No: {ordersDetails?.nmi_no}</p>
                    <p>Number of Roof: {ordersDetails?.no_of_Roofs}</p>
                </div>
                <div>
                    <p>System Size: {ordersDetails?.system_Size}</p>
                </div>

            </div>
        </div>
        {
            ordersDetails && ordersDetails?.assign_to?.map((ele, idx) => {
                return (
                    <div className="completejobs__box" key={idx}>
                        <div className="header">
                            <p>Assign To {ele?.department.charAt(0).toUpperCase()+ele?.department?.substring(1, ele?.department.length)}</p>
                        </div>
                        <div className='content'>
                            <div>
                                <p>Username: {ele?.username}</p>
                                <p>Name: {ele?.first_name} {ele?.last_name}</p>
                            </div>
                            <div>
                                <p>Phone: {ele?.phone}</p>
                                <p>Email: {ele?.email}</p>
                            </div>

                        </div>
                    </div>
                )
            })
        }

        <div className="completejobs__box">
            <div className="header">
                <p>Inverter</p>
            </div>
            <div className='content'>
                <div>
                    <p>Title: {ordersDetails?.inverter?.title}</p>
                    <p>Code: {ordersDetails?.inverter?.code}</p>
                </div>
                <div>
                    <p>Price: {ordersDetails?.inverter?.inverter_price}</p>
                    <p>Type: {ordersDetails?.inverter?.inverter_type}</p>
                </div>
                <div>
                    <p>Manufacturer: {ordersDetails?.inverter?.manufacturer}</p>
                    <p>Rated Output Power: {ordersDetails?.inverter?.rated_output_power}</p>
                </div>
                <div>
                    <p>Product Warranty: {ordersDetails?.inverter?.product_warranty}</p>
                </div>

            </div>
        </div>
        <div className="completejobs__box">
            <div className="header">
                <p>Panels</p>
            </div>
            <div className='content'>
                <div>
                    <p>Title: {ordersDetails?.panels?.title}</p>
                    <p>Code: {ordersDetails?.panels?.code}</p>
                </div>
                <div>
                    <p>Price: {ordersDetails?.panels?.panel_price}</p>
                    <p>Manufacturer: {ordersDetails?.panels?.manufacturer}</p>
                </div>
                <div>
                    <p>Product Warranty: {ordersDetails?.panels?.product_warranty}</p>
                    <p>Performance Warranty: {ordersDetails?.panels?.performance_warranty}</p>
                </div>
                <div>
                    <p>Technology: {ordersDetails?.panels?.technology}</p>
                </div>

            </div>
        </div>
        <div className="completejobs__box">
            <div className="header">
                <p>Battery</p>
            </div>
            <div className='content'>
                <div>
                    <p>Title: {ordersDetails?.batteries?.title}</p>
                    <p>Code: {ordersDetails?.batteries?.code}</p>
                </div>
                <div>
                    <p>Price: {ordersDetails?.batteries?.battery_price}</p>
                    <p>Manufacturer: {ordersDetails?.batteries?.manufacturer}</p>
                </div>
                <div>
                    <p>Product Warranty: {ordersDetails?.batteries?.product_warranty}</p>
                    <p>Quantity: {ordersDetails?.batteries?.total_quantity}</p>
                </div>
                <div>
                    <p>Previous Qty: {ordersDetails?.batteries?.previous_quantity}</p>
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
    </div>
  )
}

export default AdminOrders