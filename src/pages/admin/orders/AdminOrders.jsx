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
  const [inverterList, setInverterList] = useState([])
  const [batteryList, setBatteryList] = useState([])
  const [panelList, setPanelList] = useState([])
  const [deletePopup, setDeletePopup] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [displayForm, setDisplayForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSlotModal, setShowSlotModal] = useState(false)
  const [ordersDetails, setOrderDetails] = useState({})
  const [companyList, setCompanyList] = useState([])

  console.log('order details', ordersDetails)
  const [installerList, setInstallerList] = useState({})
  const [listOfSlots, setListOfSlots] = useState({})
  const [bookingStatus, setBookingStatus] = useState({})
  const [installerId, setInstallerId] = useState([])
  const [electricianId, setElecticianId] = useState([])
  const [packingSlipFile, setPackingSlipFile] = useState(null)
  const [westernPowerFile, setwesternPowerFile] = useState(null)
  const [switchBoardFile, setswitchBoardFile] = useState(null)
  const [panelLayoutFile, setpanelLayoutFile] = useState(null)
  const [extrasFile, setextrasFile] = useState(null)
  const [bookModal, setBookModal] = useState({
    status: false,
    date: null
  })


  const [text, setText] = useState({
    firstname: '',
    lastname: "",
    phone: "",
    email: '',
    username: "",
    systemSize: "",
    buildingType: "",
    nmiNo: "",
    panels: "",
    inverter: "",
    roofType: "",
    roofAngle: "",
    meterPhase: "",
    installationType: "",
    panelsQuantity: "",
    inverterQuantity: "",
    otherComponent: "",
    batteries: "",
    batteriesQuantity: "",
    otherComponentQuantities: "",
    companyName: null,
    meterNumber: "",
    packingSlipReason: '',
    westernPowerReason: "",
    switchBoardReason: "",
    panelLayoutReason: "",
    street: "",
    state: "",
    addressline: "",
    city: "",
    postcode: "",
    country: "Australia",
    descritpion: '',
    batteryPurchase: "",
    inverterPurchase: "",
    panelPurchase: ""
  })

  const { batteries, buildingType, otherComponentQuantities, batteriesQuantity, installationType, inverterQuantity, meterPhase, nmiNo, otherComponent, panels, panelsQuantity, roofAngle, roofType, systemSize, username, companyName, addressline, batteryPurchase, street, inverterPurchase, panelPurchase, city, country, descritpion, email, firstname, inverter, lastname, meterNumber, packingSlipReason,
    panelLayoutReason, phone, postcode, state, switchBoardReason, westernPowerReason } = text

  const handleChange = e => {
    setText({ ...text, [e.target.name]: e.target.value })
  }

  const updateOrder = async (e) => {
    e.preventDefault()
    try {
      const loadingId = toast.loading('Please wait...')
      let myHeaders = new Headers();
      myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

      const formdata = new FormData();
      formdata.append("first_name", firstname !== "" ? firstname : ordersDetails?.to_address?.user?.first_name);
      formdata.append("system_Size", systemSize !== "" ? systemSize : ordersDetails?.system_Size);
      formdata.append("building_Type", buildingType !== "" ? buildingType : ordersDetails?.building_Type);
      formdata.append("nmi_no", nmiNo !== "" ? nmiNo : ordersDetails?.nmi_no);
      formdata.append("roof_Type", roofType !== "" ? roofType : ordersDetails?.roof_type);
      formdata.append("roof_Angle", roofAngle !== "" ? roofAngle : ordersDetails?.roof_Angle);
      formdata.append("meter_Phase", meterPhase !== "" ? meterPhase : ordersDetails?.meter_Phase);
      formdata.append("installation_Type", installationType !== "" ? installationType : ordersDetails?.installation_Type);
      formdata.append("panels", panels !== "" ? panels : ordersDetails?.panels?.id);
      formdata.append("panels_quantity", panelsQuantity !== "" ? panelsQuantity : ordersDetails?.panels_quantity);
      formdata.append("inverter", inverter !== "" ? inverter : ordersDetails?.inverter?.id);
      formdata.append("inverter_quantity", inverterQuantity !== "" ? inverterQuantity : ordersDetails?.inverter_quantity);
      formdata.append("batteries", batteries !== "" ? batteries : ordersDetails?.batteries?.id);
      formdata.append("battery_quantity", batteriesQuantity !== "" ? batteriesQuantity : ordersDetails?.battery_quantity);


      formdata.append("company_Name", companyName !== "" ? companyName : ordersDetails?.company_Name);
      formdata.append("meter_Number", meterNumber !== "" ? meterNumber : ordersDetails?.meter_Number);
      packingSlipFile !== null ? formdata.append("packing_slip", packingSlipFile !== null ? packingSlipFile : ordersDetails?.packing_slip.map(ele => ele?.file)) : null;
      westernPowerFile !== null ? formdata.append("western_power", westernPowerFile !== null ? westernPowerFile : ordersDetails?.western_power.map(ele => ele?.file)) : null;
      switchBoardFile !== null ? formdata.append("switch_board", switchBoardFile !== null ? switchBoardFile : ordersDetails?.switch_board.map(ele => ele?.file)) : null;
      panelLayoutFile !== null ? formdata.append("panel_layout", panelLayoutFile !== null ? panelLayoutFile : ordersDetails?.panel_layout.map(ele => ele?.file)) : null;
      extrasFile !== null ? formdata.append("extras", extrasFile) : null;
      formdata.append("packing_slip_reason", packingSlipReason !== "" ? packingSlipReason : ordersDetails?.packing_slip_reason);
      formdata.append("western_power_reason", westernPowerReason !== "" ? westernPowerReason : ordersDetails?.western_power_reason);
      formdata.append("switch_board_reason", switchBoardReason !== "" ? switchBoardReason : ordersDetails?.switch_board_reason);
      formdata.append("panel_layout_reason", panelLayoutReason !== "" ? panelLayoutReason : ordersDetails?.panel_layout_reason);
      formdata.append("street", street !== "" ? street : ordersDetails?.to_address?.street);
      formdata.append("state", state !== "" ? state : ordersDetails?.to_address?.state);
      formdata.append("address_line", addressline !== "" ? addressline : ordersDetails?.to_address?.address_line);
      formdata.append("city", city !== "" ? city : ordersDetails?.to_address?.city);
      formdata.append("postcode", postcode !== "" ? postcode : ordersDetails?.to_address?.postcode);
      formdata.append("country", country !== "" ? country : ordersDetails?.to_address?.country);
      formdata.append("is_inverter_buy", inverterPurchase !== "" ? inverterPurchase : ordersDetails?.is_inverter_buy);
      formdata.append("is_battery_buy", batteryPurchase !== "" ? batteryPurchase : ordersDetails?.is_battery_buy);
      formdata.append("is_panel_buy", panelPurchase !== "" ? panelPurchase : ordersDetails?.is_panel_buy);

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/order/${data?.state?.ele?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('update ', result)
          if (result?.message === 'success') {
            toast.update(loadingId, { render: "Updated successfully", isLoading: false, type: 'success', autoClose: true })
            setText(prev => prev !== "" ? "" : "")
            setDisplayForm(false)
            return fetchOrderDetails()
          }
          return toast.update(loadingId, { render: "Please Try again!", isLoading: false, type: 'warning', autoClose: true })
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  const fetchOrderDetails = () => {
    try {
      setLoading(true)
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
          setLoading(false)
          console.log('order detials', result)
          if (result?.message === 'success') {
            setOrderDetails(result)
            fetchBookingSlotsDetails(data?.state?.ele?.id)
            if (typeof result?.appointment !== 'string') {
              return fetchInstallerList(result?.appointment?.appointment_date)
            }
          }
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
      formdata.append("project", data?.state?.ele?.project);

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
            fetchSlots()
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

  const fetchInstallerList = (date) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/assign_get_profile/?date=${date}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('list', result)
          setInstallerList(result)
          return
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  const fetchUpdateAssignOrder = () => {
    try {

      if (electricianId.length < 1) {
        return toast.warn('Please select 1 electician!')
      }

      if (installerId.length < 2) {
        return toast.warn('Please select atleaset 2 installer!')
      }
      const loadingId = toast.loading('Please wait....')
      const assignValue = installerId.concat(electricianId).toString().split(',').join(', ')

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
      fetch(`https://solar365.co.in/order/${data?.state?.ele?.id}/`, requestOptions)
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

  const getBatteryDetails = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=ceOYmNljg42J2Qs4nM3VcfaOK0kx6OSo; sessionid=rdm7ivcxs95syinfglztgj87716n0u05");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/battery_module/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setBatteryList(result)
          return
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const getPanelDetails = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=ceOYmNljg42J2Qs4nM3VcfaOK0kx6OSo; sessionid=rdm7ivcxs95syinfglztgj87716n0u05");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/module/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setPanelList(result)
          return
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const getInverterDetails = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=ceOYmNljg42J2Qs4nM3VcfaOK0kx6OSo; sessionid=rdm7ivcxs95syinfglztgj87716n0u05");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/inverter_module/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setInverterList(result)
          return
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const getCompanyList = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");
      myHeaders.append('Content-Type', 'application/json')

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/company_name_list/", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('compnay,', result)
          return setCompanyList(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }


  const deleteOrder = () => {
    try {
      const loadingId = toast.loading("Please wait...")
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/order/${data?.state?.ele?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          toast.update(loadingId, { render: 'Deleted Successfully...', autoClose: true, isLoading: false, type: 'success' })
          return navigate(-1)
        })
        .catch(error => console.log('error', error));

    } catch (error) {
      console.log(error)
    }
  }

  const handleShowAssignPopup = (title) => {
    if (typeof title === 'string') {
      return toast.warn(title)
    }
    return setShowForm(true)
  }

  const handleCloseAdminForm = () => {
    setDisplayForm(false)
    return setText(prev => prev !== "" ? "" : "")
  }


  useEffect(() => {
    const subscribe = fetchOrderDetails()
    const subscribe2 = fetchSlots()
    const subscribe3 = getBatteryDetails()
    const subscribe4 = getPanelDetails()
    const subscribe5 = getInverterDetails()
    const subscribe6 = getCompanyList()

    return () => [subscribe, subscribe2, subscribe3, subscribe4, subscribe5, subscribe6]
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
      {
        deletePopup &&
        <div className='popup__form'>
          <p style={{ fontSize: '1.2rem' }}>Are you sure want to delete ?</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <Button title="Confirm" background="green" color="#fff" onclick={deleteOrder} />
            <Button title="Cancel" background="gray" color="#fff" onclick={() => setDeletePopup(false)} />
          </div>
        </div>
      }

      <div className='admin__order__container'>
        <div className="w-full bg-yellow-400 flex justify-between items-center" style={{ background: "#0C70D4" }}>
          <p className="text-white pl-10">{bookingStatus?.reason}</p>
        </div>
        <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
          <div style={{ width: '50%' }}>
            <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
            <Button title="Book Slot" color="white" background={bookingStatus?.update_appointment_appove ? "green" : "#eee"} onclick={() => setShowSlotModal(true)} disabled={!bookingStatus?.update_appointment_appove} />
            <Button title="Assign Order" background="green" color="#fff" onclick={() => handleShowAssignPopup(ordersDetails?.appointment)} />
            <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
            <Button title="Delete" color="white" background="red" onclick={() => setDeletePopup(true)} />
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
                  <p>Quantity: {ordersDetails?.panels_quantity}</p>
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
                  <p>Quantity: {ordersDetails?.battery_quantity}</p>
                </div>
                <div>
                  <p>Total Energy: {ordersDetails?.batteries?.total_energy}</p>
                </div>
              </div>
            </div>
              {
                (ordersDetails?.packing_slip?.length < 1 && ordersDetails?.switch_board?.length < 1 && ordersDetails?.western_power?.length < 1 && ordersDetails?.panel_layout?.length < 1) ? null :
                <div className="completejobs__box">
                  <div className="header">
                    <p>Photos - View & Download</p>
                  </div>
                  <div className='content pb-2' style={{ flexDirection: 'row' }}>
                    <div style={{ width: '50%', height: '300px', overflow: 'hidden', flexDirection: 'column' }}>
                      <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <p style={{ background: "#003f91", width: "100%", padding: '4px 0', color: '#fff' }}>Packing Slip Photo</p>
                      </div>
                      <div style={{ height: '75%', width: '100%' }}>
                        {
                          ordersDetails?.packing_slip?.map(ele => {
                            return (
                              <img src={ele?.file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )
                          })
                        }
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '10px' }}>
                        {
                          ordersDetails?.packing_slip?.map(ele => {
                            return (
                              <a href={ele?.file} style={{ width: '100%', padding: '4px 0', color: "#fff", textAlign: 'center', background: '#003f91' }} download target='_blank'>View & Download</a>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div style={{ width: '50%', height: '300px', overflow: 'hidden', flexDirection: 'column' }}>
                      <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <p style={{ background: "#003f91", width: "100%", padding: '4px 0', color: '#fff' }}>Western Power Photo</p>
                      </div>
                      <div style={{ height: '75%', width: '100%' }}>
                        {
                          ordersDetails?.western_power?.map(ele => {
                            return (
                              <img src={ele?.file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )
                          })
                        }
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '10px' }}>
                        {
                          ordersDetails?.western_power?.map(ele => {
                            return (
                              <a href={ele?.file} style={{ width: '100%', padding: '4px 0', color: "#fff", textAlign: 'center', background: '#003f91' }} download target='_blank'>View & Download</a>
                            )
                          })
                        }
                      </div>
                    </div>
    
    
                  </div>
                  <div className='content pb-2' style={{ flexDirection: 'row' }}>
                    <div style={{ width: '50%', height: '300px', overflow: 'hidden', flexDirection: 'column' }}>
                      <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <p style={{ background: "#003f91", width: "100%", padding: '4px 0', color: '#fff' }}>Panel Layout Photo</p>
                      </div>
                      <div style={{ height: '75%', width: '100%' }}>
                        {
                          ordersDetails?.panel_layout?.map(ele => {
                            return (
                              <img src={ele?.file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )
                          })
                        }
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '10px' }}>
                        {
                          ordersDetails?.panel_layout?.map(ele => {
                            return (
                              <a href={ele?.file} style={{ width: '100%', padding: '4px 0', color: "#fff", textAlign: 'center', background: '#003f91' }} download target='_blank'>View & Download</a>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div style={{ width: '50%', height: '300px', overflow: 'hidden', flexDirection: 'column' }}>
                      <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <p style={{ background: "#003f91", width: "100%", padding: '4px 0', color: '#fff' }}>Switch Board Photo</p>
                      </div>
                      <div style={{ height: '75%', width: '100%' }}>
                        {
                          ordersDetails?.switch_board?.map(ele => {
                            return (
                              <img src={ele?.file} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            )
                          })
                        }
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '10px' }}>
                        {
                          ordersDetails?.switch_board?.map(ele => {
                            return (
                              <a href={ele?.file} style={{ width: '100%', padding: '4px 0', color: "#fff", textAlign: 'center', background: '#003f91' }} download target='_blank'>View & Download</a>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
          </div>
        </div>
        {
          displayForm &&
          <FormsContainer flexDirection="column">
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <Heading heading="Order" size="200%" />
            </div>
            <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={updateOrder}>

              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0', overflow: 'hidden' }}>
                <select name='companyName' value={companyName} onChange={handleChange} style={{ border: '2px solid gray', width: '100%', padding: '5px 0', margin: '0 4px' }}>
                  <option style={{ textAlign: 'center' }} >Select Company</option>
                  {
                    companyList?.data?.map((ele, idx) => {
                      return (
                        <option value={ele?.company_name} key={idx}>{ele?.company_name}</option>
                      )
                    })
                  }
                </select>
                <Input placeholder="Meter Number" value={meterNumber} name="meterNumber" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                <Input placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Nmi Number" value={nmiNo} name="nmiNo" onChange={handleChange} />
                <Input placeholder="Roof Angle" value={roofAngle} name="roofAngle" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <select value={buildingType} name="buildingType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} >
                  <option value="">Select Floor Type</option>
                  <option value="Single Storey">Single Storey</option>
                  <option value="Double Storey">Double Storey</option>
                  <option value="Multi Storey">Multi Storey</option>
                </select>
                <select value={roofType} name="roofType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }}  >
                  <option>Select Roof Type</option>
                  <option value="Tin">Tin</option>
                  <option value="Tilt">Tilt</option>
                  <option value="Tile">Tile</option>
                  <option value="Tile">Colorbond</option>
                  <option value="Others">
                    Others
                  </option>
                </select>
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <select value={meterPhase} name='meterPhase' onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                  <option>Select Meter Phase</option>
                  <option>Single Phase</option>
                  <option>2 Phase</option>
                  <option>3 Phase</option>
                </select>
                <select value={installationType} name="installationType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }}  >
                  <option>Select Installation Type</option>
                  <option value="new">New</option>
                  <option value="old">Old</option>
                </select>
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input type="file" placeholder="Packing Slip" onChange={e => setPackingSlipFile(e.target.files[0])} width="100%" />
                <Input type="file" placeholder="Western Power Approval" onChange={e => setwesternPowerFile(e.target.files[0])} width="100%" />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input type="file" placeholder="Switch Board" onChange={e => setswitchBoardFile(e.target.files[0])} width="100%" />
                <Input type="file" placeholder="Panels Layout" onChange={e => setpanelLayoutFile(e.target.files[0])} width="100%" />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input type="file" placeholder="Extras" onChange={e => setextrasFile(e.target.files[0])} width="100%" />
                <Input placeholder="Packing Slip Reason" value={packingSlipReason} name="packingSlipReason" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Western Power Reason" value={westernPowerReason} name="westernPowerReason" onChange={handleChange} />
                <Input placeholder="Switch Board Reason" value={switchBoardReason} name="switchBoardReason" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Panel Layout Reason" value={panelLayoutReason} name="panelLayoutReason" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Address" value={addressline} name="addressline" onChange={handleChange} />
                <Input placeholder="Street" value={street} name="street" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="City" value={city} name="city" onChange={handleChange} />
                <select name='state' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray' }} value={state} onChange={handleChange} >
                  <option value="" selected>Select State</option>
                  <option value="Queensland">Queensland</option>
                  <option value="New South Wales">New South Wales</option>
                  <option value="Victoria">Victoria</option>
                  <option value="Western Australia">Western Australia</option>
                </select>
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <Input placeholder="Postcode" value={postcode} name="postcode" onChange={handleChange} />
                <Input placeholder="Country" value={country} name="country" onChange={handleChange} />
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>

                <select value={panels} name="panels" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                  <option defaultChecked>Select Panel</option>
                  {
                    panelList && panelList.map((ele, idx) => {
                      return (
                        <option key={idx} value={ele?.id}>{ele?.code}</option>
                      )
                    })
                  }
                </select>
                <select value={panelsQuantity} name='panelsQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                  <option>Panels Quantity</option>
                  {
                    [...Array(100)].map((_, idx) => {
                      return (
                        <option key={idx}>{idx + 1}</option>
                      )
                    })
                  }
                </select>
                <select value={panelPurchase} name='panelPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} >
                  <option value="">Purchase From</option>
                  <option value="false">Himself</option>
                  <option value="true">From Company</option>
                </select>
              </div>
              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <select value={inverter} name="inverter" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                  <option value="Select Inverter" selected>Select Inverter</option>
                  {
                    inverterList && inverterList.map((ele, idx) => {
                      return (
                        <option value={ele?.id} key={idx}>{ele?.code}</option>
                      )
                    })
                  }
                </select>
                <select value={inverterQuantity} name='inverterQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                  <option>Panels Quantity</option>
                  {
                    [...Array(100)].map((_, idx) => {
                      return (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                      )
                    })
                  }
                </select>
                <select value={inverterPurchase} name='inverterPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} >
                  <option value="">Purchase From</option>
                  <option value="false">Himself</option>
                  <option value="true">From Company</option>
                </select>
              </div>

              <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                <select value={batteries} name="batteries" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                  <option defaultChecked>Select Battery</option>
                  {
                    batteryList.map((ele, idx) => {
                      return (
                        <option key={idx} value={ele?.id}>{ele?.code}</option>
                      )
                    })
                  }
                </select>
                <select value={batteriesQuantity} name='batteriesQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                  <option>Battery Quantity</option>
                  {
                    [...Array(100)].map((_, idx) => {
                      return (
                        <option key={idx} value={idx + 1}>{idx + 1}</option>
                      )
                    })
                  }
                </select>
                <select value={batteryPurchase} name='batteryPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} >
                  <option value="">Purchase From</option>
                  <option value="false">Himself</option>
                  <option value="true">From Company</option>
                </select>
              </div>
              {/*<div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                  <select value={otherComponent} name="otherComponent" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                      <option defaultChecked>Select Other Component List</option>
                      {
                          otherComponentList && otherComponentList.map((ele, idx) => {
                              return (
                                  <option key={idx} value={ele?.id}>{ele?.code}</option>
                              )
                          })
                      }
                  </select>
                  <select value={otherComponentQuantities} name='otherComponentQuantities' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                      <option>Other Component Quantity</option>
                      {
                          [...Array(100)].map((_, idx) => {
                              return (
                                  <option key={idx} value={idx + 1}>{idx + 1}</option>
                              )
                          })
                      }
                  </select>
                  </div>*/}
              <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                <Button title="Submit" background="orange" color="white" type="submit" />
                <Button title="Close" background="gray" color="white" onclick={handleCloseAdminForm} />
              </div>
            </form>
          </FormsContainer>
        }
      </div>
    </>
  )
}

export default AdminOrders