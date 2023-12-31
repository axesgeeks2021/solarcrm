import React, { useState } from 'react'
import Heading from '../../components/heading/Heading'
import Input from '../../components/inputsfield/Input'
import Button from '../../components/Button/Button'

function RegisterProfile() {

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
            {
                file !== null ? formdata.append("profile_pic", file) : null
            }
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
            if (data?.message === 'success') {
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
                toast.update(loadingId, { render: "Non Admin Created Successfully...", isLoading: false, type: 'success', autoClose: true })
                return fetchData()
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div style={{ background: 'linear-gradient(45deg, #B77DDE, #9A48D0)', width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', position: 'absolute' }}>
                <div style={{ width: "95%", display: 'flex', justifyContent: "center", alignItems: 'center', background: 'linear-gradient(45deg, #ECE5F0, #eee)',margin: '10px 10px', boxShadow: '2px 2px 10px 0 rgba(0,0,0,0.3)', borderRadius: '4px'}}>
                    <Heading heading="Create or Register Non Admin" size="36px" weight="600" color="#9A48d0"/>
                </div>
                <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center',background: 'transparent' }} onSubmit={registerNonAdmin}>
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
                        <Button title="Submit" background="orange" type="submit" />
                        <Button title="Close" background="lightgray" onclick={() => setShowForm(false)} margin="0 10px" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterProfile
