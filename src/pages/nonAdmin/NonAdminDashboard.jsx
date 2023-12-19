import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../../components/loading/Loading'
import OrderList from '../../components/orders/OrderList'
import { Link, useNavigate } from 'react-router-dom'
import NonAdminSideNavigation from '../nonAdmin/menu/NonAdminSideNavigation'
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'

import FormsContainer from './Forms/FormsContainer'
import Heading from '../../components/heading/Heading'
import Input from '../../components/inputsfield/Input'

import { fetchRequest } from '../../utils/FetchRequest'
import { BiLogOut } from "react-icons/bi"
import { toast } from 'react-toastify'


function NonAdminDashboard() {

    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies();

    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const [orderLists, setOrderLists] = useState([])
    const [inverterList, setInverterList] = useState([])
    const [batteryList, setBatteryList] = useState([])
    const [panelList, setPanelList] = useState([])
    const [nonAdminProfile, setNonAdminProfile] = useState({})
    const [packingSlipFile, setPackingSlipFile] = useState(null)
    const [westernPowerFile, setwesternPowerFile] = useState(null)
    const [switchBoardFile, setswitchBoardFile] = useState(null)
    const [panelLayoutFile, setpanelLayoutFile] = useState(null)
    const [extrasFile, setextrasFile] = useState(null)

    const [text, setText] = useState({
        firstname: '',
        lastname: "",
        phone: "",
        email: '',
        systemSize: "",
        buildingType: "",
        roofType: "",
        nmiNo: "",
        meterNumber: "",
        packingSlipReason: '',
        westernPowerReason: "",
        switchBoardReason: "",
        panelLayoutReason: "",
        state: "",
        addressline: "",
        city: "",
        postcode: "",
        country: "Australia",
        descritpion: '',
        meterPhase: "",
        panels: "",
        inverter: "",
        panelsQuantity: "",
        inverterQuantity: "",
        batteries: "",
        batteriesQuantity: "",
        batteryPurchase: "",
        inverterPurchase: "",
        panelPurchase: ""
    })

    const { addressline, batteryPurchase, inverterPurchase, panelPurchase, batteries, roofType, batteriesQuantity, buildingType, city, country, descritpion, email, firstname, inverter, inverterQuantity, lastname, meterNumber, meterPhase, nmiNo, packingSlipReason,
        panelLayoutReason, panels, panelsQuantity, phone, postcode, state, switchBoardReason, systemSize, westernPowerReason } = text

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

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
                    setOrderLists(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getDetails = async () => {
        const requestInverter = await fetchRequest(cookies.Authorization, 'https://solar365.co.in/inverter_module/')
        // console.log(requestInverter)
        return setInverterList(requestInverter)
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
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchProfile = () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'))
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_profile/${auth?.user?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setNonAdminProfile(result)
                    console.log(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCreateOrder = e => {
        e.preventDefault()
        try {
            const loadingId = toast.loading("Please wait....")
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const formdata = new FormData();
            formdata.append("first_name", firstname);
            // formdata.append("last_name", "Kumar");
            formdata.append("phone", phone);
            formdata.append("email", email);
            formdata.append("company_Name", nonAdminProfile?.company_name);
            formdata.append("system_Size", systemSize);
            formdata.append("nmi_no", nmiNo);
            formdata.append("meter_Number", meterNumber);
            packingSlipFile !== null ? formdata.append("packing_slip", packingSlipFile) : null;
            westernPowerFile !== null ? formdata.append("western_power", westernPowerFile) : null;
            switchBoardFile !== null ? formdata.append("switch_board", switchBoardFile) : null;
            panelLayoutFile !== null ? formdata.append("panel_layout", panelLayoutFile) : null;
            extrasFile !== null ? formdata.append("extras", extrasFile) : null;
            formdata.append("packing_slip_reason", packingSlipReason);
            formdata.append("western_power_reason", westernPowerReason);
            formdata.append("switch_board_reason", switchBoardReason);
            formdata.append("panel_layout_reason", panelLayoutReason);
            formdata.append("roof_type", roofType);
            formdata.append("state", state);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("postcode", postcode);
            formdata.append("country", country);
            formdata.append("meter_Phase", meterPhase);
            formdata.append("building_Type", buildingType);
            formdata.append("inverter", inverter);
            formdata.append("inverter_quantity", inverterQuantity);
            formdata.append("panels", panels);
            formdata.append("panels_quantity", panelsQuantity);
            formdata.append("batteries", batteries);
            formdata.append("battery_quantity", batteriesQuantity);
            formdata.append("is_inverter_buy", inverterPurchase);
            formdata.append("is_battery_buy", batteryPurchase);
            formdata.append("is_panel_buy", panelPurchase);


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/non-admin-order/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    toast.update(loadingId, { render: "Customer created successfully...", isLoading: false, type: 'success', autoClose: true })
                    setShowForm(false)
                    return fetchOrder()
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    // const getAllUserList = () => {
    //     try {
    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

    //         const requestOptions = {
    //             method: 'GET',
    //             headers: myHeaders,
    //             redirect: 'follow'
    //         };

    //         fetch("https://solar365.co.in/username_list_non_admin/", requestOptions)
    //             .then(response => response.json())
    //             .then(result => {
    //                 console.log(result)
    //                 setAllUserList(result)
    //             })
    //             .catch(error => console.log('error', error));
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const logout = () => {
        removeCookies('Authorization', { path: "/" })
        return navigate('/login')
    }

    const goToOrders = (url, data) => {
        return navigate(url, data)
    }

    useEffect(() => {
        const subscribe = fetchOrder()
        const subscribe1 = getDetails()
        // const subscribe2 = getAllUserList()
        const subscribe4 = getBatteryDetails()
        const subscribe5 = getPanelDetails()
        const subscribe6 = fetchProfile()

        return () => [subscribe, subscribe1, subscribe4, subscribe5, subscribe6]
    }, [])


    // if (loading) {
    //     return <Loading />
    // }

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
                    <Button title="Create New Job" background="green" color="white" onclick={() => setShowForm(!showForm)} />
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
                            orderLists && orderLists.map((ele, idx) => {
                                return (
                                    <tr onClick={() => goToOrders('/non-admin/orders', { state: ele })} style={{ cursor: 'pointer' }} key={idx}>
                                        <th >{ele.project}</th>
                                        <td >{ele?.customer_name}</td>
                                        <td >{ele?.panels}</td>
                                        <td >{ele.building_Type}</td>
                                        <td >{ele.nmi_no}</td>
                                        <td >
                                            <Button title={ele?.order_status === "Completed" ? "Completed" : "In Process"} background={ele?.order_status === "Completed" ? "orange" : "green"} color="white" cursor="none" />
                                        </td>
                                        {/* <td data-title="Budget" data-type="currency">$260,000,000</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                showForm && <FormsContainer flexDirection="column" height="80vh" overflow="scroll" justifyContent="flex-start">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Create your Job" size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={fetchCreateOrder}>
                        {/* <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <select name='username' value={username} onChange={handleChange} style={{ border: '2px solid gray', width: '95%', padding: '5px 0' }}>
                                    <option style={{ textAlign: 'center' }} >Select User List</option>
                                    {
                                        allUserList?.data?.map((ele, idx) => {
                                            return (
                                                <option value={ele} key={idx}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}

                        <div style={{ width: '90%', display: 'flex' }}>
                            <Input placeholder="Customer name" value={firstname} name="firstname" onChange={handleChange} required={true} />
                            <Input placeholder="Email" value={email} name="email" onChange={handleChange} required={true} />
                        </div>
                        {/* </div> */}
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Mobile Number" value={phone} name="phone" onChange={handleChange} required={true} />
                            <Input placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} required={true} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Meter Number" value={meterNumber} name="meterNumber" onChange={handleChange} required={true} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="NMI No" value={nmiNo} name="nmiNo" onChange={handleChange} required={true} />
                            <Input type="file" placeholder="Packing Slip" onChange={e => setPackingSlipFile(e.target.files[0])} width="100%" />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input type="file" placeholder="Western Power Approval" onChange={e => setwesternPowerFile(e.target.files[0])} width="100%" />
                            <Input type="file" placeholder="Switch Board" onChange={e => setswitchBoardFile(e.target.files[0])} width="100%" />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input type="file" placeholder="Panels Layout" onChange={e => setpanelLayoutFile(e.target.files[0])} width="100%" />
                            <Input type="file" placeholder="Extras" onChange={e => setextrasFile(e.target.files[0])} width="100%" />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Packing Slip Reason" value={packingSlipReason} name="packingSlipReason" onChange={handleChange} required={packingSlipFile === null ? true : false} />
                            <Input placeholder="Western Power Reason" value={westernPowerReason} name="westernPowerReason" onChange={handleChange} required={westernPowerFile === null ? true : false} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Switch Board Reason" value={switchBoardReason} name="switchBoardReason" onChange={handleChange} required={switchBoardFile === null ? true : false} />
                            <Input placeholder="Panel Layout Reason" value={panelLayoutReason} name="panelLayoutReason" onChange={handleChange} required={panelLayoutFile === null ? true : false} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Street Address" value={addressline} name="addressline" onChange={handleChange} required={true} />
                            <Input placeholder="City" value={city} name="city" onChange={handleChange} required={true} />
                        </div>
                        {/* <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                             <Input placeholder="Packing Slip Reason*" value={packingSlipReason} name="packingSlipReason" onChange={handleChange} />
                             <Input placeholder="Western Power Reason" value={westernPowerReason} name="westernPowerReason" onChange={handleChange} />
                         </div>
                         <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                             <Input placeholder="Switch Board Reason" value={switchBoardReason} name="switchBoardReason" onChange={handleChange} />
                             <Input placeholder="Panel Layout Reason" value={panelLayoutReason} name="panelLayoutReason" onChange={handleChange} />
                        </div> */}
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select name='state' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray' }} value={state} onChange={handleChange} required={true}>
                                <option selected>Select State</option>
                                <option value="Queensland">Queensland</option>
                                <option value="New South Wales">New South Wales</option>
                                <option value="Victoria">Victoria</option>
                                <option value="Western Australia">Western Australia</option>
                            </select>
                            <Input placeholder="Postcode" value={postcode} name="postcode" onChange={handleChange} required={true} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Country" value={country} name="country" onChange={handleChange} required={true} />
                            <select value={meterPhase} name='meterPhase' onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option>Select Meter Phase</option>
                                <option>Single Phase</option>
                                <option>2 Phase</option>
                                <option>3 Phase</option>
                            </select>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={buildingType} name="buildingType" onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option>Select Floor Type</option>
                                <option value="Ground Floor">Ground Floor</option>
                                <option value="First Floor">First Floor</option>
                                <option value="Second Floor">Second Floor</option>
                                <option value="More">More</option>
                            </select>
                            <select value={roofType} name="roofType" onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
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
                            <select value={panels} name='panels' onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option defaultChecked>Select Panel</option>
                                {
                                    panelList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={panelsQuantity} name='panelsQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option>Panels Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={panelPurchase} name='panelPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option>Purchase From</option>
                                <option value="false">Himself</option>
                                <option value="true">From Company</option>
                            </select>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={inverter} name="inverter" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option value="Select Inverter" selected>Select Inverter</option>
                                {
                                    inverterList && inverterList.map((ele, idx) => {
                                        return (
                                            <option value={ele?.id} key={idx}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={inverterQuantity} name='inverterQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option>Inverter Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={inverterPurchase} name='inverterPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option>Purchase From</option>
                                <option value="false">Himself</option>
                                <option value="true">From Company</option>
                            </select>
                        </div>

                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={batteries} name="batteries" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option defaultChecked>Select Battery</option>
                                {
                                    batteryList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={batteriesQuantity} name='batteriesQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option>Battery Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={batteryPurchase} name='batteryPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option>Purchase From</option>
                                <option value="false">Himself</option>
                                <option value="true">From Company</option>
                            </select>
                        </div>

                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" type="submit" background="orange" color="white" />
                            <Button title="Close" background="gray" color="white" onclick={() => setShowForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default NonAdminDashboard    