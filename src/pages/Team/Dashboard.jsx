import React, { useEffect, useState } from 'react'
import Navigation from "./Menu/InstallationTeamNavigation"
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'

function Dashboard() {

    const [cookies] = useCookies()
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)

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
                    console.log(result)
                    setOrderList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchOrder()

        return () => [subscribe]
    }, [])

    return (
        <>
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center' }} >
                <div>
                    <Navigation />
                </div>
                <div style={{ width: '100%', padding: '20px 10px' }}>
                    {/* <Button title="Create New Customer" background="green" margin="4px 0" color="white" onclick={() => setShowForm(!showForm)} /> */}
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Email</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Mobile</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">City / State</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Apporved Status</div>
                        </li>
                        {
                            orderList?.map((ele, idx) => {
                                return (
                                    <li className="table-row" key={idx}>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.first_name}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.email}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.phone}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.city} / {ele.admin.state}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.user_type}</div>
                                        <div className={`col col-2 text-center`}>{ele.admin.user.has_approve === false ? 'Not Approved' : 'Approved'}</div>
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