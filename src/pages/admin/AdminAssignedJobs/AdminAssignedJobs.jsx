import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import Button from '../../../components/Button/Button'

function AdminAssignedJobs() {

    const [cookies] = useCookies()
    const navigate = useNavigate()
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrder = () => {
        try {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/pending-order-list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log('assingend',result)
                    setOrderList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const gotNextPage = (companyname, url, data) => {
        return navigate(companyname , url, {state: {data}})
        // return navigate(companyname === null ? 'team/order-details' : 'update-orders', {state: {data}})
    }


    useEffect(() => {
        const subscribe = fetchOrder()

        return () => [subscribe]
    }, [])

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <AdminSideNavigation />
                </div>
                <div class="container__table">
                   
                    <table class="responsive-table">
                        <thead>
                            <tr>
                                <th scope="col">Project</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Building Type</th>
                                <th scope="col">Panels Qty</th>
                                <th scope="col">Status</th>
                                <th scope="col">Assign To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderList.length < 1 ? <h2>There is no order available right now...</h2> : orderList.map((ele, idx) => {
                                    return (
                                        <tr onClick={() => gotNextPage(ele?.company_Name !== null ? '/admin-orders' : 'update-orders', ele)} key={idx} style={{cursor: 'pointer'}}>
                                                <th scope="row">{ele?.project}</th>
                                                <td>{ele?.to_address?.user?.first_name}</td>
                                                <td>{ele?.building_Type}</td>
                                                <td>{ele?.panels_quantity}</td>
                                                <td>{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</td>
                                                <td>
                                                    {
                                                        ele?.assign_to?.map((ele, idx) => {
                                                            return (
                                                                <p style={{textAlign: 'justify'}} key={idx}>{ele?.department === "Installer"  ? "(I)" : "(E)"} - {ele?.first_name.toUpperCase()} {ele?.last_name.toUpperCase()} </p>
                                                            )
                                                        })
                                                    }
                                                </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminAssignedJobs