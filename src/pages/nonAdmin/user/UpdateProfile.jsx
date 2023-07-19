import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'

import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'
import AdminSideNavigation from '../menu/NonAdminSideNavigation'

import { useCookies } from "react-cookie";


function UpdateProfile() {

    const [cookies] = useCookies();

    const [display, setDisplay] = useState({
        admin: false,
        nonAdmin: false,
        team: false,
        installer: false,
        customer: false
    })

    const [id, setId] = useState(0)

    const displayAdminForm = () => {
        setDisplay({ admin: true })
        setId(1)
    }
    const displayNonAdminForm = () => {
        setDisplay({ nonAdmin: true })
        setId(2)
    }
    const displayInstallerForm = () => {
        setDisplay({ installer: true })
        setId(3)
    }
    const displayTeamForm = () => {
        setDisplay({team: true })
        setId(4)
    }
    const displayCustomerForm = () => {
        setDisplay({ customer: true })
        setId(5)
    }
    

    const [file, setFile] = useState()
    const [file2, setFile2] = useState()
    const [file3, setFile3] = useState()
    const [loading, setLoading] = useState(false)

    const handleFile = e => {
        setFile(e.target.files[0])
    }
    const handleFile2 = e => {
        setFile2(e.target.files[0])
    }
    const handleFile3 = e => {
        setFile3(e.target.files[0])
    }

    const [value, setValue] = useState({
        firstname: '',
        lastname: "",
        phone: "",
        email: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: "",
        alternatenumber: "",
        description: "",
        isOnline: "",
        department: "",
        ecfile: "",
        ecnumber: "",
        elnumber: "",
        abmnumber: "",
        acnnummber: "",
        tfnnumber: "",
        companyname: "",
        rooftype: "",
        floor: "",
        remarks:"",
        buyingoptions: ""
    })

    const {abmnumber,   acnnummber,alternatenumber,buyingoptions,companyname,department,description,ecfile,ecnumber,elnumber,floor,isOnline,remarks,rooftype,tfnnumber, firstname, lastname, phone, email, addressline, city, state, street, postcode, country } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const updateProfile = async () => {
        try {
            setLoading(true)
            let myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            let formdata = new FormData();
            formdata.append("first_name", firstname);
            formdata.append("last_name", lastname);
            formdata.append("phone", phone);
            formdata.append("email", email);
            formdata.append("profile_pic", file);
            formdata.append("address_line", addressline);
            formdata.append("city", city);
            formdata.append("state", state);
            formdata.append("street", street);
            formdata.append("postcode", postcode);
            formdata.append("country", country);

            formdata.append("alternate_phone", alternatenumber);
            formdata.append("description", description);
            formdata.append("is_online", isOnline);

            formdata.append("department", department);
            formdata.append("ec_file",file2);
            formdata.append("ec_number", ecnumber);
            formdata.append("el_file", file3);
            formdata.append("el_number", elnumber);
            formdata.append("abm_number", abmnumber);
            formdata.append("acn_number", acnnummber);
            formdata.append("tfn_number", tfnnumber);

            formdata.append("company_name", companyname);

            formdata.append("roof_type", rooftype);
            formdata.append("floor", floor);
            formdata.append("remarks", remarks);
            formdata.append("buying_options", buyingoptions);

            let requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://65.1.123.138:8000/update_profile/${id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTimeout(() => {
                        setLoading(false)
                        console.log(result)
                    }, 1000);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <>
        <div className='flex'>
            <div>
                <AdminSideNavigation />
            </div>
            <div style={{ width: "100%", display: "flex", height: "100vh", justifyContent: 'space-between', alignItems: "center", flexDirection: 'column' }}>
                <div style={{ width: "100%", height: "20%", display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column' }}>
                    <Heading heading="Update your profile..." size="220%" />
                    <Heading heading="Select one option to update profile..." size="150%" />
                </div>
                <div style={{ width: "100%", height: "80%", display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column', gap: "20px" }}>
                    {/* <Button color="white" background="green" title="Update Admin" onclick={displayAdminForm} /> */}
                    <Button color="white" background="green" title="Update Non Admin" onclick={displayNonAdminForm}/>
                    <Button color="white" background="green" title="Update Team" onclick={displayTeamForm}/>
                    {/* <Button color="white" background="green" title="Update Installer" onclick={displayInstallerForm}/> */}
                    <Button color="white" background="green" title="Update Customer" onclick={displayCustomerForm}/>
                </div>
            </div>
            {
                display.admin &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <Heading heading="Update your Admin profile..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                            <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />

                            <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                            <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplay({ admin: false })} />
                        </div>
                    </form>
                </FormsContainer>
            }
            {
                display.nonAdmin &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <Heading heading="Update your Non Admin profile..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                            <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />
                            <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="Alternate Number" value={alternatenumber} name="alternatenumber" onChange={handleChange} />
                            <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                            <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplay({ admin: false })} />
                        </div>
                    </form>
                </FormsContainer>
            }
            {
                display.team &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <Heading heading="Update your Team profile..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                            <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />

                            <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Alternate Number" value={alternatenumber} name="alternatenumber" onChange={handleChange} />
                            <FormInput placeholder="Description" value={description} name="description" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Is online" value={isOnline} name="isOnline" onChange={handleChange} />
                            <FormInput placeholder="Address Line" value={addressline} name="addressline" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                            <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplay({ admin: false })} />
                        </div>
                    </form>
                </FormsContainer>
            }
            {
                display.installer &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <Heading heading="Update your Installer profile..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                            <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />
                            <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                        <FormInput placeholder="Alternate Number" value={alternatenumber} name="alternatenumber" onChange={handleChange} />
                            <FormInput placeholder="Department" value={department} name="department" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Ec File" type="file" onChange={handleFile2} />
                            <FormInput placeholder="Ec Number" value={ecnumber} name="ecnumber" onChange={handleChange} />
                        <FormInput placeholder="El File" type="file" onChange={handleFile3} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="El Number" value={elnumber} name="elnumber" onChange={handleChange} />
                            <FormInput placeholder="ABM Number" value={abmnumber} name="abmnumber" onChange={handleChange} />
                            <FormInput placeholder="ACN Number" value={acnnummber} name="acnnummber" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="TFN Number" value={tfnnumber} name="tfnnumber" onChange={handleChange} />
                            <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                            <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplay({ admin: false })} />
                        </div>
                    </form>
                </FormsContainer>
            }
            {
                display.customer &&
                <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                        <Heading heading="Update your Customer profile..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px 0' }}>
                            <FormInput placeholder="First Name" value={firstname} name="firstname" onChange={handleChange} />
                            <FormInput placeholder="Last Name" value={lastname} name="lastname" onChange={handleChange} />

                   
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="Phone" value={phone} name="phone" onChange={handleChange} />
                            <FormInput placeholder="Email" value={email} name="email" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <FormInput placeholder="Profile Pic" type="file" onChange={handleFile} />
                        <FormInput placeholder="Alternate Number" value={alternatenumber} name="alternatenumber" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="City" value={city} name="city" onChange={handleChange} />
                            <FormInput placeholder="State" value={state} name="state" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <FormInput placeholder="PostCode" value={postcode} name="postcode" onChange={handleChange} />
                            <FormInput placeholder="Country" value={country} name="country" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="Submit" background="orange" color="white" onclick={updateProfile} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplay({ admin: false })} />
                        </div>
                    </form>
                </FormsContainer>
            }
</div>
        </>
    )
}

export default UpdateProfile