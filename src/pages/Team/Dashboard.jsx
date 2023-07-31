import React, { useEffect, useState } from 'react'
import Navigation from "./Menu/InstallationTeamNavigation"
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'


function Dashboard() {

    const navigate = useNavigate()

    const [cookies, setCookies, removeCookies] = useCookies();
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pendingList, setPendingList] = useState([])

    const [value, setValue] = useState('')

    const [modal, setModal] = useState(false)

    const handleChange = e => {
        setModal(true)
        setValue(e.target.value)
    }

    const fetchOrder = () => {
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/order/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    // console.log(result)
                    setOrderList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPendingOrder = () => {
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/new-order-list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    console.log(result)
                    setPendingList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpdateAssignOrder = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            var formdata = new FormData();
            formdata.append("assign_to", value.split(',')[1]);
            formdata.append("order_status", "Completed");

            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://solar365.co.in/team-update-order/${value.split(',')[0]}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.messsage === "Success") {
                        toast.success('Order successfully assigned')
                        setModal(false)
                        return fetchPendingOrder()
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
        const subscribe = fetchOrder()

        const subscribe1 = fetchPendingOrder()

        return () => [subscribe, subscribe1]
    }, [])

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <Navigation />
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                        <BiLogOut />
                        <Button title="Logout" onclick={logout} />
                    </div>
                </div>

                <div style={{ zIndex: 1000, width: '40%', background: '#fff', position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', height: '30%', display: modal ? 'flex' : 'none', justifyContent: 'space-between', boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3), -2px -2px 20px 2px rgba(0,0,0,0.3)', borderRadius: '5px', backfaceVisibility: 'hidden', alignItems: 'center', flexDirection: 'column' }}>
                    <p style={{ fontSize: '1.1rem', margin: '5% 2%', alignSelf: 'flex-start' }}>Please assing to installer or electician</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <button style={{ background: 'green', color: 'white', fontWeight: '600', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px' }} onClick={fetchUpdateAssignOrder}>Confirm</button>
                        <button onClick={() => setModal(false)} style={{ background: '', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px', fontWeight: '600' }}>Cancel</button>
                    </div>
                </div>
                <div style={{ width: '100%', padding: '20px 10px' }}>
                    {/* <Button title="Create New Customer" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} /> */}
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Panels Qty</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Status</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Assign</div>
                        </li>
                        {
                            pendingList?.map((ele, idx) => {
                                return (
                                    <li className="table-row" key={idx}>
                                        <div className={`col col-2 text-center`}>{ele?.project}</div>
                                        <div className={`col col-2 text-center`}>{ele?.to_address?.user?.first_name}</div>
                                        <div className={`col col-2 text-center`}>{ele?.building_Type}</div>
                                        <div className={`col col-2 text-center`}>{ele?.panels_quantity}</div>
                                        <div className={`col col-2 text-center`}>{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</div>
                                        <div className={`col col-2 text-center`}>
                                            <select onChange={handleChange}>
                                                <option>Select</option>
                                                <option value={[ele?.id, '1']}>Admin</option>
                                                <option value={[ele?.id, '2']}>Installer</option>
                                                <option value={[ele?.id, '3']}>Electrician</option>
                                            </select>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* {
                    showForm &&
                    <div style={{ width: "100%", display: 'flex', position: 'absolute', background: 'white', justifyContent: "center", alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            <Heading heading="Create or Register Customer" size="36px" weight="600" />
                        </div>
                        <form style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center' }} onSubmit={registerCustomer}>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row' }}>
                                <FormInput placeholder="First name..." onChange={handleChange} value={firstname} name="firstname" />
                                <FormInput placeholder="Last name..." onChange={handleChange} value={lastname} name="lastname" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Phone Number..." onChange={handleChange} value={phone} name="phone" />
                                <FormInput placeholder="Email..." onChange={handleChange} value={email} name="email" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Enter your document file..." onChange={handlefile} type="file" />
                                <FormInput placeholder="Alternate Phone..." onChange={handleChange} value={alternatephone} name="alternatephone" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Looking For..." onChange={handleChange} value={lookingfor} name="lookingfor" />
                                <FormInput placeholder="Project Capacity..." onChange={handleChange} value={projectcapacity} name="projectcapacity" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Utility Bill" onChange={handleChange} value={utilitybill} name="utilitybill" />
                                <FormInput placeholder="Assign To..." onChange={handleChange} value={assignto} name="assignto" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Supply..." onChange={handleChange} value={supply} name="supply" />
                                <FormInput placeholder="Roof Type..." onChange={handleChange} value={rooftype} name="rooftype" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Floor..." onChange={handleChange} value={floor} name="floor" />
                                <FormInput placeholder="Remarks..." onChange={handleChange} value={remarks} name="remarks" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Buying Options..." onChange={handleChange} value={buyingoptions} name="buyingoptions" />
                                <FormInput placeholder="Follows up 1..." onChange={handleChange} value={followsup1} name="followsup1" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Follow up 2..." onChange={handleChange} value={followsup2} name="followsup2" />
                                <FormInput placeholder="Street..." onChange={handleChange} value={street} name="street" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="State..." onChange={handleChange} value={state} name="state" />
                                <FormInput placeholder="Address Line..." onChange={handleChange} value={addressline} name="addressline" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="City..." onChange={handleChange} value={city} name="city" />
                                <FormInput placeholder="Postcode..." onChange={handleChange} value={postcode} name="postcode" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <FormInput placeholder="Country..." onChange={handleChange} value={country} name="country" />
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row', margin: '5px' }}>
                                <Button title="Submit" type="submit" background="orange" />
                                <Button title="Close" background="lightgray" onclick={() => setShowForm(false)} margin="0 10px" />
                            </div>
                        </form>
                    </div>
                } */}
            </div>
        </>
    )
}

export default Dashboard