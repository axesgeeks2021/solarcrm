import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../../../components/loading/Loading'
import OrderList from '../../../components/orders/OrderList'
import { Link, useNavigate } from 'react-router-dom'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import Button from '../../../components/Button/Button'

import { useCookies } from "react-cookie";

import FormsContainer from '../Forms/FormsContainer'
import Heading from '../../../components/heading/Heading'

import FormInput from '../../../components/inputsfield/FormInput'
import Input from '../../../components/inputsfield/Input'

import { BiLogOut } from "react-icons/bi"
import { toast } from 'react-toastify'



function AdminDashboard() {

    const navigate = useNavigate()
    const [cookies, setCookies, removeCookies] = useCookies();
    const [loading, setLoading] = useState(false)
    const [orderLists, setOrderLists] = useState([])
    const [userList, setUserList] = useState([])
    const [showAdminForm, setShowAdminForm] = useState(false)
    const [showNonAdminForm, setShowNonAdminForm] = useState(false)
    const [swmsDocFile, setSwmsDocFile] = useState(null)
    const [swmsFile, setSwmsFile] = useState(null)
    const [solar365File, setSolar365File] = useState(null)
    const [inverterList, setInverterList] = useState([])
    const [batteryList, setBatteryList] = useState([])
    const [panelList, setPanelList] = useState([])
    const [otherComponentList, setOtherComponentLists] = useState([])
    const [companyList, setCompanyList] = useState([])
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
        username: "",
        systemSize: "",
        buildingType: "",
        nmiNo: "",
        panels: "",
        inverter: "",
        roofType: "",
        roofAngle: "",
        meterPhase: "",
        installationType: "",
        panelsQuantity: "",
        inverterQuantity: "",
        otherComponent: "",
        batteries: "",
        batteriesQuantity: "",
        otherComponentQuantities: "",
        companyName: null,
        meterNumber: "",
        packingSlipReason: '',
        westernPowerReason: "",
        switchBoardReason: "",
        panelLayoutReason: "",
        street: "",
        state: "",
        addressline: "",
        city: "",
        postcode: "",
        country: "Australia",
        descritpion: '',
        batteryPurchase: "",
        inverterPurchase: "",
        panelPurchase: ""
    })

    const { batteries, buildingType, otherComponentQuantities, batteriesQuantity, installationType, inverterQuantity, meterPhase, nmiNo, otherComponent, panels, panelsQuantity, roofAngle, roofType, systemSize, username, companyName, addressline, batteryPurchase, street, inverterPurchase, panelPurchase, city, country, descritpion, email, firstname, inverter, lastname, meterNumber, packingSlipReason,
        panelLayoutReason, phone, postcode, state, switchBoardReason, westernPowerReason } = text

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

    const fetchOrder = async () => {
        try {
            setLoading(true)
            const url = "https://solar365.co.in/order/"
            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })
            const data = await res.json()
            setLoading(false)
            setOrderLists(data)
            console.log('customer', data)
            return
        } catch (error) {
            console.log(error)
        }
    }

    const fetchcreatenonadminorder = e => {
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
            formdata.append("company_Name", companyName);
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
            formdata.append("street", street);
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
                    if (result?.error === true) {
                        toast.update(loadingId, { render: "Please try again!", isLoading: false, type: 'error', autoClose: true })
                        return
                    }
                    toast.update(loadingId, { render: "Customer created successfully...", isLoading: false, type: 'success', autoClose: true })
                    setShowNonAdminForm(false)
                    setText(prev => prev !== "" ? "" : "")
                    return fetchOrder()
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const createOrder = (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait....')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd");

            const formdata = new FormData();
            formdata.append("username", username);
            formdata.append("system_Size", systemSize);
            formdata.append("building_Type", buildingType);
            formdata.append("nmi_no", nmiNo);
            formdata.append("panels", panels);
            formdata.append("inverter", inverter);
            formdata.append("roof_Type", roofType);
            formdata.append("roof_Angle", roofAngle);
            formdata.append("meter_Phase", meterPhase);
            formdata.append("installation_Type", installationType);
            formdata.append("panels_quantity", panelsQuantity);
            formdata.append("inverter_quantity", inverterQuantity);
            // formdata.append("other_component", otherComponent);
            formdata.append("batteries", batteries);
            formdata.append("battery_quantity", batteriesQuantity);
            // formdata.append("swms_doc", batteries);
            // formdata.append("swms", batteries);
            // formdata.append("solar365_docs", batteries);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/order/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('order ', result)
                    if (result.message === "success") {
                        setShowAdminForm(false)
                        setText(prev => prev !== "" ? "" : "")
                        toast.update(loadingId, { render: 'Order created successfully', type: 'success', isLoading: false, autoClose: true })
                        return fetchOrder()
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getAllUserList = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");
            myHeaders.append('Content-Type', 'application/json')

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/username_list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setUserList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getCompanyList = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");
            myHeaders.append('Content-Type', 'application/json')

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/company_name_list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('compnay,', result)
                    return setCompanyList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getInverterDetails = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=ceOYmNljg42J2Qs4nM3VcfaOK0kx6OSo; sessionid=rdm7ivcxs95syinfglztgj87716n0u05");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/inverter_module/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setInverterList(result)
                    return
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
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

    const fetchOtherComponent = async () => {
        try {
            const url = "https://solar365.co.in/other_component/"

            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })

            const data = await res.json()
            setOtherComponentLists(data)

        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        removeCookies('Authorization', { path: "/" })
        return navigate('/login')
    }

    const handleCloseNonAdminForm = () => {
        setShowNonAdminForm(false)
        return setText(prev => prev !== "" ? "" : "")
    }

    const handleCloseAdminForm = () => {
        setShowAdminForm(false)
        return setText(prev => prev !== "" ? "" : "")
    }

    useEffect(() => {
        const subscribe = fetchOrder()
        const userSubscribe = getAllUserList()
        const subscribe1 = getInverterDetails()
        const subscribe4 = getBatteryDetails()
        const subscribe5 = getPanelDetails()
        const subscribe6 = fetchOtherComponent()
        const subscribe7 = getCompanyList()

        return () => [subscribe, userSubscribe, subscribe1, subscribe4, subscribe5, subscribe6, subscribe7]

    }, [])


    // if (loading) {
    //     return <Loading />
    // }

    return (
        <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <AdminSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>
            <div className="container py-5">
                <div className='py-2 flex justify-end'>
                    <Button title="Create New Order For Admin" background="green" color="white" onclick={() => setShowAdminForm(!showAdminForm)} margin="0 20px" />
                    <Button title="Create New Order For Non Admin" background="green" color="white" onclick={() => setShowNonAdminForm(!showNonAdminForm)} />
                </div>
                <ul className="responsive-table">
                    <li className="table-header py-3">
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Id</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">System Size</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Nmi No.</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Status</div>
                    </li>
                    {
                        orderLists?.length < 1 ? <h2>There is no order available right now...</h2> : orderLists?.map((ele, idx) => {
                            return (
                                <Link to="/admin-orders" state={{ ele }} key={idx}>
                                    <OrderList
                                        Id={ele.id}
                                        Project={ele.project}
                                        CustomerName={ele.customer_name}
                                        SystemSize={ele.system_Size}
                                        BuildingType={ele.building_Type}
                                        NmiNo={ele.nmi_no}
                                    />
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showAdminForm &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Order Created by Admin" size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={createOrder}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <select name='username' value={username} onChange={handleChange} style={{ border: '2px solid gray', width: '100%', padding: '5px 0', margin: '0 4px' }}>
                                    <option style={{ textAlign: 'center' }} >Select User List</option>
                                    {
                                        userList?.data?.map((ele, idx) => {
                                            return (
                                                <option value={ele?.project} key={idx}>{ele?.project} -  {ele?.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div style={{ width: '50%' }}>

                                <Input placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} />
                            </div>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Nmi Number" value={nmiNo} name="nmiNo" onChange={handleChange} />
                            <Input placeholder="Roof Angle" value={roofAngle} name="roofAngle" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={buildingType} name="buildingType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} required={true}>
                            <option value="">Select Floor Type</option>
                                <option value="Single Storey">Single Storey</option>
                                <option value="Double Storey">Double Storey</option>
                                <option value="Multi Storey">Multi Storey</option>
                            </select>
                            <select value={roofType} name="roofType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }}  >
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
                            <select value={meterPhase} name='meterPhase' onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                                <option>Select Meter Phase</option>
                                <option>Single Phase</option>
                                <option>2 Phase</option>
                                <option>3 Phase</option>
                            </select>
                            <select value={installationType} name="installationType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }}  >
                                <option>Select Installation Type</option>
                                <option value="new">New</option>
                                <option value="old">Old</option>
                            </select>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>

                            <select value={panels} name="panels" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                                <option defaultChecked>Select Panel</option>
                                {
                                    panelList && panelList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={panelsQuantity} name='panelsQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                                <option>Panels Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={inverter} name="inverter" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                                <option value="Select Inverter" selected>Select Inverter</option>
                                {
                                    inverterList && inverterList.map((ele, idx) => {
                                        return (
                                            <option value={ele?.id} key={idx}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={inverterQuantity} name='inverterQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                                <option>Panels Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={batteries} name="batteries" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                                <option defaultChecked>Select Battery</option>
                                {
                                    batteryList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={batteriesQuantity} name='batteriesQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                                <option>Battery Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {/*<div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={otherComponent} name="otherComponent" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                                <option defaultChecked>Select Other Component List</option>
                                {
                                    otherComponentList && otherComponentList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={otherComponentQuantities} name='otherComponentQuantities' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }}>
                                <option>Other Component Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            </div>*/}
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" type="submit" />
                            <Button title="Close" background="gray" color="white" onclick={handleCloseAdminForm} />
                        </div>
                    </form>
                </FormsContainer>
            }
            {
                showNonAdminForm && <FormsContainer flexDirection="column" overflow="scroll" justifyContent="flex-start">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Order Created By Admin For Non Admin" size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onSubmit={fetchcreatenonadminorder}>
                        {/* <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <select name='username' value={username} onChange={handleChange} style={{ border: '2px solid gray', width: '95%', padding: '5px 0' }}>
                                    <option value="" style={{ textAlign: 'center' }} >Select User List</option>
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
                            <select name='companyName' value={companyName} onChange={handleChange} style={{ border: '2px solid gray', width: '100%', padding: '5px 0', margin: '0 4px' }}>
                                <option style={{ textAlign: 'center' }} >Select Company</option>
                                {
                                    companyList?.data?.map((ele, idx) => {
                                        return (
                                            <option value={ele?.company_name} key={idx}>{ele?.company_name}</option>
                                        )
                                    })
                                }
                            </select>
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
                            <Input placeholder="NMI No" value={nmiNo} name="nmiNo" onChange={handleChange} required={true} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input type="file" placeholder="Packing Slip" onChange={e => setPackingSlipFile(e.target.files[0])} width="100%" />
                            <Input type="file" placeholder="Western Power Approval" onChange={e => setwesternPowerFile(e.target.files[0])} width="100%" />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input type="file" placeholder="Switch Board" onChange={e => setswitchBoardFile(e.target.files[0])} width="100%" />
                            <Input type="file" placeholder="Panels Layout" onChange={e => setpanelLayoutFile(e.target.files[0])} width="100%" />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input type="file" placeholder="Extras" onChange={e => setextrasFile(e.target.files[0])} width="100%" />
                            <Input placeholder="Packing Slip Reason" value={packingSlipReason} name="packingSlipReason" onChange={handleChange} required={packingSlipFile === null ? true : false} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Western Power Reason" value={westernPowerReason} name="westernPowerReason" onChange={handleChange} required={westernPowerFile === null ? true : false} />
                            <Input placeholder="Switch Board Reason" value={switchBoardReason} name="switchBoardReason" onChange={handleChange} required={switchBoardFile === null ? true : false} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Panel Layout Reason" value={panelLayoutReason} name="panelLayoutReason" onChange={handleChange} required={panelLayoutFile === null ? true : false} />
                            <Input placeholder="Address" value={addressline} name="addressline" onChange={handleChange} required={true} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Street" value={street} name="street" onChange={handleChange} required={true} />
                            <Input placeholder="City" value={city} name="city" onChange={handleChange} required={true} />
                        </div>

                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select name='state' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray' }} value={state} onChange={handleChange} required={true}>
                                <option value="" selected>Select State</option>
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
                                <option value="">Select Meter Phase</option>
                                <option value="Single Phase">Single Phase</option>
                                <option value="2 Phase">2 Phase</option>
                                <option value="3 Phase">3 Phase</option>
                            </select>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={buildingType} name="buildingType" onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option value="">Select Floor Type</option>
                                <option value="Ground Floor">Ground Floor</option>
                                <option value="First Floor">First Floor</option>
                                <option value="Second Floor">Second Floor</option>
                                <option value="More">More</option>
                            </select>
                            <select value={roofType} name="roofType" onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option value="">Select Roof Type</option>
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
                                <option value="">Select Panel</option>
                                {
                                    panelList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={panelsQuantity} name='panelsQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option value="">Panels Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={panelPurchase} name='panelPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option value="">Purchase From</option>
                                <option value="false">Himself</option>
                                <option value="true">From Company</option>
                            </select>
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={inverter} name="inverter" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option value="">Select Inverter</option>
                                {
                                    inverterList && inverterList.map((ele, idx) => {
                                        return (
                                            <option value={ele?.id} key={idx}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={inverterQuantity} name='inverterQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option value="">Inverter Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={inverterPurchase} name='inverterPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option value="">Purchase From</option>
                                <option value="false">Himself</option>
                                <option value="true">From Company</option>
                            </select>
                        </div>

                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <select value={batteries} name="batteries" onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option value="">Select Battery</option>
                                {
                                    batteryList.map((ele, idx) => {
                                        return (
                                            <option key={idx} value={ele?.id}>{ele?.code}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={batteriesQuantity} name='batteriesQuantity' onChange={handleChange} style={{ margin: '0 4px', width: '100%', border: '2px solid #99A3BA', padding: '5px 0' }} required={true}>
                                <option value="">Battery Quantity</option>
                                {
                                    [...Array(100)].map((_, idx) => {
                                        return (
                                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select value={batteryPurchase} name='batteryPurchase' onChange={handleChange} style={{ margin: '0 3px', width: '100%', padding: '5px 10px', border: '2px solid gray' }} required={true}>
                                <option value="">Purchase From</option>
                                <option value="false">Himself</option>
                                <option value="true">From Company</option>
                            </select>
                        </div>

                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" type="submit" background="orange" color="white" />
                            <Button title="Close" background="gray" color="white" onclick={handleCloseNonAdminForm} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default AdminDashboard