import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from 'react-icons/bi'
import Button from '../../../components/Button/Button'
import Input from '../../../components/inputsfield/Input'
import Heading from '../../../components/heading/Heading'
import { toast } from 'react-toastify'
import BarLoader from '../../../components/BarLoader/BarLoader'

function AdminsProfile() {

    const location = useLocation()
    const navigate = useNavigate()
    const [cookies] = useCookies()
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [file, setFile] = useState(null)
    const [deletePopup, setDeletePopup] = useState(false)
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

            fetch(`https://solar365.co.in/get_admin_profile/${location?.state?.ele?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log('profile', result)
                    return setProfile(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const updateProfile = (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait....')
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            const formdata = new FormData();
            formdata.append("first_name", firstname !== "" ? firstname : profile?.user?.first_name);
            formdata.append("last_name", lastname !== "" ? lastname : profile?.user?.last_name);
            // formdata.append("phone", phone !== "" ? phone : profile?.user?.phone);
            // formdata.append("email", email !== "" ? email : profile?.user?.email);
            // formdata.append("profile_pic", file === null ? profile?.user?.profile_pic : file);
            formdata.append("address_line", addressline !== "" ? addressline : profile?.address_line);
            formdata.append("city", city !== "" ? city : profile?.city);
            formdata.append("state", state !== "" ? state : profile?.state);
            formdata.append("street", street !== "" ? street : profile?.street);
            formdata.append("postcode", postcode !== "" ? postcode : profile?.postcode);
            formdata.append("country", country !== "" ? country : profile?.country);


            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_profile/${location?.state?.ele?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result?.error === true) {
                        return toast.update(loadingId, { render: 'Please try again...', isLoading: false, autoClose: true, type: 'error' })
                    }
                    if (result?.status === true) {
                        toast.update(loadingId, { render: 'Updated successfully...', isLoading: false, autoClose: true, type: 'success' })
                        setShowForm(false)
                        setValue(prev => prev !== "" ? "" : "")
                        return fetchData()
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const deleteRecord = () => {
        try {
            const loadingId = toast.loading('Please wait...')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/register/${location?.state?.ele?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result?.message === "success") {
                        toast.update(loadingId, { render: "user deleted successfully...", isLoading: false, autoClose: true, type: 'success' })
                        return navigate('/register-admin')
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        removeCookies('Authorization')
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
                    <Button title="Delete Profile" background="orange" color="#fff" onclick={() => setDeletePopup(true)} />
                </div>
                <div className="completejobs__box">
                    <div className="header">
                        <p>Personal Details</p>
                    </div>
                    <div className='content'>
                        <div>
                            <p>Username: {profile?.user?.username}</p>
                            <p>Password: {profile?.user?.pin}</p>
                        </div>
                        <div>
                            <p>Name: {profile?.user?.first_name} {profile?.user?.last_name}</p>
                            <p>Email: {profile?.user?.email}</p>
                        </div>
                        <div>
                            <p>Phone: {profile?.user?.phone}</p>
                            <p>Address: {profile?.address_line}</p>
                        </div>
                        <div>
                            <p>City: {profile?.city}</p>
                            <p>State: {profile?.state?.toUpperCase()}</p>
                        </div>
                        <div>
                            <p>Country: {profile?.country?.toUpperCase()}</p>
                            <p>Department: {profile?.user?.department}</p>
                        </div>
                        <div>
                            <p>User Type: {profile?.user?.user_type}</p>
                        </div>
                    </div>
                </div>
            </div>

            {
                showForm &&
                <div style={{ width: "100%", position: 'absolute', margin: '20px 20px', display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', background: 'white' }}>
                    <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Heading heading="Create or Register Admin" size="36px" weight="600" />
                    </div>
                    <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={updateProfile}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                            <Input placeholder="First name" onChange={handleChange} value={firstname} name="firstname" />
                            <Input placeholder="Last name" onChange={handleChange} value={lastname} name="lastname" />
                        </div>
                        {/*<div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="Phone Number" onChange={handleChange} value={phone} name="phone" />
                            <Input placeholder="Email" onChange={handleChange} value={email} name="email" />
            </div>*/}
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input type="file" onChange={handlefile} placeholder="Profile Photo" />
                        </div>
                        {/*<div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
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
    </div>*/}
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

export default AdminsProfile
