import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Navigation from "../Menu/InstallationTeamNavigation"
import { BiLogOut } from 'react-icons/bi'
import Multiselect from 'multiselect-react-dropdown'
import { toast } from 'react-toastify'

function OrderDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cookies, removeCookies] = useCookies()


  const [deletePopup, setDeletePopup] = useState(false)
  const [orderDetails, setOrderDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [installerList, setInstallerList] = useState({})
  const [installerId, setInstallerId] = useState([])
  const [electricianId, setElecticianId] = useState([])
  

  const logout = () => {
    removeCookies('Authorization', { path: '/' })
    return navigate('/login')
  }

  const fetchPendingOrder = () => {
    try {
      setLoading(true)
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/new-order-list/${location?.state?.data?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('pending', result)
          setLoading(false)
          setOrderDetails(result)
          if(typeof result?.appointment ===  "string"){
            return
          }
          return fetchInstallerList(result?.appointment?.appointment_date)
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



  useEffect(() => {
    const subscribe = fetchPendingOrder()

    return () => [subscribe]
  }, [])

  return (
    <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
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
      <div>
        <Navigation />
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
          <BiLogOut />
          <Button title="Logout" onclick={logout} />
        </div>
      </div>

      <div className="container__table completeContainer" style={{ justifyContent: 'flex-start' }}>
        <div style={{ width: '95%', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button title="Assign Order" background="green" color="#fff" onclick={() => handleShowAssignPopup(orderDetails?.appointment)} />
        </div>
        <div className="completejobs__box">
          <div className="header">
            <p>Personal Details</p>
          </div>
          <div className='content'>
            <div>
              <p>Project: {orderDetails?.order?.project}</p>
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
              <p>State: {orderDetails?.order?.to_address?.state?.toUpperCase()}</p>
              <p>Country: {orderDetails?.order?.to_address?.country?.toUpperCase()}</p>
            </div>
            <div>
              <p>Company Name: {orderDetails?.order?.company_Name}</p>
              <p>User Type: {orderDetails?.order?.to_address?.user?.user_type}</p>
            </div>
          </div>
        </div>
        <div className="completejobs__box">
          <div className="header">
            <p>Project Details</p>
          </div>
          <div className='content'>
            <div>
              <p>Meter Phase: {orderDetails?.order?.meter_Phase}</p>
              <p>Meter Number: {orderDetails?.order?.meter_Number}</p>
            </div>
            <div>
              <p>Building Type: {orderDetails?.order?.building_Type}</p>
              <p>Number of Roofs: {orderDetails?.order?.no_of_Roofs}</p>
            </div>
            <div>
              <p>Nmi Number: {orderDetails?.order?.nmi_no}</p>
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
      </div>


    </div>
  )
}

export default OrderDetails
