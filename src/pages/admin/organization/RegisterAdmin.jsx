import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import UploadFile from '../../../components/inputsfield/UploadFile';
import Input from '../../../components/inputsfield/Input';
import { toast } from 'react-toastify';
import BarLoader from '../../../components/BarLoader/BarLoader';
import { Link } from 'react-router-dom';


function RegisterAdmin() {

    const [cookies] = useCookies();

    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [adminList, setAdminList] = useState([])
    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        isStaff: "",
        isSuper: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: "Australia"
    })

    const { firstname, lastname, phone, email, isStaff, isSuper, addressline, street, city, state, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait....')
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            // formdata.append("profile_pic", file);
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
                .then(result => {
                    console.log(result)
                    if (result?.messsage === "Success") {
                        toast.update(loadingId, { render: 'Admin Created successfully', isLoading: false, type: 'success', autoClose: true })
                        setShowForm(false)
                        setValue(prev => prev !== "" ? "" : "")
                        return fetchData()
                    }
                    return toast.update('Please try agian...!', { isLoading: false, type: 'warning', autoClose: true })
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = () => {
        try {
            setLoading(true)
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
                    setLoading(false)
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
                <Button title="Create New Admin" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} />
                {
                    loading ? <BarLoader /> :
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Name</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Email</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Mobile</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">City / State</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Type</div>
                                {/*<div className="col col-2 text-center text-slate-50 text-base font-bold">Apporved Status</div>*/}
                            </li>
                            {
                                adminList?.map((ele, idx) => {
                                    return (
                                        <Link to="/admins-profile" state={{ele}}>
                                            <li className="table-row py-3" key={idx}>
                                                <div className={`col col-2 text-center`}>{ele.user.first_name}</div>
                                                <div className={`col col-2 text-center`}>{ele.user.email}</div>
                                                <div className={`col col-2 text-center`}>{ele.user.phone}</div>
                                                <div className={`col col-2 text-center`}>{ele.city} / {ele.state}</div>
                                                <div className={`col col-2 text-center`}>{ele.user.user_type}</div>
                                                {/*<div className={`col col-2 text-center`}>{ele.user.has_approve === false ? 'Not Approved' : 'Approved'}</div>*/}
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                }
            </div>
            {
                showForm &&
                <div style={{ width: "100%", position: 'absolute', margin: '20px 20px', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', background: 'white' }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Heading heading="Create or Register Admin" size="36px" weight="600" />
                    </div>
                    <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={register}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                            <Input placeholder="First name" onChange={handleChange} value={firstname} name="firstname" />
                            <Input placeholder="Last name" onChange={handleChange} value={lastname} name="lastname" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Phone Number" onChange={handleChange} value={phone} name="phone" />
                            <Input placeholder="Email" onChange={handleChange} value={email} name="email" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input type="file" onChange={handlefile} placeholder="Profile Photo" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <select value={isStaff} name="isStaff" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} >
                                <option>Is Staff</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            <select value={isSuper} name="isSuper" onChange={handleChange} style={{ width: '100%', padding: '5px 10px', border: '2px solid gray', margin: '0 4px' }} >
                                <option>Is Superuser</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Address_line" onChange={handleChange} value={addressline} name="addressline" />
                            <Input placeholder="City" onChange={handleChange} value={city} name="city" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Street" onChange={handleChange} value={street} name="street" />
                            <select name='state' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray' }} value={state} onChange={handleChange}  >
                                <option selected>Select State</option>
                                <option value="Queensland">Queensland</option>
                                <option value="New South Wales">New South Wales</option>
                                <option value="Victoria">Victoria</option>
                                <option value="Western Australia">Western Australia</option>
                            </select>
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Postcode" onChange={handleChange} value={postcode} name="postcode" />
                            <Input placeholder="Country" onChange={handleChange} value={country} name="country" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Button title="Submit" background="orange" type="submit" />
                            <Button title="Close" background="lightgray" margin="0 10px" onclick={() => setShowForm(false)} />
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default RegisterAdmin