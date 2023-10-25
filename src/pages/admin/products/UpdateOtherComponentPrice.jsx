import React, { useEffect, useState } from 'react'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from "react-icons/bi"
import Button from '../../../components/Button/Button'
import { useCookies } from 'react-cookie'
import FormsContainer from '../Forms/FormsContainer'
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'
import OtherComponent from './OtherComponent'
import OrderList from '../../../components/orders/OrderList'


function UpdateOtherComponentPrice() {

    const [cookies, removeCookies] = useCookies()

    const [loading, setLoading] = useState(false)
    const [companyList, setCompanyList] = useState([])
    const [otherComponentList, setOtherComponentList] = useState([])
    const [companyId, setCompanyId] = useState("")
    const [otherComponentListPrice, setOtherComponentListPrice] = useState([])

    const [value, setValue] = useState({
        company: '',
        component: '',
        price: ''
    })

    const { company, component, price } = value

    const handleChange = e => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    const fetchCompanyList = () => {
        try {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/get_none_admin_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    setCompanyList(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchOtherComponent = () => {
        try {
            setLoading(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/other_component/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    setOtherComponentList(result)
                    console.log('other component', result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUpdatePriceOtherComponent = (e) => {
        e.preventDefault()
        try {
            const loadingId = toast.loading('Please wait....')
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");


            const formdata = new FormData();
            formdata.append("price", price);
            formdata.append("other_component", component);
            formdata.append("company", company);


            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/pricing-other_component/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.message === "success") {
                        setValue({
                            component: "",
                            price: '',
                            company: company
                        })
                        toast.update(loadingId, { render: 'Price updated successfully', isLoading: false, autoClose: true, type: 'success' })
                        return fetchOtherComponentPriceList()
                    }

                    if (result.status === false) {
                        toast.update(loadingId, { render: 'Already Added!', isLoading: false, autoClose: true, type: 'error' })
                        return
                    }
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

    const fetchOtherComponentPriceList = () => {

        try {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/pricing-other_component/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('price', result)
                    setOtherComponentListPrice(result)
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
        const subscribe = fetchCompanyList()
        const subscribe2 = fetchOtherComponent()
        const subscribe3 = fetchOtherComponentPriceList()

        return () => [subscribe, subscribe2, subscribe3]
    }, [])

    return (
        <>
            <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <AdminSideNavigation />
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                        <BiLogOut />
                        <Button title="Logout" onclick={logout} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div className="container py-5" style={{ background: '#eee', height: 'auto' }}>
                        <p style={{ textAlign: 'center',  }}>Update price of other component</p>
                        <form style={{ width: '100%' }} onSubmit={fetchUpdatePriceOtherComponent}>
                            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                                <select required style={{ border: "2px solid gray", padding: '3px 10px' }} value={company} name='company' onChange={handleChange}>
                                    <option value="">Select Company</option>
                                    {
                                        companyList && companyList.map((ele, idx) => {
                                            return (
                                                <option key={idx} value={ele?.id}>{ele?.company_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select required style={{ border: "2px solid gray", padding: '3px 10px' }} value={component} name='component' onChange={handleChange}>
                                    <option value="">Select Component</option>
                                    {
                                        otherComponentList && otherComponentList.map((ele, idx) => {
                                            return (
                                                <option key={idx} value={ele?.id}>{ele?.title}</option>
                                            )
                                        })
                                    }
                                </select>

                                <Input placeholder="Price" onChange={handleChange} name="price" value={price} required={true} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%', margin: '10px 0' }}>
                                <Button type="submit" title="Submit" background="green" color="white" />
                            </div>
                        </form>
                    </div>
                    <div className="container py-5" style={{ height: 'auto', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', margin: '15px 0' }}>
                            {/*  <p>Select a specific company to see their prices</p>
                        <select required style={{ border: "2px solid gray", padding: '3px 10px' }} value={companyId} onChange={e => setCompanyId(e.target.value)}>
                                    <option value="">Select Company</option>
                                    {
                                        companyList && companyList.map((ele, idx) => {
                                            return (
                                                <option key={idx} value={ele?.company_name}>{ele?.company_name}</option>
                                            )
                                        })
                                    }
                                </select>*/}
                        </div>
                        <ul className="responsive-table" style={{ width: '100%' }}>
                            <li className="table-header">
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">S.no</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Company Name</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Title</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Code</div>
                                <div className="col col-2 text-center text-slate-50 text-base font-bold">Price</div>
                            </li>
                            {
                                otherComponentListPrice?.length < 1 ? <h2>There is no order available right now...</h2> : otherComponentListPrice.filter(ele => ele?.company?.company_name?.toLowerCase().includes(companyId.toLowerCase())).map((ele, idx) => {
                                    return (
                                        <li className='table-header'>
                                            <div className="col col-2 text-center text-slate-50 text-base font-bold">{idx + 1}</div>
                                            <div className="col col-2 text-center text-slate-50 text-base font-bold">{ele?.company?.company_name}</div>
                                            <div className="col col-2 text-center text-slate-50 text-base font-bold">{ele?.other_component?.title}</div>
                                            <div className="col col-2 text-center text-slate-50 text-base font-bold">{ele?.other_component?.code}</div>
                                            <div className="col col-2 text-center text-slate-50 text-base font-bold">{ele?.price}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateOtherComponentPrice
