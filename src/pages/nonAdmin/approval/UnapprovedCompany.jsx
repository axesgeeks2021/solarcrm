import { useEffect } from 'react';
import AdminSideNavigation from '../menu/AdminSideNavigation';
import Button from '../../../components/Button/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../../../components/orders/OrderList';
import Loading from '../../../components/loading/Loading';

import { useCookies } from "react-cookie";

function UnapprovedCompany() {
    const [cookies] = useCookies();

    const [unapprovedCompanyList, setUnapprovedCompanyList] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchData =  () => {
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://65.0.45.255:8000/comp_profile_without_approve", requestOptions)
                .then(response => response.json())
                .then(result => {

                    setTimeout(() => {
                        setLoading(false)
                        setUnapprovedCompanyList(result)
                    }, 800);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const approveCompany =  (id) => {
        try {
            setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Token 3796b9107c3e667448dc83df6d802bdde3f1f988");

            const formdata = new FormData();
            formdata.append("has_approve", "true");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch(`http://65.0.45.255:8000/update_profile/${id}/`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTimeout(() => {
                        setLoading(false)
                        fetchData()
                    }, 700)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const subscribe = fetchData()

        return () => subscribe
    }, [])

    if(loading){
        return <Loading />
    }

    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <AdminSideNavigation />
                </div>
                <div className="container py-5">
                    {/* <div className='py-2 flex justify-end'>
                        <Button title="Create New Panel" background="aqua" color="gray" />
                    </div> */}
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Id</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Username</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Company Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Address Line</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">User Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Aprrove Status</div>
                            {/* <div className="col col-1 text-center">Panels</div>
                        <div className="col col-1 text-center">Inverter</div> */}
                            {/* <div className="col col-1 text-center">Meter Phase</div> */}
                            {/* <div className="col col-1 text-center">Order Status</div> */}
                            {/* <div className="col col-1 text-center">Manufacturer</div> */}
                            {/* <div className="col col-1 text-center">Smart Meter</div> */}
                        </li>
                        {
                            unapprovedCompanyList.length < 1 ? <h2>There is no order available right now...</h2> : unapprovedCompanyList.map((ele, idx) => {
                                return (
                                    // <Link to="/admin-orders" state={{ ele }} key={idx}>
                                        <OrderList
                                        key={idx}
                                            Id={ele.id}
                                            Project={ele?.admin?.user?.username}
                                            CustomerName={ele?.company_name}
                                            SystemSize={ele.admin?.address_line}
                                            BuildingType={ele?.admin?.user?.user_type}
                                            NmiNo={ele?.admin?.user?.has_approve === false ? <Button title="Not Approved" background="red" color="white" onclick={() => approveCompany(ele?.admin?.id)} /> : <Button title="Approved" background="green" color="white" disabled={true} />
                                            }
                                        // Panels={ele.panels}
                                        // Inverter={ele.inverter}
                                        // MeterPhase={ele.meter_Phase}
                                        // OrderStatus={ele.order_status}
                                        // Manufacturer={ele.other_component.map((ele , idx) => {
                                        //     return ele.manufacturer
                                        // })}
                                        // SmartMeter={ele.other_component[0].smart_meter} 
                                        />
                                    // </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default UnapprovedCompany