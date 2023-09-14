import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";
import { useEffect } from 'react';


function RegisterAdmin() {

    const [cookies] = useCookies();


    const [file, setFile] = useState()

    const [showForm, setShowForm] = useState(false)

    const [adminList, setAdminList] = useState([])

    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        isStaff: "",
        isSuper: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: ""
    })

    const { firstname, lastname, phone, email, address, isStaff, isSuper, addressline, street, city, state, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            formdata.append("profile_pic", file);
            formdata.append("address", address);
            formdata.append("is_staff", isStaff);
            formdata.append("is_superuser", isSuper);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("street", street);
            formdata.append("postcode", postcode);
            formdata.append("country", country);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/register/?user_type=ADMIN", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/get_admin_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setAdminList(result)
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
                <Button title="Create New Admin" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)}/>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Name</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Email</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Mobile</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">City / State</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Type</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Apporved Status</div>
                    </li>
                    {
                        adminList?.map((ele, idx) => {
                            return(
                                <li className="table-row" key={idx}>
                                <div className={`col col-2 text-center`}>{ele.user.first_name}</div>
                                <div className={`col col-2 text-center`}>{ele.user.email}</div>
                                <div className={`col col-2 text-center`}>{ele.user.phone}</div>
                                <div className={`col col-2 text-center`}>{ele.city} / {ele.state}</div>
                                <div className={`col col-2 text-center`}>{ele.user.user_type}</div>
                                <div className={`col col-2 text-center`}>{ele.user.has_approve === false ? 'Not Approved' : 'Approved'}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showForm &&
                <div style={{ width: "100%", position: 'absolute', margin: '20px 20px', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', background: 'white' }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Heading heading="Create or Register Admin" size="36px" weight="600" />
                    </div>
                    <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={register}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                            <FormInput placeholder="First name..." onChange={handleChange} value={firstname} name="firstname" />
                            <FormInput placeholder="Last name..." onChange={handleChange} value={lastname} name="lastname" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Phone Number..." onChange={handleChange} value={phone} name="phone" />
                            <FormInput placeholder="Email..." onChange={handleChange} value={email} name="email" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Profile Photo..." type="file" onChange={handlefile} />
                            <FormInput placeholder="Address..." onChange={handleChange} value={address} name="address" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Is-Staff..." onChange={handleChange} value={isStaff} name="isStaff" />
                            <FormInput placeholder="Is_Superuser..." onChange={handleChange} value={isSuper} name="isSuper" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Address_line..." onChange={handleChange} value={addressline} name="addressline" />
                            <FormInput placeholder="City..." onChange={handleChange} value={city} name="city" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="State..." onChange={handleChange} value={state} name="state" />
                            <FormInput placeholder="Street..." onChange={handleChange} value={street} name="street" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                            <FormInput placeholder="Country..." onChange={handleChange} value={country} name="country" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Button title="Submit" background="orange" />
                            <Button title="Close" background="lightgray" margin="0 10px" onclick={() => setShowForm(false)}/>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default RegisterAdmin