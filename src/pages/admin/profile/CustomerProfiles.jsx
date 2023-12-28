import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from 'react-icons/bi'
import Heading from '../../../components/heading/Heading'
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'

function CustomerProfiles() {

    const [cookies, removeCookies] = useCookies()
    const location = useLocation()
    const navigate = useNavigate()

    const [deletePopup, setDeletePopup] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [profile, setProfile] = useState({})
    const [file, setFile] = useState(null)

    const [text, setText] = useState({
        firstName: profile?.to_address?.user?.last_name,
        lastName: "",
        phone: "",
        email: "",
        alternatePhone: "",
        department: "",
        description: "",
        isOnline: "",
        addressline: "",
        city: "New Delhi",
        state: "",
        street: "",
        postcode: "",
        country: "Australia"
    })

    const { firstName, lastName, phone, email, alternatePhone, department, description, isOnline, addressline, city, state, street, postcode, country } = text

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

    const handlefile = e => {
        setFile(e.target.files[0])
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

            fetch(`https://solar365.co.in/get_customer_profile/${location?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('profile', result)
                    setProfile(result)
                    return
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const updateProfile = (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=cUgWB4OcLyPUQSEUos0sHC7KVzUZXIbT; sessionid=vu7fmb4vs88ceekctto0oyjrtn2h0zl1");

            const formdata = new FormData();
            formdata.append("first_name", firstName !== "" ? firstName : profile?.to_address?.user?.first_name);
            formdata.append("last_name", lastName !== "" ? lastName : profile?.to_address?.user?.last_name);
            formdata.append("address_line", addressline !== "" ? addressline : profile?.to_address?.address_line);
            formdata.append("city", city !== "" ? city : profile?.to_address?.city);
            formdata.append("street", street !== "" ? street : profile?.to_address?.street);
            formdata.append("state", state !== "" ? state : profile?.to_address?.state);
            formdata.append("postcode", postcode !== "" ? postcode : profile?.to_address?.postcode);
            formdata.append("country", country !== "" ? country : profile?.to_address?.country);

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_profile/${location?.state?.ele?.to_address?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('update', result)
                    if (result?.message === 'success') {
                        toast.update(loadingId, { render: 'Updated Successfully...', type: 'success', isLoading: false, autoClose: true })
                        setShowForm(false)
                        setText(prev => prev !== "" ? "" : "")
                        return fetchData()
                    }
                    return toast.update(loadingId, { render: 'Please Try Again', type: 'warning', isLoading: false, autoClose: true })
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }


    const logout = () => {
        removeCookies('Authorization', { path: '/' })
        return navigate('/login')
    }

    useEffect(() => {
        const subscribe = fetchData()

        
        return () => [subscribe]
    }, [])

    return (
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
            {
                deletePopup &&
                <div className='popup__form'>
                    <p style={{ fontSize: '1.2rem' }}>Are you sure want to delete ?</p>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                        <Button title="Confirm" background="green" color="#fff" onclick={deleteRecord} />
                        <Button title="Cancel" background="gray" color="#fff" onclick={() => setDeletePopup(false)} />
                    </div>
                </div>
            }
            <div>
                <AdminSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>

            <div className="container__table completeContainer" style={{ justifyContent: 'flex-start' }}>
                <div style={{ width: '95%', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button title="Update Profile" background="green" color="#fff" onclick={() => setShowForm(true)} />
                    {/*<Button title="Delete Profile" background="orange" color="#fff" onclick={() => setDeletePopup(true)} />*/}
                </div>
                <div className="completejobs__box">
                    <div className="header">
                        <p>Personal Details</p>
                    </div>
                    <div className='content'>
                        <div>
                            <p>Username: {profile?.to_address?.user?.username}</p>
                            <p>Password: {profile?.to_address?.user?.pin}</p>
                        </div>
                        <div>
                            <p>Name: {profile?.to_address?.user?.first_name} {profile?.to_address?.user?.last_name}</p>
                            <p>Email: {profile?.to_address?.user?.email}</p>
                        </div>
                        <div>
                            <p>Phone: {profile?.to_address?.user?.phone}</p>
                            <p>Address: {profile?.to_address?.address_line}</p>
                        </div>
                        <div>
                            <p>City: {profile?.to_address?.city}</p>
                            <p>State: {profile?.to_address?.state?.toUpperCase()}</p>
                        </div>
                        <div>
                            <p>Country: {profile?.to_address?.country?.toUpperCase()}</p>
                            <p>User Type: {profile?.to_address?.user?.user_type}</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                showForm &&
                <div style={{ width: "100%", position: 'absolute', margin: '20px 20px', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', background: 'white' }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Heading heading="Update Profile" size="36px" weight="600" />
                    </div>
                    <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={updateProfile}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                            <Input placeholder="First name" onChange={handleChange} value={firstName} name="firstName" />
                            <Input placeholder="Last name" onChange={handleChange} value={lastName} name="lastName" />
                        </div>
                        {/*<div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                    <Input placeholder="Phone Number" onChange={handleChange} value={phone} name="phone" />
                    <Input placeholder="Email" onChange={handleChange} value={email} name="email" />
    </div>*/}
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input type="file" onChange={handlefile} placeholder="Profile Photo" />
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

export default CustomerProfiles
