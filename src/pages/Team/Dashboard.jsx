import React, { useEffect, useState } from 'react'
import Navigation from "./Menu/InstallationTeamNavigation"
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { BiLogOut } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'

import Dropdown from 'react-multilevel-dropdown'
import Multiselect from 'multiselect-react-dropdown'


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
    const [installerId, setInstallerId] = useState(null)
    const [electricianId, setElecticianId] = useState(null)

    const handleChange = (userId, orderId) => {
        console.log('user id -->', installerId)
        console.log('electrician id -->', electricianId)
        setInstallerId([...installerId, userId])
        // console.log('order id -->', orderId)

        // let installerElectricianId = [...selectedValue, userId]
        // setSelectedValue(installerElectricianId)
        // if (installerElectricianId.length > 2) {
        //     let arrayToString = installerElectricianId.toString().split(',').join(', ')
        //     setSelectedValue(arrayToString)
        //     setOrderId(orderId)
        //     setModal(true)
        //     return
        // }
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
                    return
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
                    console.log('pending list', result)
                    setLoading(false)
                    setPendingList(result)  
                    return
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpdateAssignOrder = () => {
        try {
            const assignValue = installerId.concat(electricianId).toString().split(',').join(', ')
            console.log('electrician id -->', assignValue)
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
            // fetch(`https://solar365.co.in/order/${orderId}/`, requestOptions)
            //     .then(response => response.json())
            //     .then(result => {
            //         console.log(result)
            //         if (result.message === "success") {
            //             toast.success('Order successfully assigned')
            //             setModal(false)
            //             return fetchPendingOrder()
            //         }
            //     })
            //     .catch(error => console.log('error', error));
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

                    // setInstallerList(result)
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

            fetch("https://solar365.co.in/get_installer/", requestOptions)
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

    const handleClosePopup = () => {
        setSelectedValue([])
        setModal(false)
    }

    const gotoPage = (data) => {
        return navigate('/team/order-details', {state: {data}})
    }

    const logout = () => {
        removeCookies('Authorization', { path: "/" })
        return navigate('/login')
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        const subscribe1 = fetchPendingOrder()

        const subscribe2 = fetchGetInstaller()
        const subscribe3 = fetchInstallerList()

        return () => [subscribe, subscribe1, subscribe2, subscribe3]
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

                <div className="container__table">
                    <div className='py-2 flex justify-end'>
                        <Button title="confirm" background="green" color="white" onclick={fetchUpdateAssignOrder} />
                    </div>
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                <th scope="col">Project</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Building Type</th>
                                <th scope="col">Meter Phase</th>
                                <th scope="col">Nmi Number</th>
                                <th scope="col">Status</th>
                                {/* <th scope="col">Budget</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pendingList?.length < 1 ? <h2>There is no order available right now...</h2> : pendingList?.map((ele, idx) => {
                                    return (
                                        <tr key={idx} onClick={() => gotoPage(ele)}>
                                            <th >{ele?.project}</th>
                                            <td >{ele?.to_address?.user?.first_name}</td>
                                            <td >{ele?.building_Type}</td>
                                            <td >{ele?.meter_Phase}</td>
                                            <td >{ele?.nmi_no}</td>
                                            <td >{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</td>
                                           

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

export default Dashboard

// <td >
// <Multiselect
//     hidePlaceholder={true} options={installerList?.Electrician} displayValue='full_name' onSelect={e => setElecticianId(e.map(item => item?.id))} />
// </td>
// <td >
// <Multiselect
//     hidePlaceholder={true} options={installerList?.Installer} displayValue='full_name' onSelect={e => setInstallerId(e.map(item => item?.id))} />
// {/*<Dropdown
//     title='Assign To'
// >
//     <Dropdown.Item
//     >
//         Electrician
//         <Dropdown.Submenu>
//             {
//                 installerList?.Electrician?.map((eles, idx) => {
//                     return (
//                         <Dropdown.Item key={idx} onClick={() => handleChange(eles?.admin?.user?.id, ele?.id)}>
//                             {
//                                 eles?.admin?.user?.first_name
//                             }
//                         </Dropdown.Item>
//                     )
//                 })
//             }
//         </Dropdown.Submenu>
//     </Dropdown.Item>
//     <Dropdown.Item >
//         Installer
//         <Dropdown.Submenu>
//             {
//                 installerList?.Installer?.map((eles, idx) => {
//                     return (
//                         <Dropdown.Item key={idx} onClick={() => handleChange(eles?.admin?.user?.id, ele?.id)}>
//                             {
//                                 eles?.admin?.user?.first_name
//                             }
//                         </Dropdown.Item>
//                     )
//                 })
//             }
//         </Dropdown.Submenu>
//     </Dropdown.Item>
//         </Dropdown>*/}
// </td>