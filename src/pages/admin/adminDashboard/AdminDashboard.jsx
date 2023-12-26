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
    const [showForm, setShowForm] = useState(false)
    const [swmsDocFile, setSwmsDocFile] = useState(null)
    const [swmsFile, setSwmsFile] = useState(null)
    const [solar365File, setSolar365File] = useState(null)
    const [inverterList, setInverterList] = useState([])
    const [batteryList, setBatteryList] = useState([])
    const [panelList, setPanelList] = useState([])
    const [otherComponentList, setOtherComponentLists] = useState([])
    const [companyList, setCompanyList] = useState([])


    const [text, setText] = useState({
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
    })

    const { batteries, buildingType, otherComponentQuantities, batteriesQuantity, installationType, inverter, inverterQuantity, meterPhase, nmiNo, otherComponent, panels, panelsQuantity, roofAngle, roofType, systemSize, username, companyName } = text

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
            formdata.append("company_Name", companyName);
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
                    if(result.message === "success"){
                        setShowForm(false)
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

    const getDetails = () => {
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
        removeCookies('Authorization')
        return navigate('/login')
    }


    useEffect(() => {
        const subscribe = fetchOrder()
        const userSubscribe = getAllUserList()
        const subscribe1 = getDetails()
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
                    <Button title="Create New Order" background="green" color="white" onclick={() => setShowForm(!showForm)} />
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
                showForm && <FormsContainer flexDirection="column" on>
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Create order..." size="200%" />
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
                                </div>
                                </div>
                                <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                                <Input placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} />
                            <Input placeholder="Nmi Number" value={nmiNo} name="nmiNo" onChange={handleChange} />
                            </div>
                            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Roof Angle" value={roofAngle} name="roofAngle" onChange={handleChange} />
                            <select value={buildingType} name="buildingType" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} >
                                <option>Select Floor Type</option>
                                <option value="Ground Floor">Ground Floor</option>
                                <option value="First Floor">First Floor</option>
                                <option value="Second Floor">Second Floor</option>
                                <option value="More">More</option>
                            </select>
                            </div>
                            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
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
                            <select value={meterPhase} name='meterPhase' onChange={handleChange} style={{ width: '100%', border: '2px solid #99A3BA', padding: '5px 0', margin: '0 4px' }}>
                                <option>Select Meter Phase</option>
                                <option>Single Phase</option>
                                <option>2 Phase</option>
                                <option>3 Phase</option>
                            </select>
                            </div>
                            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
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
                            <Button title="Close" background="gray" color="white" onclick={() => setShowForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default AdminDashboard