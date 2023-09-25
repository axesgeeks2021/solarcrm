import React, { useState } from 'react'
import FormInput from '../../../components/inputsfield/FormInput'

import Button from "../../../components/Button/Button";

import Heading from "../../../components/heading/Heading"
import AdminSideNavigation from '../menu/AdminSideNavigation';
import { useCookies } from "react-cookie";
import { useEffect } from 'react';

function Customer() {

    const [cookies] = useCookies();

    const [showForm, setShowForm] = useState(false)

    const [customerList, setCustomerList] = useState([])

    const [file, setFile] = useState()

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

    const {firstname, lastname, phone, email,  alternatephone, lookingfor, projectcapacity, utilitybill, assignto, supply, rooftype, floor, remarks, buyingoptions, followsup1, followsup2, addressline, city, country, postcode, state, street} = value

    const handleChange = e => {
        setValue({...value, [e.target.name]: e.target.value})
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const registerCustomer = async (e) => {
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
            formdata.append("alternate_phone", alternatephone);
            formdata.append("looking_for", lookingfor);
            formdata.append("project_capacity", projectcapacity);
            formdata.append("utility_bill", utilitybill);
            formdata.append("assign_to", assignto);
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
                setShowForm(false)
                return fetchData()
              } )
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

    useEffect(() => {
        const subscribe = fetchData()

        return () => subscribe
    }, [])


  return (
    <>
        <div style={{width: "100%", display: 'flex', justifyContent: 'center'}} >
            <div>
                <AdminSideNavigation />
            </div>
            <div style={{ width: '100%', padding: '20px 10px' }}>
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
                                    <div className={`col col-2 text-center`}>{ele?.to_address?.city} / {ele?.to_address?.state}</div>
                                    <div className={`col col-2 text-center`}>{ele?.to_address?.user?.user_type}</div>
                                    <div className={`col col-2 text-center`}>{ele?.to_address?.user?.has_approve === false ? 'Not Approved' : 'Approved'}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showForm && 
            <div  style={{width: "100%", display: 'flex',position: 'absolute', background: 'white',  justifyContent: "center", alignItems: 'center', flexDirection: 'column'}}>
            <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center'}}>
                <Heading heading="Create or Register Customer" size="36px" weight="600"/>
            </div>
            <form style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center'}} onSubmit={registerCustomer}>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row'}}>
                    <FormInput placeholder="First name..." onChange={handleChange} value={firstname} name="firstname"/>
                    <FormInput placeholder="Last name..." onChange={handleChange} value={lastname} name="lastname"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Phone Number..." onChange={handleChange} value={phone} name="phone"/>
                    <FormInput placeholder="Email..." onChange={handleChange} value={email} name="email"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                <FormInput placeholder="Enter your document file..." onChange={handlefile} type="file"/>
                    <FormInput placeholder="Alternate Phone..." onChange={handleChange} value={alternatephone} name="alternatephone"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Looking For..." onChange={handleChange} value={lookingfor} name="lookingfor"/>
                    <FormInput placeholder="Project Capacity..." onChange={handleChange} value={projectcapacity} name="projectcapacity"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Utility Bill" onChange={handleChange} value={utilitybill} name="utilitybill"/>
                    <FormInput placeholder="Assign To..." onChange={handleChange} value={assignto} name="assignto"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Supply..." onChange={handleChange} value={supply} name="supply"/>
                    <FormInput placeholder="Roof Type..." onChange={handleChange} value={rooftype} name="rooftype"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Floor..." onChange={handleChange} value={floor} name="floor"/>
                    <FormInput placeholder="Remarks..." onChange={handleChange} value={remarks} name="remarks"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Buying Options..." onChange={handleChange} value={buyingoptions} name="buyingoptions"/>
                    <FormInput placeholder="Follows up 1..." onChange={handleChange} value={followsup1} name="followsup1"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Follow up 2..." onChange={handleChange} value={followsup2} name="followsup2"/>
                    <FormInput placeholder="Street..." onChange={handleChange} value={street} name="street"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="State..." onChange={handleChange} value={state} name="state"/>
                    <FormInput placeholder="Address Line..." onChange={handleChange} value={addressline} name="addressline"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="City..." onChange={handleChange} value={city} name="city"/>
                    <FormInput placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <FormInput placeholder="Country..." onChange={handleChange} value={country} name="country"/>
                </div>
                <div style={{width: "100%", display: 'flex',  justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px'}}>
                    <Button title="button" background="orange" type="submit"/>
                    <Button title="Close" background="lightgray"  onclick={() => setShowForm(false)} margin="0 10px"/>
                </div>
            </form>
        </div>
            }
        </div>
    </>
  )
}

export default Customer