import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { BiLogOut } from 'react-icons/bi'
import Button from '../../../components/Button/Button'
import { Link, useLocation } from 'react-router-dom'
import Heading from '../../../components/heading/Heading'
import Input from '../../../components/inputsfield/Input'
import TeamSideNavigation from "../Menu/InstallationTeamNavigation"


function ApproveOtherComponentTeam() {

    const location = useLocation()
    const [cookies, removeCookies] = useCookies()
    const [orderList, setOrderList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [text, setText] = useState({
        specialDiscount: "",
        approve: ""
    })

    const { approve, specialDiscount } = text

    const handleChange = e => {
        setText({ ...text, [e.target.name]: e.target.value })
    }

    const fetchOrder = async () => {
        try {
            setLoading(true)
            const url = `https://solar365.co.in/order/${location?.state?.ele?.id}`
            const headers = new Headers()
            headers.append('Authorization', `Token ${cookies.Authorization}`)

            const res = await fetch(url, {
                headers: headers
            })
            const data = await res.json()
            setLoading(false)
            setOrderList(data)
            // console.log('customer', data)
            return
        } catch (error) {
            console.log(error)
        }
    }

    const fetchApproveComponent = e => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)
            myHeaders.append("Cookie", "csrftoken=2PklrXNiKgPPd0MAT9LAzUQyvHEcqxK3");

            const formdata = new FormData();
            formdata.append("special_discount", specialDiscount);
            formdata.append("is_approve", approve);

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/order/${location?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result?.status === true) {
                        console.log(result)
                        setShowModal(false)
                        return fetchOrder()
                    }
                    return alert(result?.message)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const handleDecline = e => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)
            myHeaders.append("Cookie", "csrftoken=2PklrXNiKgPPd0MAT9LAzUQyvHEcqxK3");

            const formdata = new FormData();
            formdata.append("special_discount", specialDiscount);
            formdata.append("is_approve", 'false');

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/order/${location?.state?.ele?.id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    return
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        removeCookies('Authorization', { path: "/" })
        return navigate('/login')
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        return () => [subscribe]
    }, [])

    return (
        <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <TeamSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>
            <div className="container py-5">
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0', gap: '10px' }}>
                    {
                        orderList?.is_approve !== true ?
                            <Button title="Approve" onclick={() => setShowModal(true)} background="green" color="#fff" />
                            :
                            <Button title="Approve" onclick={() => alert('Already approved!')} background="green" color="#fff" />
                    }
                    {/*{
                orderList?.is_approve !== true ?
                    <Button title="Decline" onclick={() => setDeleteModal(true)} background="red" color="#fff" />
                    :
                    <Button title="Decline" onclick={() => alert('You can not decline. Already Approved')} background="red" color="#fff" />
            }*/}
                </div>
                <ul className="responsive-table">
                    <li className="table-header py-3 py-2">
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">S.no</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Code</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Title</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Quantity</div>
                        <div className="col col-2 text-center text-slate-50 text-base font-bold">Price</div>
                    </li>

                    {
                        orderList?.other_component?.map((ele, idx) => {
                            return (
                                <Link to="/admin-orders" state={{ ele }} key={idx} >
                                    <li className="table-header py-3 py-2" style={{ backgroundColor: '#fff', boxShadow: '1px 1px 4px 0 rgba(0,0,0,0.2)' }}>
                                        <div className="col col-2 text-center text-slate-50 text-base font-bold" style={{ color: '#000' }}>{idx + 1}</div>
                                        <div className="col col-2 text-center text-slate-50 text-base font-bold" style={{ color: '#000' }}>{ele?.code}</div>
                                        <div className="col col-2 text-center text-slate-50 text-base font-bold" style={{ color: '#000' }}>{ele?.title}</div>
                                        <div className="col col-2 text-center text-slate-50 text-base font-bold" style={{ color: '#000' }}>{ele?.quantity}</div>
                                        <div className="col col-2 text-center text-slate-50 text-base font-bold" style={{ color: '#000' }}>{ele?.price * ele?.quantity}</div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            {
                showModal &&
                <div style={{ transition: "0.4s", width: "50%", background: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'fixed', left: '50%', top: "50%", boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.2),-2px -2px 10px 1px rgba(0,0,0,0.2)', overflowY: 'hidden', transform: 'translate(-50%, -50%)', flexDirection: "column" }}>
                    {/* <ImCross style={{position: 'absolute', top: '5px', left: '10px', cursor: 'pointer'}} onClick={() => setDisplayForm(false)}/> */}
                    <div className='my-4 flex flex-col justify-center items-center gap-3' style={{ width: "100%" }}>
                        <Heading heading="Request for Approval" size="24px" />
                        <form style={{ width: '100%' }} className='flex flex-col justify-center items-center gap-3' onSubmit={fetchApproveComponent}>
                            <Input width="100%" placeholder="Specail Discount" value={specialDiscount} name="specialDiscount" onChange={handleChange} />
                            <select name='approve' value={approve} onChange={handleChange} style={{ border: '2px solid gray', width: '100%', padding: '5px 0', margin: '0 4px' }} required>
                                <option style={{ textAlign: 'center' }} value="">Approve</option>
                                <option style={{ textAlign: 'center' }} value="true">Yes</option>
                                <option style={{ textAlign: 'center' }} value="false">No</option>
                            </select>
                            <div className='flex gap-5 justify-end items-end' style={{ width: "100%" }}>
                                <Button color="#fff" title="Submit" background="orange" type="submit" />
                                <Button color="#fff" title="Close" background="gray" type="button" onclick={() => setShowModal(false)} />
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                deleteModal &&
                <div style={{ transition: "0.4s", width: "40%", background: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', position: 'fixed', left: '50%', top: "50%", boxShadow: '2px 2px 10px 1px rgba(0,0,0,0.2),-2px -2px 10px 1px rgba(0,0,0,0.2)', overflowY: 'hidden', transform: 'translate(-50%, -50%)', flexDirection: "column" }}>
                    {/* <ImCross style={{position: 'absolute', top: '5px', left: '10px', cursor: 'pointer'}} onClick={() => setDisplayForm(false)}/> */}
                    <div className='my-10 flex flex-col justify-center items-center gap-3' style={{ width: "100%" }}>
                        <Heading heading="Are you sure want to decline?" size="24px" />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0', gap: '10px' }}>
                            <Button title="Yes" onclick={handleDecline} background="green" color="#fff" />
                            <Button title="No" onclick={() => setDeleteModal(false)} background="red" color="#fff" />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ApproveOtherComponentTeam
