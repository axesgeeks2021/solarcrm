import React, { useState, useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import FormsContainer from '../Forms/FormsContainer'
import Loading from '../../../components/loading/Loading'
import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from "react-icons/ai"
import { toast } from 'react-toastify'
import Multiselect from 'multiselect-react-dropdown'


function AdminOrders() {

  const [cookies] = useCookies();
  const data = useLocation()
  const navigate = useNavigate()

  const [showState, setShowState] = useState(false)
  const [showState1, setShowState1] = useState(false)
  const [showState2, setShowState2] = useState(false)
  const [showState3, setShowState3] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSlotModal, setShowSlotModal] = useState(false)
  const [ordersDetails, setOrderDetails] = useState([])
  const [installerList, setInstallerList] = useState({})
  const [file, setFile] = useState(null)
  const [listOfSlots, setListOfSlots] = useState({})
  const [bookingStatus, setBookingStatus] = useState({})
  const [installerId, setInstallerId] = useState([])
  const [electricianId, setElecticianId] = useState([])
  const [bookModal, setBookModal] = useState({
    status: false,
    date: null
  })

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

      fetch(`https://solar365.co.in/order/${data?.state?.ele?.id}/`, requestOptions)
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

      fetch(`https://solar365.co.in/order/${data?.state?.ele?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // setLoading(false)
          console.log('order detials', result)
          setOrderDetails(result)
          return fetchBookingSlotsDetails(data?.state?.ele?.id)
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
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
      formdata.append("project", data?.ele?.project);
      console.log("appointment_date", bookModal.date);
      console.log("project", data?.state?.ele?.project);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/take-appointment/", requestOptions)
        .then(response => response.json())
        .then(result => {

          console.log('booking', result)
          if (result.message === 'success') {
            toast.update(loadingId, { render: 'Your appointment has been booked', isLoading: false, autoClose: true, type: 'success' })
            setBookModal({
              status: false,
              date: null
            })
            setShowSlotModal(false)
            return fetchSlots()
          }
        }
        )
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBookingSlotsDetails = (id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3KEGrC3nJhaRe1T3aORf4oEo3QoN0bvu; sessionid=a3z1zr9yzah6nzespvylq9f2wfyhjjji");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/take-appointment/${id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('booking', result)
          return setBookingStatus(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const fetchInstallerList = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/assign_get_profile/?date=${orderDetails?.appointment?.appointment_date}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('list', result)

          setInstallerList(result)
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  const fetchUpdateAssignOrder = () => {
    try {

      if(electricianId.length < 1){
        return toast.warn('Please select 1 electician!')
      }

      if(installerId.length < 2){
        return toast.warn('Please select atleaset 2 installer!')
      }
      const loadingId = toast.loading('Please wait....')
      const assignValue = installerId.concat(electricianId).toString().split(',').join(', ')
      console.log('assign', assignValue)
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const formdata = new FormData();
      formdata.append("assign_to", assignValue);
      formdata.append("order_status", "");

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      fetch(`https://solar365.co.in/order/${location?.state?.data?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.message === "success") {
            toast.update(loadingId, { render: 'Assigned successfully...', isLoading: false, autoClose: true, type: 'success' })
            setShowForm(false)
            return navigate(-1)
          }

          if (result?.status === false) {
            toast.update(loadingId, { render: result?.errors, isLoading: false, autoClose: true, type: 'warning' })
            return
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowAssignPopup = (title) => {
    if(typeof title === 'string'){
      return toast.warn(title)
    }
    return setShowForm(true)
  }

  useEffect(() => {
    const subscribe = fetchOrderDetails()
    const subscribe2 = fetchSlots()
    const subscribe3 = fetchInstallerList()

    return () => [subscribe, subscribe2,subscribe3]
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div style={{ zIndex: 110, width: '40%', background: '#fff', position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', height: '30%', display: bookModal.status ? 'flex' : 'none', justifyContent: 'space-between', boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3), -2px -2px 20px 2px rgba(0,0,0,0.3)', borderRadius: '5px', backfaceVisibility: 'hidden', alignItems: 'center', flexDirection: 'column' }}>
        <p style={{ fontSize: '1.1rem', margin: '5% 2%', alignSelf: 'flex-start' }}>Please press confirm to book your slot</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button style={{ background: 'green', color: 'white', fontWeight: '600', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px' }} onClick={updateSlots}>Confirm</button>
          <button onClick={() => setBookModal({
            status: false,
            date: null
          })} style={{ background: '', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px', fontWeight: '600' }}>Cancel</button>
        </div>
      </div>
      <div style={{ height: '80vh', overflowY: 'scroll', position: 'fixed', zIndex: 100, background: '#fff', backdropFilter: 'blur(10px)', padding: '20px 20px', width: "70%", display: showSlotModal ? 'flex' : 'none', justifyContent: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.4), -2px -2px 10px 2px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
        <AiOutlineClose style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} size={25} onClick={() => setShowSlotModal(false)} />
        <table style={{ background: '#34a446', color: '#fff', border: '2px solid #000', margin: '20px 10px', }}>
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
              listOfSlots?.data?.map((ele, idx) => {
                return (
                  <tr key={idx} style={{ background: "#fff", border: '2px solid black' }}>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>{idx + 1}</td>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>{ele?.date}</td>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>{ele?.remaininig_slots}</td>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>
                      <button onClick={() => setBookModal({
                        status: true,
                        date: ele?.date
                      })} disabled={ele?.remaininig_slots === 0 ? true : false} style={{ background: ele?.remaininig_slots === 0 ? "#ccc" : "#34a446", color: 'white', padding: '4px 15px', borderRadius: '3px' }}>Book</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <div className='admin__order__container'>
        <div className="w-full bg-yellow-400 flex justify-between items-center" style={{ background: "#0C70D4" }}>
          <p className="text-white pl-10">{bookingStatus?.reason}</p>
        </div>
        <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
          <div style={{ width: '50%' }}>
            <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
            <Button title="Book Slot" color="white" background={bookingStatus?.update_appointment_appove ? "green" : "#eee"} onclick={() => setShowSlotModal(true)} disabled={!bookingStatus?.update_appointment_appove}/>
            <Button title="Assign Order" background="green" color="#fff" onclick={() => handleShowAssignPopup(ordersDetails?.appointment)} />
            <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
            <Button title="Delete" color="white" background="red" />
          </div>
        </div>
        <div className='admin__card'>
        {
          showForm &&
          <div className='popup__form'>
            <p style={{ fontSize: '1.2rem' }}>Please assign one Electrician and 2 Installer</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <Multiselect
                hidePlaceholder={true} options={installerList?.Electrician} displayValue='full_name' onSelect={e => setElecticianId(e.map(item => item?.id))} />
              <Multiselect
                hidePlaceholder={true} options={installerList?.Installer} displayValue='full_name' onSelect={e => setInstallerId(e.map(item => item?.id))} />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'flex-end', width: '100%' }}>
              <Button title="Confirm" background="green" color="#fff" onclick={fetchUpdateAssignOrder} />
              <Button title="Cancel" background="gray" color="#fff" onclick={() => setShowForm(false)} />
            </div>
          </div>
        }
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
                      <p>Assign To {ele?.department.charAt(0).toUpperCase() + ele?.department?.substring(1, ele?.department.length)}</p>
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
    </>
  )
}

export default AdminOrders