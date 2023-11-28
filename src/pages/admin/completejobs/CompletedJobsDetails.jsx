import React from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from 'react-icons/bi'
import Button from '../../../components/Button/Button'
import { useEffect } from 'react'

function CompletedJobsDetails() {

    const [cookies] = useCookies()
    const location = useLocation()

    const [ordersDetails, setOrdersDetails] = useState({})

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

            fetch(`https://solar365.co.in/order/${location?.state?.orderId}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setOrdersDetails(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        removeCookies('Authorization')
        return navigate('/login')
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        return () => [subscribe]
    }, [])

    return (
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
            <div>
                <AdminSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>
            <div className="container__table completeContainer">
            <div style={{width: '95%', display: 'flex', justifyContent: 'flex-end',}}>
                <Button title="Download Invoice" background="green" color="#fff"/>
            </div>
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
                            <div className="completejobs__box">
                                <div className="header">
                                    <p>Assign To {ele?.department}</p>
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
                        <p>Working Details</p>
                    </div>
                    <div className='content'>
                        <div>
                            <p>Start Date & Time: {ordersDetails?.order_start_date}</p>
                            <p>End Date & Time: {ordersDetails?.order_end_date}</p>
                        </div>
                        <div>
                            <p>Working Hours: {ordersDetails?.working_hour}</p>
                        </div>

                    </div>
                </div>
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
    )
}

export default CompletedJobsDetails
