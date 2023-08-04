import React, { useEffect, useState } from 'react'
import Navigation from "./Menu/InstallationTeamNavigation"
import Button from '../../components/Button/Button'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

function AssignedJobs() {

    const [cookies] = useCookies()
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrder = () => {
        try {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            
            fetch("http://solar365.co.in/pending-order-list/", requestOptions)
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
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Project</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Customer Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Building Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Panels Qty</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Status</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Assign To</div>
                        </li>
                        {
                            orderList?.map((ele, idx) => {
                                return (
                                    <li className="table-row" key={idx}>
                                        <div className={`col col-2 text-center`}>{ele?.project}</div>
                                        <div className={`col col-2 text-center`}>{ele?.to_address?.user?.first_name}</div>
                                        <div className={`col col-2 text-center`}>{ele?.building_Type}</div>
                                        <div className={`col col-2 text-center`}>{ele?.panels_quantity}</div>
                                        <div className={`col col-2 text-center`}>{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</div>
                                        <div className={`col col-2 text-center`}>
                                            {
                                                ele?.assign_to?.map((ele, idx) => {
                                                    return(
                                                        <p key={idx}>{ele?.user_type}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        </>
    )
}

export default AssignedJobs