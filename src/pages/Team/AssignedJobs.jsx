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
       
                {/* <div style={{ width: '100%', padding: '20px 10px' }}>
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
                </div> */}
                   <div class="container__table">
            <div className='py-2 flex justify-end'>
                    <Button title="Create New Order" background="green" color="white" onclick={() => setShowForm(!showForm)} />
                </div>
                <table class="responsive-table">
                    {/* <caption>Top 10 Grossing Animated Films of All Time</caption> */}
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">City / State</th>
                            <th scope="col">Type</th>
                            <th scope="col">Apporved Status</th>
                            {/* <th scope="col">Budget</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderList.length < 1 ? <h2>There is no order available right now...</h2> : orderList.map((ele, idx) => {
                                return (
                                    // <Link to="/non-admin/orders" state={{ ele }} key={idx}>
                                        <tr>
                                            <th scope="row">{ele?.to_address?.user?.first_name}</th>
                                            <td data-title="Released">{ele?.to_address?.user?.email}</td>
                                            <td data-title="Studio">{ele?.to_address?.user?.phone}</td>
                                            {/* <td data-title="Worldwide Gross" data-type="currency">{ele.building_Type}</td>
                                            <td data-title="Domestic Gross" data-type="currency">{ele.nmi_no}</td>
                                            <td data-title="International Gross" data-type="currency">
                                            <Button title="In Process" background="green" color="white"  />
                                            </td> */}
                                            {/* <td data-title="Budget" data-type="currency">$260,000,000</td> */}
                                        </tr>
                                    // </Link>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </>
    )
}

export default AssignedJobs