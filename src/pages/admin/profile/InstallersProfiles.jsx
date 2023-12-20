import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from 'react-icons/bi'
import Heading from '../../../components/heading/Heading'
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'

function InstallersProfiles() {
    const location = useLocation()
    const navigate = useNavigate()
    const [cookies, removeCookies] = useCookies()
    const [deletePopup, setDeletePopup] = useState(false)
    const [profile, setProfile] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [listOfAvailableDates, setListOfAvailableDates] = useState([])
    const [file, setFile] = useState()
    const [text, setText] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        alternatephone: "",
        description: "",
        isonline: "",
        department: "",
        tfnNumber: "",
        abmNumber: "",
        acnNumber: "",
        ecNumber: "",
        elNumber: "",
        addressline: "",
        city: "",
        state: "",
        street: "",
        postcode: "",
        country: "Australia"
    })

    const { firstname, lastname, phone, email, alternatephone, department, description, isonline, abmNumber, acnNumber, ecNumber, elNumber, tfnNumber, addressline, city, state, street, postcode, country } = text

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

            fetch(`https://solar365.co.in/get_installer_profile/${location?.state?.ele?.admin?.user?.id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('profiles', result)
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
            formdata.append("first_name", firstname !== "" ? firstname : profile?.admin?.user?.first_name);
            formdata.append("last_name", lastname !== "" ? lastname : profile?.admin?.user?.last_name);
            // formdata.append("phone", phone !== "" ? phone : profile?.admin?.user?.phone);
            // formdata.append("email", email !== "" ? email : profile?.admin?.user?.email);
            // formdata.append("profile_pic", file === null ? profile?.admin?.user?.profile_pic : file);
            formdata.append("address_line", addressline !== "" ? addressline : profile?.admin?.address_line);
            formdata.append("city", city !== "" ? city : profile?.admin?.city);
            formdata.append("state", state !== "" ? state : profile?.admin?.state);
            formdata.append("street", street !== "" ? street : profile?.admin?.street);
            formdata.append("postcode", postcode !== "" ? postcode : profile?.admin?.postcode);
            formdata.append("country", country !== "" ? country : profile?.admin?.country);
            formdata.append("department", department !== "" ? department : profile?.department);
            formdata.append("ec_number", ecNumber !== "" ? ecNumber : profile?.ec_number);
            formdata.append("el_number", elNumber !== "" ? elNumber : profile?.el_number);
            formdata.append("abm_number", abmNumber !== "" ? abmNumber : profile?.abm_number);
            formdata.append("acn_number", acnNumber !== "" ? acnNumber : profile?.acn_number);
            formdata.append("tfn_number", tfnNumber !== "" ? tfnNumber : profile?.tfn_number);
            // formdata.append("ec_file", file2)
            // formdata.append("el_file", file3)

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_profile/${location?.state?.ele?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result)
                    if (result?.error === true) {
                        return toast.update(loadingId, { render: 'Please try again...', isLoading: false, autoClose: true, type: 'error' })
                    }
                    if (result?.status === true) {
                        toast.update(loadingId, { render: 'Updated successfully...', isLoading: false, autoClose: true, type: 'success' })
                        setShowForm(false)
                        setText(prev => prev !== "" ? "" : "")
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

            fetch(`https://solar365.co.in/register/${location?.state?.ele?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result?.message === "success") {
                        toast.update(loadingId, { render: "user deleted successfully...", isLoading: false, autoClose: true, type: 'success' })
                        return navigate(-1)
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchLatestAvailability = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/inst-avail/${location?.state?.ele?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('avail', result)
                    setListOfAvailableDates(result)
                    return
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
        const subscribe2 = fetchLatestAvailability()

        return () => [subscribe, subscribe2]
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
                            <p>Username: {profile?.admin?.user?.username}</p>
                            <p>Password: {profile?.admin?.user?.pin}</p>
                        </div>
                        <div>
                            <p>Name: {profile?.admin?.user?.first_name} {profile?.admin?.user?.last_name}</p>
                            <p>Email: {profile?.admin?.user?.email}</p>
                        </div>
                        <div>
                            <p>Phone: {profile?.admin?.user?.phone}</p>
                            <p>TFN Number: {profile?.tfn_number}</p>
                        </div>
                        <div>
                            <p>ABM Number: {profile?.abm_number}</p>
                            <p>ACN Number: {profile?.acn_number}</p>
                        </div>
                        <div>
                            <p>EC Number: {profile?.ec_number}</p>
                            <p>EL Number: {profile?.el_number}</p>
                        </div>
                        <div>
                            <p>Address: {profile?.admin?.address_line}</p>
                            <p>City: {profile?.admin?.city}</p>
                        </div>
                        <div>
                            <p>Street: {profile?.admin?.street}</p>
                            <p>State: {profile?.admin?.state?.toUpperCase()}</p>
                        </div>
                        <div>
                            <p>Country: {profile?.admin?.country?.toUpperCase()}</p>
                            <p>Department: {profile?.admin?.user?.department}</p>
                        </div>
                        <div>
                            <p>User Type: {profile?.admin?.user?.user_type}</p>
                        </div>
                    </div>
                </div>
                <div className="completejobs__box">
                    <div className="header">
                        <p>List of working days</p>
                    </div>
                    <div className='content'>
                    {
                        listOfAvailableDates?.available_days?.map((ele, idx) => {
                            return(
                                <p>{ele?.date}</p>
                            )
                        })
                    }
                       <h1>Hello world</h1>
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
                            <Input placeholder="TFN Number" onChange={handleChange} value={tfnNumber} name="tfnNumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="ABM Number" onChange={handleChange} value={abmNumber} name="abmNumber" />
                            <Input placeholder="ACN Number" onChange={handleChange} value={acnNumber} name="acnNumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="EL Number" onChange={handleChange} value={elNumber} name="elNumber" />
                            <Input placeholder="EC Number" onChange={handleChange} value={ecNumber} name="ecNumber" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <select style={{ width: '100%', padding: '5px 0', border: '2px solid #99A3BA' }} value={department} onChange={handleChange} name="department">
                                <option defaultChecked>Select Department</option>
                                <option value="Installer">Installer</option>
                                <option value="Electrician">Electrician</option>
                            </select>
                            <Input placeholder="Address_line" onChange={handleChange} value={addressline} name="addressline" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <Input placeholder="City" onChange={handleChange} value={city} name="city" />
                            <Input placeholder="Street" onChange={handleChange} value={street} name="street" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                            <select name='state' style={{ width: '100%', padding: '5px 10px', border: '2px solid gray' }} value={state} onChange={handleChange}  >
                                <option selected>Select State</option>
                                <option value="Queensland">Queensland</option>
                                <option value="New South Wales">New South Wales</option>
                                <option value="Victoria">Victoria</option>
                                <option value="Western Australia">Western Australia</option>
                            </select>
                            <Input placeholder="Postcode" onChange={handleChange} value={postcode} name="postcode" />
                        </div>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
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

export default InstallersProfiles
