import { useEffect } from 'react';
import AdminSideNavigation from '../menu/AdminSideNavigation';
import Button from '../../../components/Button/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../../../components/orders/OrderList';
import Loading from '../../../components/loading/Loading';

import { useCookies } from "react-cookie";


function ApprovedCompany() {
    const [approvedCompanyList, setApprovedCompanyList] = useState([])
    const [loading, setLoading] = useState(false)
    const [cookies] = useCookies();
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

            fetch("https://solar365.co.in/get_none_admin_profile", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setTimeout(() => {
                        setLoading(false)
                        setApprovedCompanyList(result)
                    }, 800);
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
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Id</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Username</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Company Name</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Address Line</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">User Type</div>
                            <div className="col col-2 text-center text-slate-50 text-base font-bold">Aprrove Status</div>
                        </li>
                        {
                            approvedCompanyList.length < 1 ? <h2>There is no order available right now...</h2> : approvedCompanyList.map((ele, idx) => {
                                return (
                                        <OrderList
                                        key={idx}
                                            Id={ele.id}
                                            Project={ele?.admin?.user?.username}
                                            CustomerName={ele?.company_name}
                                            SystemSize={ele.admin?.address_line}
                                            BuildingType={ele?.admin?.user?.user_type}
                                            NmiNo={ele?.admin?.user?.has_approve === false ? <Button title="Not Approved" background="red" color="white"  /> : <Button title="Approved" background="green" color="white" disabled={true} />
                                            }
                                        />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ApprovedCompany