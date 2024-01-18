import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import AdminSideNavigation from '../menu/AdminSideNavigation';
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import UploadFile from '../../../components/inputsfield/UploadFile';
import Dropdown from 'react-multilevel-dropdown'
import Input from '../../../components/inputsfield/Input';
import { Multiselect } from "multiselect-react-dropdown"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Customer() {

    const [cookies] = useCookies();
    const [showForm, setShowForm] = useState(false)
    const [customerList, setCustomerList] = useState([])
    const [installerList, setInstallerList] = useState({})
    const [file, setFile] = useState(null)
    const [selectedValue, setSelectedValue] = useState([])
    const [othersBoolean, setOtherBoolean] = useState(false)
    const [text, setText] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        alternatephone: "",
        lookingfor: "",
        projectcapacity: "",
        utilitybill: "",
        assignto: "",
        supply: "",
        rooftype: "",
        floor: "",
        remarks: "",
        buyingoptions: "",
        followsup1: "",
        followsup2: "",
        street: "",
        state: "",
        city: "",
        addressline: "",
        postcode: "",
        country: ""
    })

    const { firstname, lastname, phone, email, city, alternatephone, lookingfor, projectcapacity, utilitybill, assignto, supply, rooftype, floor, remarks, buyingoptions, followsup1, followsup2, addressline, country, postcode, state, street } = text

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
        if (rooftype === 'Others') {
            return setOtherBoolean(true)
        }
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const handleSelectInstaller = (userId) => {

        let installerElectricianId = [selectedValue, userId]
        setSelectedValue(installerElectricianId)
        if (installerElectricianId.length > 2) {
            let arrayToString = installerElectricianId.toString().split(',').join(', ')
            setSelectedValue(arrayToString)
            return
        }
    }

    const registerCustomer = async (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait')
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            {
                file !== null ? formdata.append("profile_pic", file) : null
            }
            formdata.append("alternate_phone", alternatephone);
            formdata.append("looking_for", lookingfor);
            formdata.append("project_capacity", projectcapacity);
            formdata.append("utility_bill", utilitybill);
            formdata.append("assign_to", selectedValue);
            formdata.append("supply", supply);
            formdata.append("roof_type", rooftype);
            formdata.append("floor", floor);
            formdata.append("remarks", remarks);
            formdata.append("buying_options", buyingoptions);
            formdata.append("follows_up_1", followsup1);
            formdata.append("follows_up_2", followsup2);
            formdata.append("street", street);
            formdata.append("state", state);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("postcode", postcode);
            formdata.append("country", country);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/register/?user_type=CUSTOMER", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if(result?.message === 'success'){
                        setText(prev => prev !== "" ? "" : "")
                        toast.update(loadingId, { render: "Customer Registered successfully", autoClose: true, type: 'success', isLoading: false })
                        setShowForm(false)
                        return fetchData()
                    }
                    return toast.update(loadingId, { render: result?.message, autoClose: true, type: 'warning', isLoading: false })
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/get_customer_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setCustomerList(result)
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
                    console.log('installer', result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const getDetails = async () => {
        const requestInverter = await fetchRequest(cookies.Authorization, 'https://solar365.co.in/inverter_module/')
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


    useEffect(() => {
        const subscribe = fetchData()
        const subscribe2 = fetchGetInstaller()

        return () => [subscribe, subscribe2]
    }, [])


    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <AdminSideNavigation />
                </div>
                <div style={{ width: '100%', padding: '20px 10px' }}>
                    <Button title="Create New Customer" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} />
                    <ul className="responsive-table">
                        <li className="table-header py-2">
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Email</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Mobile</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">City / State</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Apporved Status</div>
                        </li>
                        {
                            customerList?.map((ele, idx) => {
                                return (
                                    <Link to="/admin/customer-profile" state={{ ele }}>
                                        <li className="table-row py-2" key={idx}>
                                            <div className={`col col-2 text-center`}>{ele?.to_address?.user?.first_name}</div>
                                            <div className={`col col-2 text-center`}>{ele?.to_address?.user?.email}</div>
                                            <div className={`col col-2 text-center`}>{ele?.to_address?.user?.phone}</div>
                                            <div className={`col col-2 text-center`}>{ele?.to_address?.city} / {ele?.to_address?.state}</div>
                                            <div className={`col col-2 text-center`}>{ele?.to_address?.user?.user_type}</div>
                                            <div className={`col col-2 text-center`}>{ele?.to_address?.user?.has_approve === false ? 'Not Approved' : 'Approved'}</div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
                {
                    showForm &&
                    <div style={{ width: "100%", display: 'flex', position: 'absolute', background: 'white', justifyContent: "center", alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            <Heading heading="Create or Register Customer" size="36px" weight="600" />
                        </div>
                        <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={registerCustomer}>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                                <Input placeholder="First name" onChange={handleChange} value={firstname} name="firstname" required={true} />
                                <Input placeholder="Last name" onChange={handleChange} value={lastname} name="lastname" required={true} />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Phone Number" onChange={handleChange} value={phone} name="phone" required={true} />
                                <Input placeholder="Email" onChange={handleChange} value={email} name="email" required={true} />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                {/*<UploadFile id="profilepic" name="profilepic" onchange={handlefile} label="Profile Pic" width="100%" />
                <Input type="file" placeholder="Profile" onChange={handleChange} value={alternatephone} name="alternatephone" required={true}/>*/}
                                <Input placeholder="Alternate Phone" onChange={handleChange} value={alternatephone} name="alternatephone" required={true} />
                                <Input placeholder="Looking For" onChange={handleChange} value={lookingfor} name="lookingfor" required={true} />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Project Capacity" onChange={handleChange} value={projectcapacity} name="projectcapacity" required={true} />
                                <Input placeholder="Utility Bill" onChange={handleChange} value={utilitybill} name="utilitybill" width="50%" required={true} />
                            </div>

                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                {/*<select name='supply' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} value={supply} onChange={handleChange}  >
                                    <option>Select Supply</option>
                                    <option value="Single Phase">Single Phase</option>
                                    <option value="Double Phase">Double Phase</option>
                                    <option value="Three Phase">Three Phase</option>
                                    </select>*/}
                                <Input placeholder="Remarks" onChange={handleChange} value={remarks} name="remarks" required={true} />
                                <select name='buyingoptions' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} value={buyingoptions} onChange={handleChange} required>
                                    <option value="">Choose Buying Option</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="Paypal">Paypal</option>
                                    <option value="Online Transfer">Online Transfer</option>
                                </select>
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                {/*<select name='floor' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} value={floor} onChange={handleChange}  >
                                    <option>Select Floor Type</option>
                                    <option value="Ground Floor">Ground Floor</option>
                                    <option value="First Floor">First Floor</option>
                                    <option value="Second Floor">Second Floor</option>
                                    <option value="More">More</option>
                                </select>*/}
                                {/*<select name='rooftype' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} value={rooftype} onChange={handleChange}  >
                                    <option>Select Roof Type</option>
                                    <option value="Tin">Tin</option>
                                    <option value="Tilt">Tilt</option>
                                    <option value="Tile">Tile</option>
                                    <option value="Colorbond">Colorbond</option>
                                    <option value="Others">
                                        Others
                                    </option>
                                    </select>*/}

                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>

                                <select name='followsup1' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} value={followsup1} onChange={handleChange}  >
                                    <option value="">Select Lead Type</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Google">Google</option>
                                    <option value="Direct Call">Direct Call</option>
                                    <option value="Refrence">Refrence</option>
                                </select>
                                <Input placeholder="Follow up 2" onChange={handleChange} value={followsup2} name="followsup2" required={true} />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Address Line" onChange={handleChange} value={addressline} name="addressline" required={true} />
                                <Input placeholder="Street" onChange={handleChange} value={street} name="street" required={true} />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="City" onChange={handleChange} value={city} name="city" required={true} />
                                <Input placeholder="State" onChange={handleChange} value={state} name="state" required={true} />
                                {/*<select name='state' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} value={state} onChange={handleChange} required>
                                    <option value="" selected>Select State</option>
                                    <option value="Queensland">Queensland</option>
                                    <option value="New South Wales">New South Wales</option>
                                    <option value="Victoria">Victoria</option>
                                    <option value="Western Australia">Western Australia</option>
                                </select>*/}
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Postcode" onChange={handleChange} value={postcode} name="postcode" required={true} />
                                <Input placeholder="Country" onChange={handleChange} value={country} name="country" required={true} />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Button title="Submit" background="orange" type="submit" />
                                <Button title="Close" background="lightgray" onclick={() => setShowForm(false)} margin="0 10px" />
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Customer