import React, { useState } from 'react'
import FormInput from '../../components/inputsfield/FormInput'

import Button from "../../components/Button/Button";

import Heading from "../../components/heading/Heading"
import { useCookies } from 'react-cookie';
import Input from '../../components/inputsfield/Input';
// import AdminSideNavigation from '../admin/menu/AdminSideNavigation';

function NonAdminRegisterForm() {

    const [cookies] = useCookies()

    const [file, setFile] = useState(null)

    const [value, setValue] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        alternatephone: "",
        abnnumber: "",
        acnnumber: "",
        companyname: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: "",
        installationPrice: ""
    })

    const { abnnumber, acnnumber,installationPrice, firstname, lastname, phone, email,  alternatephone, companyname, addressline, street, city, state, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
    }

    const registerNonAdmin = async () => {
        try {

            const formdata = new FormData()
            formdata.append("first_name", firstname)
            formdata.append("last_name", lastname)
            formdata.append("phone", phone)
            formdata.append("email", email)
            formdata.append("profile_pic", file)
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
            formdata.append("installation_price", installationPrice);


            const myheaders = new Headers();
            myheaders.append('Authorization', `Token ${cookies.Authorization}`);

            const res = await fetch(url, {
                method: "POST",
                headers: myheaders,
                body: formdata
            })

            const data = await res.json()

            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', background: 'linear-gradient(45deg,#32de84, #E6E6FA)' }}>
            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', background: 'transparent' }}>
                <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Heading heading="Sign up company" size="36px" weight="600" />
                </div>
                <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', background: 'transparent' }} onSubmit={registerNonAdmin}>
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
                        <Input placeholder="Alternate_phone..." onChange={handleChange} value={alternatephone} name="alternatephone" />
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                        <Input placeholder="Companyname..." onChange={handleChange} value={companyname} name="companyname" />
                        <Input placeholder="ABN Number..." onChange={handleChange} value={abnnumber} name="abnnumber" />
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                        <Input placeholder="ACN Number..." onChange={handleChange} value={acnnumber} name="acnnumber" />
                        <Input placeholder="Installation Price" onChange={handleChange} value={installationPrice} name="installationPrice" />
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                        <Input placeholder="Address_line..." onChange={handleChange} value={addressline} name="addressline" />
                        <Input placeholder="Street..." onChange={handleChange} value={street} name="street" />
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                        <Input placeholder="City..." onChange={handleChange} value={city} name="city" />
                        <Input placeholder="State..." onChange={handleChange} value={state} name="state" />
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                        <Input placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                        <Input placeholder="Country..." onChange={handleChange} value={country} name="country" />
                    </div>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                        <Button title="Submit" background="orange" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NonAdminRegisterForm