import React, { useState, useEffect } from 'react';
import NonAdminSideNavigation from '../menu/NonAdminSideNavigation';
import { BiLogOut } from 'react-icons/bi';
import Button from '../../../components/Button/Button';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function CompleteJobs() {

  const [cookies] = useCookies()
  const navigate = useNavigate()
  const [orderDetails, setOrderDetails] = useState([])

  const fetchOrder = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/non-admin-order/?order_status=Completed", requestOptions)
        .then(response => response.json())
        .then(result => {
          setOrderDetails(result)
          console.log('hello', result)
          return
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }


  const logout = () => {
    removeCookies('Authorization', { path: "/" })
    return navigate('/login')
  }

  useEffect(() => {
    const subscribe = fetchOrder()

    return () => [subscribe]
  }, [])

  return (
    <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
      <div>
        <NonAdminSideNavigation />
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
          <BiLogOut />
          <Button title="Logout" onclick={logout} />
        </div>
      </div>
      <div className="container__table">
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Compnay Name</th>
              <th scope="col">Building Type</th>
              <th scope="col">Meter Phase</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody> 
            {
              orderDetails && orderDetails.map((ele, idx) => {
                return (
                  <tr key={idx} onClick={() => navigate('/non-admin/completed-jobs-details', { state: { orderId: ele?.id } })}>
                    {
                      ele?.order_status === "Completed" ?
                        <>
                          <td >{ele?.project}</td>
                          <td >{ele?.to_address?.user?.first_name} {ele?.to_address?.user?.last_name}</td>
                          <td >{ele?.company_Name === null ? 'Solar 365' : ele?.company_Name}</td>
                          <td>{ele?.building_Type}</td>
                          <td >{ele?.meter_Phase}</td>
                          <td >
                            <p style={{ background: 'green', color: '#fff', padding: '4px 10px', borderRadius: '5px', letterSpacing: 1 }}>{ele?.order_status}</p>
                          </td>
                        </> : null
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompleteJobs
