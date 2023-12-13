import React, { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'

function UpdateTeam() {

    const data = useLocation()
    const [cookies] = useCookies();

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [displayForm, setDisplayForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false)
    const [profileDetails, setProfileDetails] = useState({})
    const [text, setText] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        alternatePhone: "",
        description: "",
        isOnline: "",
        addressLine: "",
        city: "",
        state: "",
        street: "",
        country: "",
        postcode: "",
        department: ""
    })

    const { addressLine,department, alternatePhone, city, country, description, email, firstName, isOnline, lastName, phone, postcode, state, street } = text;

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

    const updateOrder = () => {
        
        try {
            const loadingId = toast.loading('Please wait....')

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const formdata = new FormData();
            formdata.append("first_name", firstName !== "" ? firstName : profileDetails?.admin?.user?.first_name);
            formdata.append("last_name", lastName !== "" ? lastName : profileDetails?.admin?.user?.last_name);
            formdata.append("phone", phone !== "" ? phone : profileDetails?.admin?.user?.phone);
            formdata.append("email", email !== "" ? email : profileDetails?.admin?.user?.email);
            // formdata.append("profile_pic", fileInput.files[0], "/home/admin1/Pictures/Screenshots/Screenshot from 2022-11-10 10-54-38.png" !== "" ?  : profileDetails?.admin?.user?.);
            formdata.append("alternate_phone", alternatePhone !== "" ? alternatePhone : profileDetails?.alternate_phone);
            formdata.append("description", description !== "" ? description : profileDetails?.admin?.description);
            formdata.append("is_online", isOnline !== "" ? isOnline : profileDetails?.is_online);
            formdata.append("address_line", addressLine !== "" ? addressLine : profileDetails?.admin?.address_line);
            formdata.append("city", city !== "" ? city : profileDetails?.admin?.city);
            formdata.append("state", state !== "" ? state : profileDetails?.admin?.state);
            formdata.append("street", street !== "" ? street : profileDetails?.admin?.street);
            formdata.append("postcode", postcode !== "" ? postcode : profileDetails?.admin?.postcode);
            formdata.append("country", country !== "" ? country : profileDetails?.admin?.country);
            formdata.append("department", department !== "" ? department : profileDetails?.department);


            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_profile/${data?.state?.ele?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: 'Updated successfully...', isLoading: false, type: 'success', autoClose: true })
                    console.log('updated ,',result)
                    setDisplayForm(false)
                    setText(prev => prev !== "" ? "" : "")
                    return fetchData()
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

            fetch(`https://solar365.co.in/get_team_profile/${data?.state?.ele?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log('profile....', result)
                    setProfileDetails(result)
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

            fetch(`https://solar365.co.in/update_profile/${data?.state?.ele?.admin?.user?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, {render: 'Deleted Successfully...', type: 'success', isLoading: false, autoClose: true})
                    console.log(result)
                    return navigate(-1)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe2 = fetchData()

        return () => [subscribe2]
    }, [])

    return (
        <div className='admin__order__container' style={{ justifyContent: 'flex-start' }}>
            <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
                <div style={{ width: '50%' }}>
                    <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
                </div>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
                    <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
                    <Button title="Delete" color="white" background="red" onclick={() => setDeleteForm(true)} />
                    {
                        deleteForm &&
                        <div style={{ padding: '0px 20px', paddingBottom: '20px', background: 'beige', position: 'fixed', top: "50%", left: "50%", transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.1), -2px -2px 10px 2px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
                            <p style={{ margin: '20px 0' }}>Are you sure want to delete ?</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button title="Ok" background="#4bb543" margin="0px 10px" color="#fff" onclick={deleteRecord} />
                                <Button title="Cancel" background="orange" color="#fff" onclick={() => setDeleteForm(false)} />
                            </div>
                        </div>
                    } 
                </div>
            </div>
            <div className='admin__card'>
                <div className='admin__order__details'>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Heading heading="Team Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="User Name" value={profileDetails?.admin?.user?.username} />
                        <Line title="Name" value={`${profileDetails?.admin?.user?.first_name} ${profileDetails?.admin?.user?.last_name}`} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="E-mail" value={profileDetails?.admin?.user?.email} />
                        <Line title="Phone" value={profileDetails?.admin?.user?.phone} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Alternate Number" value={profileDetails?.alternate_phone} />
                        <Line title="Department" value={profileDetails?.department} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="Address" value={profileDetails?.admin?.address_line} />
                        <Line title="City" value={profileDetails?.admin?.city} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
                        <Line title="State" value={profileDetails?.admin?.state} />
                        <Line title="Country" value={profileDetails?.admin?.country} />
                    </div>
                </div>
            </div>
            {
                displayForm && <FormsContainer flexDirection="column">
                    <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                        <Heading heading="Update your Team details..." size="200%" />
                    </div>
                    <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="First Name" value={firstName} name="firstName" onChange={handleChange} />
                            <Input placeholder="Last Name" value={lastName} name="lastName" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Email" value={email} name="email" onChange={handleChange} />
                            <Input placeholder="phone" value={phone} name="phone" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Alternate Number" value={alternatePhone} name="alternatePhone" onChange={handleChange} />
                            <Input placeholder="Department" value={department} name="department" onChange={handleChange} />
                            </div>
                            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="Address" value={addressLine} name="addressLine" onChange={handleChange} />
                            <Input placeholder="City" value={city} name="city" onChange={handleChange} />
                            </div>
                            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <Input placeholder="State" value={state} name="state" onChange={handleChange} />
                            <Input placeholder="Country" value={country} name="country" onChange={handleChange} />
                        </div>
                        <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
                            <Button title="button" background="orange" color="white" onclick={updateOrder} />
                            <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
                        </div>
                    </form>
                </FormsContainer>
            }
        </div>
    )
}

export default UpdateTeam
