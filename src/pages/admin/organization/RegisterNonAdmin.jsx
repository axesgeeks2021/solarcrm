import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Input from '../../../components/inputsfield/Input';



function RegisterNonAdmin() {

    const [cookies] = useCookies();

    const [showForm, setShowForm] = useState(false)

    const [nonAdminList, setNonAdminList] = useState([])

    const [file, setFile] = useState(null)

    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        alternatephone: "",
        abnnumber: "",
        acnnumber: "",
        companyname: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: ""
    })

    const { abnnumber, acnnumber, firstname, lastname, phone, email, address, alternatephone, companyname, addressline, street, city, state, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const registerNonAdmin = async (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading("Please wait....")
            const formdata = new FormData()
            formdata.append("first_name", firstname)
            formdata.append("last_name", lastname)
            formdata.append("phone", phone)
            formdata.append("email", email)
            // formdata.append("profile_pic", file)
            formdata.append("address", address)
            formdata.append("alternate_phone", alternatephone)
            formdata.append("abnnumber", abnnumber)
            formdata.append("acnnumber", acnnumber)
            formdata.append("company_name", companyname)
            formdata.append("address_line", addressline)
            formdata.append("street", street)
            formdata.append("city", city)
            formdata.append("state", state)
            formdata.append("postcode", postcode)
            formdata.append("country", country)

            const url = "https://solar365.co.in/register/?user_type=NON_ADMIN"

            const myheaders = new Headers();
            myheaders.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                method: "POST",
                headers: myheaders,
                body: formdata
            })

            
            const data = await res.json()
            if(data?.messsage === 'Success'){
                setValue({
                    firstname: "",
                    lastname: "",
                    phone: "",
                    email: "",
                    address: "",
                    alternatephone: "",
                    abnnumber: "",
                    acnnumber: "",
                    companyname: "",
                    addressline: "",
                    city: "",
                    state: "",
                    street: "",
                    postcode: "",
                    country: ""
                })
                toast.update(loadingId, {render: "Non Admin Created Successfully...", isLoading: false, type: 'success', autoClose: true})
                return fetchData()
            }
            console.log(data)
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

            fetch("https://solar365.co.in/get_none_admin_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setNonAdminList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchData()

        return () => subscribe
    }, [])

    return (
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
            <div>
                <AdminSideNavigation />
            </div>
            <div style={{ width: '100%', padding: '20px 10px' }}>
                <Button title="Create New Non Admin" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} />
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Name</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Company</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Mobile</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">City / State</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Type</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Apporved Status</div>
                    </li>
                    {
                        nonAdminList?.map((ele, idx) => {
                            return (
                                <li className="table-row" key={idx}>
                                    <div className={`col col-2 text-center`}>{ele.admin.user.first_name}</div>
                                    <div className={`col col-2 text-center`}>{ele.company_name}</div>
                                    <div className={`col col-2 text-center`}>{ele.admin.user.phone}</div>
                                    <div className={`col col-2 text-center`}>{ele.admin.city} / {ele.admin.state}</div>
                                    <div className={`col col-2 text-center`}>{ele.admin.user.user_type}</div>
                                    <div className={`col col-2 text-center`}>{ele.admin.user.has_approve === false ? 'Not Approved' : 'Approved'}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showForm &&
                <div style={{background: '#fff', width: "100%",display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', position: 'absolute' }}>
                <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Heading heading="Create or Register Non Admin" size="36px" weight="600" />
                    </div>
                    <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={registerNonAdmin}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                            <Input placeholder="First name..." onChange={handleChange} value={firstname} name="firstname" />
                            <Input placeholder="Last name..." onChange={handleChange} value={lastname} name="lastname" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Phone Number..." onChange={handleChange} value={phone} name="phone" />
                            <Input placeholder="Email..." onChange={handleChange} value={email} name="email" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Profile Photo..." type="file" onChange={handlefile} name="profilepic" />
                            <Input placeholder="Address..." onChange={handleChange} value={address} name="address" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Alternate_phone..." onChange={handleChange} value={alternatephone} name="alternatephone" />
                            <Input placeholder="Companyname..." onChange={handleChange} value={companyname} name="companyname" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="ABN Number..." onChange={handleChange} value={abnnumber} name="abnnumber" />
                            <Input placeholder="ACN Number..." onChange={handleChange} value={acnnumber} name="acnnumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Address_line..." onChange={handleChange} value={addressline} name="addressline" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Street..." onChange={handleChange} value={street} name="street" />
                            <Input placeholder="City..." onChange={handleChange} value={city} name="city" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="State..." onChange={handleChange} value={state} name="state" />
                            <Input placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Country..." onChange={handleChange} value={country} name="country" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Button title="Submit" background="orange" type="submit"/>
                            <Button title="Close" background="lightgray"  onclick={() => setShowForm(false)} margin="0 10px"/>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default RegisterNonAdmin