import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Navigation from "../Menu/InstallationTeamNavigation"
import { BiLogOut } from 'react-icons/bi'
import Multiselect from 'multiselect-react-dropdown'

function OrderDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [cookies, removeCookies] = useCookies()


  const [deletePopup, setDeletePopup] = useState(false)
  const [orderDetails, setOrderDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const logout = () => {
    removeCookies('Authorization', {path: '/'})
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
                console.log('pending list', result)
                setLoading(false)
                setOrderDetails(result)  
                return
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
        <p style={{ fontSize: '1.2rem' }}>Are you sure want to delete ?</p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <Multiselect
       hidePlaceholder={true} options={installerList?.Electrician} displayValue='full_name' onSelect={e => setElecticianId(e.map(item => item?.id))} />
          <Button title="Confirm" background="green" color="#fff" />
          <Button title="Cancel" background="gray" color="#fff"  />
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
        <Button title="Assign Order" background="green" color="#fff" onclick={() => setShowForm(true)} />
      </div>
      <div className="completejobs__box">
        <div className="header">
          <p>Personal Details</p>
        </div>
        <div className='content'>
          <div>
            <p>Project: {orderDetails?.order?.project}</p>
            <p>Password: {orderDetails?.admin?.user?.pin}</p>
          </div>
          <div>
            <p>Name: {orderDetails?.admin?.user?.first_name} {orderDetails?.admin?.user?.last_name}</p>
            <p>Email: {orderDetails?.admin?.user?.email}</p>
          </div>
          <div>
            <p>Phone: {orderDetails?.admin?.user?.phone}</p>
            <p>Address: {orderDetails?.admin?.address_line}</p>
          </div>
          <div>
            <p>City: {orderDetails?.admin?.city}</p>
            <p>State: {orderDetails?.admin?.state?.toUpperCase()}</p>
          </div>
          <div>
            <p>Country: {orderDetails?.admin?.country?.toUpperCase()}</p>
            <p>Company Name: {orderDetails?.company_name}</p>
          </div>
          <div>
            <p>User Type: {orderDetails?.admin?.user?.user_type}</p>
          </div>
        </div>
      </div>
    </div>

   
  </div>
  )
}

export default OrderDetails
