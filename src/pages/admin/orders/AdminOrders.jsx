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

  const [orderDetails, setOrderDetails] = useState([])

  console.log('check ',orderDetails)

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

      fetch(`http://65.0.45.255:8000/order/${data.state.ele.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setTimeout(() => {
            setLoading(false)
            console.log(result)
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
      // setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`http://65.0.45.255:8000/order/${data.state.ele.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // setLoading(false)
          // console.log('order detials',result)
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
                <Line title="Project" value={orderDetails?.order_details?.project} />
                <Line title="Customer Email" value={orderDetails?.order_details?.customer_name} />
                <Line title="Installation Type" value={orderDetails?.order_details?.installation_type} />
                <Line title="Building Type" value={orderDetails?.order_details?.building_Type} />
                <Line title="Quotation" value={orderDetails?.order_details?.quotation} />
                <Line title="Nmi Number" value={orderDetails?.order_details?.nmi_no} />
                <Line title="Meter Phase" value={orderDetails?.order_details?.meter_Phase} />
                <Line title="Status" value={orderDetails?.order_details?.order_status} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Kilowatt" value={data.state.ele.system_Size} />
            <Line title="Building Type" value={data.state.ele.building_Type} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Quotation" value={data.state.ele.quotation} />
            <Line title="Nmi Number" value={data.state.ele.nmi_no} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Meter Phase" value={data.state.ele.meter_Phase} />
            <Line title="Status" value={data.state.ele.order_status} />
          </div> */}
          {/* Panels Details */}
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState1(!showState1)}>Panels Details
                {
                  !showState1 ? <AiOutlinePlus size={40} onClick={() => setShowState1(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState1(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState1 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Title" value={orderDetails?.order_details?.panels?.title} />
                <Line title="Code" value={orderDetails?.order_details?.panels?.code} />
                <Line title="Manufacturer" value={orderDetails?.order_details?.panels?.manufacturer} />
                <Line title="Performance Warranty" value={orderDetails?.order_details?.panels?.performance_warranty} />
                <Line title="Product Warranty" value={orderDetails?.order_details?.panels?.product_warranty} />
                <Line title="Technology" value={orderDetails?.order_details?.panels?.technology} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Panel Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Panels" value={data.state.ele.panels.title} />
            <Line title="Code" value={data.state.ele.panels.code} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Technology" value={data.state.ele.panels.technology} />
            <Line title="Performance Warranty" value={data.state.ele.panels.performance_warranty} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Product Warranty" value={data.state.ele.panels.product_warranty} />
            <Line title="Manufacturer" value={data.state.ele.panels.manufacturer} />
          </div> */}
          {/* Panels Details */}
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState2(!showState2)}>Inverter Details
                {
                  !showState2 ? <AiOutlinePlus size={40} onClick={() => setShowState2(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState2(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState2 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                <Line title="Title" value={orderDetails?.order_details?.inverter?.title} />
                <Line title="Code" value={orderDetails?.order_details?.inverter?.code} />
                <Line title="Manufacturer" value={orderDetails?.order_details?.inverter?.manufacturer} />
                <Line title="Inverter Type" value={orderDetails?.order_details?.inverter?.inverter_type} />
                <Line title="Product Warranty" value={orderDetails?.order_details?.inverter?.product_warranty} />
                <Line title="Rated Output Power" value={orderDetails?.order_details?.inverter?.rated_ouptut_power} />
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
          </div>
          <hr></hr>

          {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Inverter Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Inverter" value={data.state.ele.inverter.title} />
            <Line title="Code" value={data.state.ele.inverter.code} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Product Warranty" value={data.state.ele.inverter.product_warranty} />
            <Line title="Inverter Type" value={data.state.ele.inverter.inverter_type} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Rated Output Power" value={data.state.ele.inverter.rated_output_power} />
            <Line title="Manufacturer" value={data.state.ele.inverter.manufacturer} />
          </div> */}
          {/* Other Component */}
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
            <div className='accordian__box'>
              <div className='accordian__question' onClick={() => setShowState3(!showState3)}>Other Component Details
                {
                  !showState3 ? <AiOutlinePlus size={40} onClick={() => setShowState3(true)} style={{ transition: '0.3s' }} /> : <AiOutlineMinus size={40} onClick={() => setShowState3(false)} style={{ transition: '0.3s' }} />
                }

              </div>
              <div style={{ height: showState3 ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                {
                  orderDetails?.order_details?.other_component?.map((ele, idx) => {
                    return (
                      <div key={idx} style={{borderRight: '1px solid black'}}>
                        <Line title="Title" value={ele.title} />
                        <Line title="Code" value={ele.code} />
                        <Line title="Manufacturer" value={ele.manufacturer} />
                        <Line title="Optimisor" value={ele.optimisor} />
                        <Line title="Optimisor Heading" value={ele.optimisor_heading} />
                        <Line title="Product Warranty" value={ele.product_warranty} />
                        <Line title="Smart Meter" value={ele.smart_meter} />
                        <Line title="Smart Meter Heading" value={ele.smart_meter_heading} />
                      </div>
                    ) 
                  })
                }
                {/* <Line title="Title" value={orderDetails?.inverter?.title} />
                <Line title="Code" value={orderDetails?.inverter?.code} />
                <Line title="Manufacturer" value={orderDetails?.inverter?.manufacturer} />
                <Line title="Inverter Type" value={orderDetails?.inverter?.inverter_type} />
                <Line title="Product Warranty" value={orderDetails?.inverter?.product_warranty} />
                <Line title="Rated Output Power" value={orderDetails?.inverter?.rated_ouptut_power} /> */}
              </div>
            </div>
            {/* <Line title="Project" value={data.state.ele.project} />
            <Line title="Customer Email" value={data.state.ele.customer_name} /> */}
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