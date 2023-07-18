import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"

import AdminSideNavigation from '../menu/AdminSideNavigation';

import { useCookies } from "react-cookie";
import { useEffect } from 'react';



function RegisterTeam() {

    const [cookies] = useCookies();


    const [installerList, setInstallerList] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [file, setFile] = useState()

    const [file2, setFile2] = useState()
    const [file3, setFile3] = useState()

    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        address: "",
        alternatephone: "",
        department: "",
        ecfile: "",
        ecnumber: "",
        elfile: "",
        elnumber: "",
        abnnumber: "",
        acnnumber: "",
        tfnnumber: "",
        addressline: "",
        street: "",
        city: "",
        state: "",
        postcode: "",
        country: ""
    })

    const { firstname, lastname, phone, email, address, alternatephone, department, ecfile, ecnumber, elfile, elnumber, abnnumber, acnnumber, tfnnumber, addressline, street, city, state, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }
    const handlefile2 = e => {
        setFile2(e.target.files[0])
    }
    const handlefile3 = e => {
        setFile3(e.target.files[0])
    }


    const registerTeam = async (e) => {
        e.preventDefault();
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
            formdata.append("alternate_phone", alternatephone);
            formdata.append("department", department);
            formdata.append("ec_file", file2);
            formdata.append("ec_number", ecnumber);
            formdata.append("el_file", file3);
            formdata.append("el_number", elnumber);
            formdata.append("abm_number", abnnumber);
            formdata.append("acn_number", acnnumber);
            formdata.append("tfn_number", tfnnumber);
            formdata.append("address_line", addressline);
            formdata.append("street", street);
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("postcode", postcode);
            formdata.append("country", country);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("http://65.0.45.255:8000/register/?user_type=INSTALLER", requestOptions)
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
            myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://65.0.45.255:8000/get_installer_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setInstallerList(result)
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
                <Button title="Create New Installer" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} />
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
                        installerList?.map((ele, idx) => {
                            return (
                                <li className="table-row" key={idx}>
                                    <div className={`col col-2 text-center`}>{ele.admin.user.first_name}</div>
                                    <div className={`col col-2 text-center`}>{ele.admin.user.email}</div>
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
                <div style={{ width: "100%", display: 'flex',position: 'absolute', justifyContent: "center", alignItems: 'center', flexDirection: 'column', background: 'white' }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Heading heading="Create or Register Installer" size="36px" weight="600" />
                    </div>
                    <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={registerTeam}>
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
                            <FormInput placeholder="Alternate_phone..." onChange={handleChange} value={alternatephone} name="alternatephone" />
                            <FormInput placeholder="Department..." onChange={handleChange} value={department} name="department" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Ec_file" onChange={handlefile2} type="file" />
                            <FormInput placeholder="Ec_number..." onChange={handleChange} value={ecnumber} name="ecnumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="El_file..." onChange={handlefile3} type="file" />
                            <FormInput placeholder="El_number..." onChange={handleChange} value={elnumber} name="elnumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Abn_number..." onChange={handleChange} value={abnnumber} name="abnnumber" />
                            <FormInput placeholder="Acn_number..." onChange={handleChange} value={acnnumber} name="acnnumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Tfn_number..." onChange={handleChange} value={tfnnumber} name="tfnnumber" />
                            <FormInput placeholder="Address_line..." onChange={handleChange} value={addressline} name="addressline" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Street..." onChange={handleChange} value={street} name="street" />
                            <FormInput placeholder="City..." onChange={handleChange} value={city} name="city" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="State..." onChange={handleChange} value={state} name="state" />
                            <FormInput placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Country..." onChange={handleChange} value={country} name="country" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Button title="Submit" background="orange" color="white"/>
                            <Button title="Close" background="lightgray"  onclick={() => setShowForm(false)} margin="0 10px"/>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default RegisterTeam