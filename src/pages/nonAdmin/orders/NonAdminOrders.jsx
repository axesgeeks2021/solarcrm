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
  const [orderDetails, setOrderDetails] = useState({})
  const [listOfSlots, setListOfSlots] = useState({})
  const [bookingStatus, setBookingStatus] = useState({})
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
      const loadingId = toast.loading('Please wait....')
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

          console.log('slotsssss', result)
          if (result?.message === 'success') {
            toast.update(loadingId, { render: 'Appointment booked! Please wait for confirmation', isLoading: false, autoClose: true, type: 'success' })
            setBookModal({
              status: false,
              date: null
            })
            setListOfSlotsModal(false)
            fetchSlots(),
            fetchBookingSlotsDetails()
            return navigate(-1)
          }
          toast.update(loadingId, { render: result?.errors?.customer[0], isLoading: false, autoClose: true, type: 'error' })
          return
        }
        )
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
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

  const fetchBookingSlotsDetails = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3KEGrC3nJhaRe1T3aORf4oEo3QoN0bvu; sessionid=a3z1zr9yzah6nzespvylq9f2wfyhjjji");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/take-appointment/${data?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('result status', result)
          return setBookingStatus(result)
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
        .then(result => {
          setLoading(false)
          console.log('orders;,', result)
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
    const subscribe3 = fetchBookingSlotsDetails()

    return () => [subscribe, subscribe2, subscribe3]

  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div style={{ width: '100%', background: 'yellow', padding: '5px 20px', display: 'flex', justifyContent: 'flex-start', }}>
        <p>{bookingStatus?.message}</p>
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
            <Button title="Book Your Slot" color="#fff" background={bookingStatus?.update_appointment_appove ? "green" : "#eee"} onclick={() => setListOfSlotsModal(!listofSlotsModal)} disabled={!bookingStatus?.update_appointment_appove} />
            {/*<Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />*/}
          </div>
        </div>
        <div className='admin__card'>
          <div className='admin__order__details'>
            <div className="completejobs__box">
              <div className="header">
                <p>Personal Details</p>
              </div>
              <div className='content'>
                <div>
                  <p>Project Id: {orderDetails?.order?.project}</p>
                  <p>Name: {orderDetails?.order?.to_address?.user?.first_name} {orderDetails?.order?.to_address?.user?.last_name}</p>
                </div>
                <div>
                  <p>Email: {orderDetails?.order?.to_address?.user?.email}</p>
                  <p>Phone: {orderDetails?.order?.to_address?.user?.phone}</p>
                </div>
                <div>
                  <p>Address: {orderDetails?.order?.to_address?.address_line}</p>
                  <p>City: {orderDetails?.order?.to_address?.city}</p>
                </div>
                <div>
                  <p>State: {orderDetails?.order?.to_address?.state}</p>
                  <p>Country: {orderDetails?.order?.to_address?.country}</p>
                </div>
                <div>
                  <p>Latitude: {orderDetails?.order?.to_address?.latitude}</p>
                  <p>Longitude: {orderDetails?.order?.to_address?.longitude}</p>
                </div>
              </div>
            </div>
            <div className="completejobs__box">
              <div className="header">
                <p>Project Details</p>
              </div>
              <div className='content'>
                <div>
                  <p>Building Type: {orderDetails?.order?.building_Type}</p>
                  <p>Meter Phase: {orderDetails?.order?.meter_Phase}</p>
                </div>
                <div>
                  <p>Monitoring: {orderDetails?.order?.monitoring}</p>
                  <p>Monitoring Qty: {orderDetails?.order?.monitoring_quantity}</p>
                </div>
                <div>
                  <p>NMI No: {orderDetails?.order?.nmi_no}</p>
                  <p>Number of Roof: {orderDetails?.order?.no_of_Roofs}</p>
                </div>
                <div>
                  <p>System Size: {orderDetails?.order?.system_Size}</p>
                </div>

              </div>
            </div>

            <div className="completejobs__box">
              <div className="header">
                <p>Inverter</p>
              </div>
              <div className='content'>
                <div>
                  <p>Title: {orderDetails?.order?.inverter?.title}</p>
                  <p>Code: {orderDetails?.order?.inverter?.code}</p>
                </div>
                <div>
                  <p>Price: {orderDetails?.order?.inverter?.inverter_price}</p>
                  <p>Type: {orderDetails?.order?.inverter?.inverter_type}</p>
                </div>
                <div>
                  <p>Manufacturer: {orderDetails?.order?.inverter?.manufacturer}</p>
                  <p>Rated Output Power: {orderDetails?.order?.inverter?.rated_output_power}</p>
                </div>
                <div>
                  <p>Product Warranty: {orderDetails?.order?.inverter?.product_warranty}</p>
                  <p>Quantity: {orderDetails?.order?.inverter_quantity}</p>
                </div>

              </div>
            </div>
            <div className="completejobs__box">
              <div className="header">
                <p>Panels</p>
              </div>
              <div className='content'>
                <div>
                  <p>Title: {orderDetails?.order?.panels?.title}</p>
                  <p>Code: {orderDetails?.order?.panels?.code}</p>
                </div>
                <div>
                  <p>Price: {orderDetails?.order?.panels?.panel_price}</p>
                  <p>Manufacturer: {orderDetails?.order?.panels?.manufacturer}</p>
                </div>
                <div>
                  <p>Product Warranty: {orderDetails?.order?.panels?.product_warranty}</p>
                  <p>Performance Warranty: {orderDetails?.order?.panels?.performance_warranty}</p>
                </div>
                <div>
                  <p>Technology: {orderDetails?.order?.panels?.technology}</p>
                  <p>Quantity: {orderDetails?.order?.panels_quantity}</p>
                </div>

              </div>
            </div>
            <div className="completejobs__box">
              <div className="header">
                <p>Battery</p>
              </div>
              <div className='content'>
                <div>
                  <p>Title: {orderDetails?.order?.batteries?.title}</p>
                  <p>Code: {orderDetails?.order?.batteries?.code}</p>
                </div>
                <div>
                  <p>Price: {orderDetails?.order?.batteries?.battery_price}</p>
                  <p>Manufacturer: {orderDetails?.order?.batteries?.manufacturer}</p>
                </div>
                <div>
                  <p>Product Warranty: {orderDetails?.order?.batteries?.product_warranty}</p>
                  <p>Quantity: {orderDetails?.order?.battery_quantity}</p>
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
        {
          <div style={{
            transform: listofSlotsModal ? 'translateY(100px)' : 'translateY(-500px)', background: 'white',
            transition: '0.3s', width: "90%", border: '1px solid black', display: 'flex', justifyContent: 'flex-start', padding: '10px 10px',
            alignItems: 'center', flexDirection: 'column', height: 'auto', overflow: 'hidden',
            position: 'absolute', top: '0', zIndex: 100, boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.3), -2px -2px 10px 2px rgba(0,0,0,0.3)', borderRadius: '4px',
            backdropFilter: 'blur(10px)'
          }}>
            <AiOutlineClose onClick={() => setListOfSlotsModal(false)} size={25} style={{ alignSelf: 'flex-end', cursor: 'pointer', background: 'gray', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.2), -2px -2px 10px 2px rgba(0,0,0,0.2)', borderRadius: '2px' }} />
            <table style={{ background: '#ccc', margin: '20px 10px', border: '1px solid #000' }}>
              <thead>
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
                      <tr key={idx} style={{ border: '1px solid #000' }}>
                        <td style={{ padding: '5px 0', color: '#000', fontWeight: '600' }}>{idx + 1}</td>
                        <td style={{ padding: '5px 0', color: '#000', fontWeight: '600' }}>{ele?.date}</td>
                        <td style={{ padding: '5px 0', color: '#000', fontWeight: '600' }}>{ele?.remaininig_slots}</td>
                        <td style={{ padding: '5px 0', color: '#000', fontWeight: '600' }}>
                          <button onClick={() => setBookModal({
                            status: true,
                            date: ele?.date
                          })} style={{ background: 'black', color: 'white', padding: '4px 15px', borderRadius: '3px' }} disabled={ele?.remaininig_slots < 1 ? true : false}>Book</button>
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