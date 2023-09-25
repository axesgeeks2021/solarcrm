import React, { useEffect, useState } from 'react'
import Navigation from "./Menu/InstallationTeamNavigation"
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function AssignedJobs() {

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
                    console.log(result)
                    setOrderList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const gotNextPage = (data) => {
        return navigate('update-orders', {data: data})
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        return () => [subscribe]
    }, [])

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <Navigation />
                </div>

                <div class="container__table">
                    <div className='py-2 flex justify-end'>
                        <Button title="Create New Order" background="green" color="white" onclick={() => setShowForm(!showForm)} />
                    </div>
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
                                        <tr onClick={() => gotNextPage(ele)} key={idx} style={{cursor: 'pointer'}}>
                                                <th scope="row">{ele?.project}</th>
                                                <td data-title="Released">{ele?.to_address?.user?.first_name}</td>
                                                <td data-title="Studio">{ele?.building_Type}</td>
                                                <td data-title="Worldwide Gross" data-type="currency">{ele?.panels_quantity}</td>
                                                <td data-title="Domestic Gross" data-type="currency">{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</td>
                                                <td data-title="International Gross" data-type="currency">
                                                    {
                                                        ele?.assign_to?.map((ele, idx) => {
                                                            return (
                                                                <p key={idx}>{ele?.user_type}</p>
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

export default AssignedJobs