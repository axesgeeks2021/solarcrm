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
import FormInput from '../../components/inputsfield/FormInput'

import { fetchRequest } from '../../utils/FetchRequest'

import Select from "react-select"

import { BiLogOut } from "react-icons/bi"
import { toast } from 'react-toastify'


function NonAdminDashboard() {

    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies();

    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)


    const [orderLists, setOrderLists] = useState([])
    const [moduleList, setModuleList] = useState([])
    const [inverterList, setInverterList] = useState([])
    const [allUserList, setAllUserList] = useState([])

    const [ordersList, setOrdersLists] = useState([])


    const [file, setFile] = useState()
    const [packingSlipFile, setPackingSlipFile] = useState(null)
    const [weternPowerFile, setweternPowerFile] = useState(null)
    const [switchBoardFile, setswitchBoardFile] = useState(null)
    const [panelLayoutFile, setpanelLayoutFile] = useState(null)
    const [extrasFile, setextrasFile] = useState(null)

    const handleFile = e => {
        setFile(e.target.files[0])
    }

    const [text, setText] = useState({
        firstname: '',
        lastname: "",
        phone: "",
        email: '',
        systemSize: "",
        buildingType: "",
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
        country: "",
        descritpion: '',
        meterPhase: "",
        panels: "",
        inverter: "",
        panelsQuantity: "",
        inverterQuantity: "",
        batteries: ""
    })

    const { addressline, batteries, buildingType, city, country,descritpion,email,firstname,inverter,inverterQuantity,lastname,meterNumber,meterPhase,nmiNo,packingSlipReason,
    panelLayoutReason,panels,panelsQuantity,phone,postcode,state,switchBoardReason,systemSize,westernPowerReason} = text

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

            fetch("http://solar365.co.in/get_order_list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTimeout(() => {
                        setLoading(false)
                        // console.log('orders', result)
                        setOrderLists(result)
                    }, 200);
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const createOrder = (e) => {
        e.preventDefault()
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Content-Type", "application/json");
            
            var formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            formdata.append("profile_pic", "");
            formdata.append("system_Size", systemSize);
            formdata.append("nmi_no", nmiNo);
            formdata.append("meter_Number", meterNumber);
            formdata.append("packing_slip", packingSlipFile);
            formdata.append("western_power", weternPowerFile);
            formdata.append("switch_board",switchBoardFile);
            formdata.append("panel_layout", panelLayoutFile);
            formdata.append("extras", extrasFile);
            formdata.append("packing_slip_reason", packingSlipReason);
            formdata.append("western_power_reason", westernPowerReason);
            formdata.append("switch_board_reason", switchBoardReason);
            formdata.append("panel_layout_reason", panelLayoutReason);
            formdata.append("state", state);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("postcode", postcode);
            formdata.append("country", country);
            formdata.append("description", descritpion);
            formdata.append("meter_Phase", meterPhase);
            formdata.append("panels", panels);
            formdata.append("building_Type", buildingType);
            formdata.append("inverter", inverter);
            formdata.append("panels_quantity", panelsQuantity);
            formdata.append("inverter_quantity", inverterQuantity);
            formdata.append("batteries", batteries);
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            
            fetch("http://solar365.co.in/non-admin-order/", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
            })
              .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getDetails = async () => {
        const requestInverter = await fetchRequest(cookies.Authorization, 'http://solar365.co.in/inverter_module/')
        return setInverterList(requestInverter)
    }

    const fetchGetOrders = () => {
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/get_order_list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result)
                    setOrdersLists(result)
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

    const fetchCreateOrder = (e) => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            // myHeaders.append("Content-Type", "application/json");
            
            const formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            formdata.append("profile_pic", "");
            formdata.append("system_Size", systemSize);
            formdata.append("nmi_no", nmiNo);
            formdata.append("meter_Number", meterNumber);
            formdata.append("packing_slip", packingSlipFile);
            formdata.append("western_power", weternPowerFile);
            formdata.append("switch_board",switchBoardFile);
            formdata.append("panel_layout", panelLayoutFile);
            formdata.append("extras", extrasFile);
            formdata.append("packing_slip_reason", packingSlipReason);
            formdata.append("western_power_reason", westernPowerReason);
            formdata.append("switch_board_reason", switchBoardReason);
            formdata.append("panel_layout_reason", panelLayoutReason);
            formdata.append("state", state);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("postcode", postcode);
            formdata.append("country", country);
            formdata.append("description", descritpion);
            formdata.append("meter_Phase", meterPhase);
            formdata.append("panels", panels);
            formdata.append("building_Type", buildingType);
            formdata.append("inverter", inverter);
            formdata.append("panels_quantity", panelsQuantity);
            formdata.append("inverter_quantity", inverterQuantity);
            formdata.append("batteries", batteries);
            
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            
            fetch("http://solar365.co.in/non-admin-order/", requestOptions)
              .then(response => response.json())
              .then(result => {
                if(result.messsage === 'Success'){
                    toast.success('Order created successfully')
                    setShowForm(false)
                    return fetchOrder()
                }
                console.log(result)
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

    //         fetch("http://solar365.co.in/username_list_non_admin/", requestOptions)
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

    useEffect(() => {
        const subscribe = fetchOrder()

        const subscribe1 = getDetails()

        // const subscribe2 = getAllUserList()

        const subscribe3 = fetchGetOrders()

        return () => [subscribe, subscribe1, subscribe3]
    }, [])


    if (loading) {
        return <Loading />
    }

    return (
        <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <NonAdminSideNavigation />
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
                    <li className="table-header">
                        <div className="col col-1 text-center text-slate-50 text-base font-bold">Id</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Project Id</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Panels qty</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Nmi No.</div>
                        {/* <div className="col col-1 text-center">Panels</div>
                        <div className="col col-1 text-center">Inverter</div> */}
                        {/* <div className="col col-1 text-center">Meter Phase</div> */}
                        {/* <div className="col col-1 text-center">Order Status</div> */}
                        {/* <div className="col col-1 text-center">Manufacturer</div> */}
                        {/* <div className="col col-1 text-center">Smart Meter</div> */}
                    </li>
                    {
                        ordersList.length < 1 ? <h2>There is no order available right now...</h2> : orderLists.map((ele, idx) => {
                            return (
                                <Link to="/non-admin/orders" state={{ ele }} key={idx}>
                                    <OrderList
                                        Id={idx + 1}
                                        Project={ele.project}
                                        CustomerName={ele?.to_address?.user?.first_name + ele?.to_address?.user?.last_name}
                                        SystemSize={ele?.panels_quantity}
                                        BuildingType={ele.building_Type}
                                        NmiNo={ele.nmi_no}
                                    // Panels={ele.panels}
                                    // Inverter={ele.inverter}
                                    // MeterPhase={ele.meter_Phase}
                                    // OrderStatus={ele.order_status}
                                    // Manufacturer={ele.other_component.map((ele , idx) => {
                                    //     return ele.manufacturer
                                    // })}
                                    // SmartMeter={ele.other_component[0].smart_meter} 
                                    />
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showForm && <FormsContainer flexDirection="column" height="80vh" overflow="scroll" justifyContent="flex-start">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Create your order..." size="200%" />
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
                            <FormInput placeholder="First name" value={firstname} name="firstname" onChange={handleChange} />
                                <FormInput placeholder="Last name" value={lastname} name="lastname" onChange={handleChange} />    
                            </div>
                        {/* </div> */}
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                            <FormInput placeholder="Mobile Number" value={phone} name="phone" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="System Size" value={systemSize} name="systemSize" onChange={handleChange} />
                            {/* <select>
                                {
                                    inverterList.map((ele, idx) => {
                                        return(
                                            <option>{ele.code}</option>
                                        )
                                    })
                                }
                            </select> */}
                            {/* <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={inverter[0]}
                                // isDisabled={isDisabled}
                                isLoading={false}
                                isClearable={true}
                                isSearchable={true}
                                name="color"
                                options={inverterList}

                            /> */}
                            <FormInput placeholder="NMI No" value={nmiNo} name="nmiNo" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Meter Number" value={meterNumber} name="meterNumber" onChange={handleChange} />
                            <FormInput placeholder="Packing Slip" type="file" onChange={e => setPackingSlipFile(e.target.files[0])} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Western Power" type="file" onChange={e => setweternPowerFile(e.target.files[0])} />
                            <FormInput placeholder="Switch Board" type="file" onChange={e => setswitchBoardFile(e.target.files[0])} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Panels Layout" type="file" onChange={e => setpanelLayoutFile(e.target.files[0])} />
                            <FormInput placeholder="Extras" type="file" onChange={e => setextrasFile(e.target.files[0])} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Packing Slip Reason*" value={packingSlipReason} name="packingSlipReason" onChange={handleChange} />
                            <FormInput placeholder="Western Power Reason" value={westernPowerReason} name="westernPowerReason" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Switch Board Reason" value={switchBoardReason} name="switchBoardReason" onChange={handleChange}  />
                            <FormInput placeholder="Panel Layout Reason" value={panelLayoutReason} name="panelLayoutReason" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange}  />
                            <FormInput placeholder="Address Line" value={addressline} name="addressline" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="City" value={city} name="city" onChange={handleChange}  />
                            <FormInput placeholder="Postcode" value={postcode} name="postcode" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Country" value={country} name="country" onChange={handleChange}  />
                            <FormInput placeholder="Description" value={descritpion} name="descritpion" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Meter Phase" value={meterPhase} name="meterPhase" onChange={handleChange}  />
                            <FormInput placeholder="Panels" value={panels} name="panels" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Building Type" value={buildingType} name="buildingType" onChange={handleChange}  />
                            <FormInput placeholder="Inverter" value={inverter} name="inverter" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Panels Quantity" value={panelsQuantity} name="panelsQuantity" onChange={handleChange}  />
                            <FormInput placeholder="Inverter Quantity" value={inverterQuantity} name="inverterQuantity" onChange={handleChange}  />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Battries" value={batteries} name="batteries" onChange={handleChange}  />
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