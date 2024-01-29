import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NonAdminSideNavigation from '../../nonAdmin/menu/NonAdminSideNavigation'
import Button from '../../../components/Button/Button'
import { useCookies } from 'react-cookie'

import { BiLogOut } from "react-icons/bi"
import  { toast } from 'react-toastify'

function RequestForOtherComponentNonAdmin() {

    const navigate = useNavigate()
    const [cookies, removeCookies] = useCookies()

    const [loading, setLoading] = useState(false)
    const [orderList, setOrderList] = useState([])

    const fetchOrder = async () => {
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

            fetch("https://solar365.co.in/non-admin-order/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log('orders', result)
                    setOrderList(result)
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

    const gotopage = (url, data) => {
        return navigate(url, {state: data})
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        return () => [subscribe]
    }, [])

    return (
        <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <NonAdminSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>
            <div className="container__table">
                <div className='py-2 flex justify-end'>
                    <Button title="Approve" background="green" color="white" onclick={() => null} />
                </div>
                <table className="responsive-table">
                    {/* <caption>Top 10 Grossing Animated Films of All Time</caption> */}
                    <thead >
                        <tr>
                            <th scope="col">Project Number</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Panels Quantity</th>
                            <th scope="col">Building Type</th>
                            <th scope="col">NMI No</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Budget</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList && orderList?.filter(ele => (ele?.order_status !== "Completed" && ele?.is_add_other === true)).map((ele, idx) => {
                                return (
                                    <tr onClick={() => gotopage('/non-admin/approve-non-admin-other-component', {ele})} style={{ cursor: 'pointer' }} key={idx}>
                                        <th >{ele.project}</th>
                                        <td >{ele?.customer_name}</td>
                                        <td >{ele?.panels_quantity}</td>
                                        <td >{ele.building_Type}</td>
                                        <td >{ele.nmi_no}</td>
                                        <td >
                                            <Button title={ele?.order_status === "Completed" ? "Completed" : "In Process"} background={ele?.order_status === "Completed" ? "orange" : "green"} color="white" cursor="none" />
                                        </td>
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

export default RequestForOtherComponentNonAdmin
