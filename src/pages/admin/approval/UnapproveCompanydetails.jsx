import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import AdminSideNavigation from '../menu/AdminSideNavigation';
import { BiLogOut, BiPlus } from 'react-icons/bi';
import Button from '../../../components/Button/Button';
import Input from '../../../components/inputsfield/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UnapproveCompanydetails() {

    const location = useLocation()
    const navigate = useNavigate()
    const [cookies] = useCookies();
    const [companyDetails, setCompanyDetails] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const [installationPrice, setInstallationPrice] = useState('')

    const fetchData = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/comp_profile_without_approve/${location?.state?.ele?.admin?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setCompanyDetails(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const updateCompany = e => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait....')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=q2JCvvyuokHIS2w2QPuGucHXgHUTOeKB");

            const formdata = new FormData();
            formdata.append("has_approve", "true");
            formdata.append("installation_price", installationPrice);

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/update_profile/${location?.state?.ele?.admin?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    toast.update(loadingId, { render: 'Company approved', type: 'success', isLoading: false, autoClose: true })
                    return navigate('/approved-company')
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
        <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} >
            {
                showForm &&
                <div className='popup__form'>
                    <p style={{ alignSelf: 'flex-start', paddingBottom: '20px' }}>Please press confirm to approve company</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <Button background="green" color="white" title="Confirm" onclick={updateCompany} />
                        <Button background="green" color="white" title="Update & Confirm" onclick={() => {
                            setShowForm(false)
                            setShowUpdateForm(true)
                        }
                        } />
                        <Button background="orange" color="white" title="Cancel" onclick={() => setShowForm(false)} />
                    </div>
                </div>
            }
            {
                showUpdateForm &&
                <div className='popup__form'>
                    <p>Please update price to approve company</p>
                    <BiPlus style={{ alignSelf: 'flex-end', position: 'absolute', top: '0px', right: '0px', transform: 'rotate(45deg)' }} size={35} onClick={() => setShowUpdateForm(false)} />
                    <form style={{ background: 'transparent', width: "100%", gap: '4px' }} onSubmit={updateCompany}>
                        <Input placeholder="Installation Price" width="100%" onChange={e => setInstallationPrice(e.target.value)} value={installationPrice} required={true} />
                        <Button title="Submit" type="submit" background="green" color="#fff" alignSelf="flex-end" />
                    </form>
                </div>
            }
            <div>
                <AdminSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>
            <div className="container__table completeContainer">
                <div style={{ width: '95%', display: 'flex', justifyContent: 'flex-end', }}>
                    <Button title="Approve Company" background="green" color="#fff" onclick={() => setShowForm(true)} />
                </div>
                <div className="completejobs__box">
                    <div className="header">
                        <p>Comapny Details</p>
                    </div>
                    <div className='content'>
                        <div>
                            <p>Company Name: {companyDetails?.company_name}</p>
                            <p>Name: {companyDetails?.admin?.user?.first_name} {companyDetails?.admin?.user?.last_name}</p>
                        </div>
                        <div>
                            <p>Email: {companyDetails?.admin?.user?.email}</p>
                            <p>Phone: {companyDetails?.admin?.user?.phone}</p>
                        </div>
                        <div>
                            <p>Alternate Phone: {companyDetails?.alternate_phone}</p>
                            <p>Address: {companyDetails?.admin?.address_line}</p>
                        </div>
                        <div>
                            <p>City: {companyDetails?.admin?.city}</p>
                            <p>State: {companyDetails?.admin?.state}</p>
                        </div>
                        <div>
                            <p>Country: {companyDetails?.admin?.country}</p>
                            <p>Has Customer Access: {companyDetails?.has_customer_access === true ? "Yes" : "No"}</p>
                        </div>
                        <div>
                            <p>Has Installer Access: {companyDetails?.has_installer_access === true ? "Yes" : "No"}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UnapproveCompanydetails
