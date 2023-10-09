import React, { useState, useEffect } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import AdminSideNavigation from '../menu/AdminSideNavigation';
import Loading from '../../../components/loading/Loading';

import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';


function RegisterTeam() {

    const [cookies] = useCookies();

    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const [teamList, setTeamList] = useState([])

    const [file, setFile] = useState()

    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        alternatephone: "",
        department: "",
        description: "",
        isonline: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: ""
    })

    const { firstname, lastname, phone, email, alternatephone, department, description, isonline, addressline, city, state, street, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }


    const registerTeam = async (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please Wait')
            setLoading(true)
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            // formdata.append("profile_pic", file);
            formdata.append("alternate_phone", alternatephone);
            formdata.append("department", department);
            formdata.append("description", description);
            formdata.append("is_online", isonline);
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

            fetch("https://solar365.co.in/register/?user_type=TEAM", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if(result.messsage === "Success"){
                        toast.update(loadingId, {render: "Team member created successfully", autoClose: true, isLoading: false, type: 'success'})
                        setShowForm(false)
                        setValue({
                            addressline: "",
                            alternatephone: "",
                            city: '',
                            country: '',
                            department: '',
                            description: '',
                            email: '',
                            firstname: '',
                            isonline: '',
                            lastname: '',
                            phone: '',
                            postcode: '',
                            state: '',
                            street:''
                        })
                        return fetchData()
                    }

                    if(result.error === true){
                        setLoading(false)
                        return toast.update(loadingId, {render: "Please Try Again!", isLoading: false, autoClose: true, type: 'success'})
                    }
                    console.log(result)
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

            fetch("https://solar365.co.in/get_team_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setTeamList(result)
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

    if (loading) {
        return <Loading />
    }


    return (
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }}>
            <div>
                <AdminSideNavigation />
            </div>
            <div style={{ width: '100%', padding: '20px 10px' }}>
                <Button title="Create New Team" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} />
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
                        teamList?.map((ele, idx) => {
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
                <div style={{ width: "95%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column' , position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.3), -2px -2px 10px 2px rgba(0,0,0,0.3)'}}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', background: 'white' }}>
                        <Heading heading="Create or Register Team" size="36px" weight="600" />
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
                            <FormInput placeholder="Alternate Phone..." onChange={handleChange} value={alternatephone} name="alternatephone" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Department..." onChange={handleChange} value={department} name="department" />
                            <FormInput placeholder="Description..." onChange={handleChange} value={description} name="description" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Is_Online" onChange={handleChange} value={isonline} name="isonline" />
                            <FormInput placeholder="Address_line..." onChange={handleChange} value={addressline} name="addressline" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="City..." onChange={handleChange} value={city} name="city" />
                            <FormInput placeholder="State..." onChange={handleChange} value={state} name="state" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Street..." onChange={handleChange} value={street} name="street" />
                            <FormInput placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <FormInput placeholder="Country..." onChange={handleChange} value={country} name="country" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Button title="Submit" background="orange" type="submit" />
                            <Button title="Close" background="lightgray"  onclick={() => setShowForm(false)} margin="0 10px"/>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default RegisterTeam