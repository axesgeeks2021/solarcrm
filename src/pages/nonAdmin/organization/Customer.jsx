import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import { useCookies } from "react-cookie";
import { useEffect } from 'react';
import NonAdminSideNavigation from '../menu/NonAdminSideNavigation';
import { toast } from 'react-toastify';
import Input from '../../../components/inputsfield/Input';

function Customer() {

    const [cookies] = useCookies();
    const [showForm, setShowForm] = useState(false)
    const [customerList, setCustomerList] = useState([])
    const [file, setFile] = useState(null)
    const [value, setValue] = useState({
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
        addressline: "",
        city: "",
        postcode: "",
        country: ""
    })

    const { firstname, lastname, phone, email, alternatephone, lookingfor, projectcapacity, utilitybill, assignto, supply, rooftype, floor, remarks, buyingoptions, followsup1, followsup2, addressline, city, country, postcode, state, street } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const registerCustomer = async (e) => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            // myHeaders.append("Content-Type", "application/json")

            var formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            // formdata.append("profile_pic", file);
            formdata.append("alternate_phone", alternatephone);
            formdata.append("looking_for", lookingfor);
            formdata.append("project_capacity", projectcapacity);
            formdata.append("utility_bill", utilitybill);
            // formdata.append("assign_to", assignto);
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

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/register/?user_type=CUSTOMER", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.messsage === 'Success'){
                        fetchData()
                        toast.success('Customer created successfully')
                        setShowForm(false)
                        setValue({
                            firstname: "",
                            lastname: "",
                            addressline: "",
                            alternatephone: "",
                            assignto: "",
                            buyingoptions: "",
                            city: "",
                            country: '',
                            email: "",
                            floor: '',
                            followsup1: '',
                            followsup2: '',
                            lookingfor: "",
                            phone: '',
                            postcode: "",
                            projectcapacity: "",
                            remarks: "",
                            rooftype: '',
                            state: "",
                            street: '',
                            supply: '',
                            utilitybill: ''
                        })
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

            fetch("https://solar365.co.in/cust-profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('customer resutl',result)
                    setCustomerList(result)
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
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <NonAdminSideNavigation />
                </div>
                {/* <div style={{ width: '100%', padding: '20px 10px' }}>
                    <Button title="Create New Customer" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} />
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
                            customerList?.map((ele, idx) => { 
                                return (
                                    <li className="table-row" key={idx}>
                                        <div className={`col col-2 text-center`}>{ele?.to_address?.user?.first_name}</div>
                                        <div className={`col col-2 text-center`}>{ele?.to_address?.user?.email}</div>
                                        <div className={`col col-2 text-center`}>{ele?.to_address?.user?.phone}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.city} / {ele.admin.state}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.user_type}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.has_approve === false ? 'Not Approved' : 'Approved'}</div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div> */}
                <div class="container__table">
            <div className='py-2 flex justify-end'>
                    <Button title="Create Customer" background="green" color="white" onclick={() => setShowForm(!showForm)} />
                </div>
                <table class="responsive-table">
                    {/* <caption>Top 10 Grossing Animated Films of All Time</caption> */}
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">City / State</th>
                            <th scope="col">NMI</th>
                            <th scope="col">Apporved Status</th>
                            {/* <th scope="col">Budget</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerList.length < 1 ? <h2>There is no order available right now...</h2> : customerList.map((ele, idx) => {
                                return (
                                    // <Link to="/non-admin/orders" state={{ ele }} key={idx}>
                                        <tr>
                                            <th scope="row">{ele?.to_address?.user?.first_name}</th>
                                            <td data-title="Released">{ele?.to_address?.user?.email}</td>
                                            <td data-title="Studio">{ele?.to_address?.user?.phone}</td>
                                            <td data-title="Worldwide Gross" data-type="currency">{ele?.to_address?.city} {ele?.to_address?.state} {ele?.to_address?.country} {ele?.to_address?.postcode}</td>
                                            <td data-title="Domestic Gross" data-type="currency">{ele.nmi_no}</td>
                                            <td data-title="International Gross" data-type="currency">
                                            <Button title="In Process" background="green" color="white"  />
                                            </td>
                                            {/* <td data-title="Budget" data-type="currency">$260,000,000</td> */}
                                        </tr>
                                    // </Link>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
                {
                    showForm &&
                    <div style={{ width: "100%", display: 'flex', position: 'absolute', background: 'white', justifyContent: "center", alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            <Heading heading="Create or Register Customer" size="36px" weight="600" />
                        </div>
                        <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={registerCustomer}>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                                <Input placeholder="First name..." onChange={handleChange} value={firstname} name="firstname" />
                                <Input placeholder="Last name..." onChange={handleChange} value={lastname} name="lastname" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Phone Number..." onChange={handleChange} value={phone} name="phone" />
                                <Input placeholder="Email..." onChange={handleChange} value={email} name="email" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Enter your document file..." onChange={handlefile} type="file" />
                                <Input placeholder="Alternate Phone..." onChange={handleChange} value={alternatephone} name="alternatephone" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Looking For..." onChange={handleChange} value={lookingfor} name="lookingfor" />
                                <Input placeholder="Project Capacity..." onChange={handleChange} value={projectcapacity} name="projectcapacity" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Utility Bill" onChange={handleChange} value={utilitybill} name="utilitybill" />
                                {/* <Input placeholder="Assign To..." onChange={handleChange} value={assignto} name="assignto" /> */}
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Supply..." onChange={handleChange} value={supply} name="supply" />
                                <Input placeholder="Roof Type..." onChange={handleChange} value={rooftype} name="rooftype" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Floor..." onChange={handleChange} value={floor} name="floor" />
                                <Input placeholder="Remarks..." onChange={handleChange} value={remarks} name="remarks" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Buying Options..." onChange={handleChange} value={buyingoptions} name="buyingoptions" />
                                <Input placeholder="Follows up 1..." onChange={handleChange} value={followsup1} name="followsup1" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Follow up 2..." onChange={handleChange} value={followsup2} name="followsup2" />
                                <Input placeholder="Street..." onChange={handleChange} value={street} name="street" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="State..." onChange={handleChange} value={state} name="state" />
                                <Input placeholder="Address Line..." onChange={handleChange} value={addressline} name="addressline" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="City..." onChange={handleChange} value={city} name="city" />
                                <Input placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Input placeholder="Country..." onChange={handleChange} value={country} name="country" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Button title="Submit" type="submit" background="orange" />
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