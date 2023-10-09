import React, { useEffect, useState } from 'react'
import Navigation from "./Menu/InstallationTeamNavigation"
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

import Dropdown from 'react-multilevel-dropdown'


function Dashboard() {

    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies();
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pendingList, setPendingList] = useState([])

    const [installerList, setInstallerList] = useState([])

    const [modal, setModal] = useState(false)

    const [selectedValue, setSelectedValue] = useState([])
    const [orderId, setOrderId] = useState('')

    const handleChange = (userId, orderId) => {

        let installerElectricianId = [...selectedValue, userId]
        setSelectedValue(installerElectricianId)
        console.log(installerElectricianId)
        if(installerElectricianId.length > 2){
            let arrayToString = installerElectricianId.toString().split(',').join(', ')
            setSelectedValue(arrayToString)
            setOrderId(orderId)
            setModal(true)
            return
            // return alert('')
            // return alert('Please select 1 Electrician and 2 Installer')
        }
    }

    const fetchOrder = () => {
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/order/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    // console.log(result)
                    setOrderList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
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

            fetch("https://solar365.co.in/new-order-list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    setPendingList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpdateAssignOrder = () => {

        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const formdata = new FormData();
            formdata.append("assign_to", selectedValue);
            formdata.append("order_status", "");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };
            fetch(`https://solar365.co.in/order/${orderId}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.messsage === "Success") {
                        toast.success('Order successfully assigned')
                        setModal(false)
                        return fetchPendingOrder()
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchGetInstaller = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/get_installer_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setInstallerList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const handleClosePopup = () => {
        setSelectedValue([])
        setModal(false)
    }


    const logout = () => {
        removeCookies('Authorization')
        return navigate('/login')
    }
    useEffect(() => {
        const subscribe = fetchOrder()

        const subscribe1 = fetchPendingOrder()

        const subscribe2 = fetchGetInstaller()

        return () => [subscribe, subscribe1, subscribe2]
    }, [])

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <Navigation />
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                        <BiLogOut />
                        <Button title="Logout" onclick={logout} />
                    </div>
                </div>
                <div style={{ zIndex: 9999, width: '40%', background: '#fff', position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', height: '30%', display: modal ? 'flex' : 'none', justifyContent: 'space-between', boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3), -2px -2px 20px 2px rgba(0,0,0,0.3)', borderRadius: '5px', backfaceVisibility: 'hidden', alignItems: 'center', flexDirection: 'column' }}>
                    <p style={{ fontSize: '1.1rem', margin: '5% 2%', alignSelf: 'flex-start' }}>Please assign to installer or electician</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <button style={{ background: 'green', color: 'white', fontWeight: '600', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px' }} onClick={fetchUpdateAssignOrder}>Confirm</button>
                        <button onClick={handleClosePopup} style={{ background: '', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px', fontWeight: '600' }}>Cancel</button>
                    </div>
                </div>
                {/* <div style={{ width: '100%', padding: '20px 10px' }}>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Panels Qty</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Status</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Assign</div>
                        </li>
                        {
                            pendingList?.map((ele, idx) => {
                                return (
                                    <li className="table-row" key={idx}>
                                        <div className={`col col-2 text-center`}>{ele?.project}</div>
                                        <div className={`col col-2 text-center`}>{ele?.to_address?.user?.first_name}</div>
                                        <div className={`col col-2 text-center`}>{ele?.building_Type}</div>
                                        <div className={`col col-2 text-center`}>{ele?.panels_quantity}</div>
                                        <div className={`col col-2 text-center`}>{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</div>
                                        <div className={`col col-2 text-center`}>
                                            <Dropdown
                                                title='Assign To'
                                            >
                                                <Dropdown.Item
                                                >
                                                    Electrician
                                                    <Dropdown.Submenu>
                                                        {
                                                            installerList?.Electrician?.map((eles, idx) => {
                                                                return (
                                                                    <Dropdown.Item key={idx} onClick={() => handleChange(eles?.admin?.user?.id, ele?.id)}>
                                                                        {
                                                                            eles?.admin?.user?.first_name
                                                                        }
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Submenu>
                                                </Dropdown.Item>
                                                <Dropdown.Item >
                                                    Installer
                                                    <Dropdown.Submenu>
                                                        {
                                                            installerList?.Installer?.map((eles, idx) => {
                                                                return (
                                                                    <Dropdown.Item key={idx} onClick={() => handleChange(eles?.admin?.user?.id, ele?.id)}>
                                                                        {
                                                                            eles?.admin?.user?.first_name
                                                                        }
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }
                                                    </Dropdown.Submenu>
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div> */}
                <div className="container__table">
                    <div className='py-2 flex justify-end'>
                        <Button title="Create New Order" background="green" color="white" onclick={() => setShowForm(!showForm)} />
                    </div>
                    <table className="responsive-table">
                        {/* <caption>Top 10 Grossing Animated Films of All Time</caption> */}
                        <thead>
                            <tr>
                                <th scope="col">Project</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Building Type</th>
                                <th scope="col">Panels Qty</th>
                                <th scope="col">Status</th>
                                <th scope="col">Assign</th>
                                {/* <th scope="col">Budget</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingList?.length < 1 ? <h2>There is no order available right now...</h2> : pendingList?.map((ele, idx) => {
                                    return (
                                        // <Link to="/non-admin/orders" state={{ ele }} key={idx}>
                                        <tr key={idx}>
                                            <th scope="row">{ele?.project}</th>
                                            <td data-title="Released">{ele?.to_address?.user?.first_name}</td>
                                            <td data-title="Studio">{ele?.building_Type}</td>
                                            <td data-title="Worldwide Gross" data-type="currency">{ele?.panels_quantity}</td>
                                            <td data-title="Domestic Gross" data-type="currency">{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</td>
                                            <td data-title="International Gross" data-type="currency">
                                                <Dropdown
                                                    title='Assign To'
                                                >
                                                    <Dropdown.Item
                                                    >
                                                        Electrician
                                                        <Dropdown.Submenu>
                                                            {
                                                                installerList?.Electrician?.map((eles, idx) => {
                                                                    return (
                                                                        <Dropdown.Item key={idx} onClick={() => handleChange(eles?.admin?.user?.id, ele?.id)}>
                                                                            {
                                                                                eles?.admin?.user?.first_name
                                                                            }
                                                                        </Dropdown.Item>
                                                                    )
                                                                })
                                                            }
                                                        </Dropdown.Submenu>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item >
                                                        Installer
                                                        <Dropdown.Submenu>
                                                            {
                                                                installerList?.Installer?.map((eles, idx) => {
                                                                    return (
                                                                        <Dropdown.Item key={idx} onClick={() => handleChange(eles?.admin?.user?.id, ele?.id)}>
                                                                            {
                                                                                eles?.admin?.user?.first_name
                                                                            }
                                                                        </Dropdown.Item>
                                                                    )
                                                                })
                                                            }
                                                        </Dropdown.Submenu>
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </td>
                                            {/* <td data-title="Budget" data-type="currency">$260,000,000</td> */}
                                        </tr>
                                        // </Link>
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

export default Dashboard