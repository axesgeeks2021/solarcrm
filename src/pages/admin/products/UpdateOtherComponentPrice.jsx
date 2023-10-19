import React, { useEffect, useState } from 'react'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from "react-icons/bi"
import Button from '../../../components/Button/Button'
import { useCookies } from 'react-cookie'
import FormsContainer from '../Forms/FormsContainer'
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'
import OtherComponent from './OtherComponent'

function UpdateOtherComponentPrice() {

    const [cookies, removeCookies] = useCookies()

    const [loading, setLoading] = useState(false)
    const [companyList, setCompanyList] = useState([])
    const [otherComponentList, setOtherComponentList] = useState([])

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
                    console.log(result)
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
                            price: ''
                        })
                        toast.update(loadingId, { render: 'Price updated successfully', isLoading: false, autoClose: true, type: 'success' })
                        return
                    }
                    
                    if(result.status === false){
                        toast.update(loadingId, { render: 'Please try again!', isLoading: false, autoClose: true, type: 'error' })
                        return
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
        const subscribe = fetchCompanyList()
        const subscribe2 = fetchOtherComponent()

        return () => [subscribe, subscribe2]
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
                <div className="container py-5">
                    <h1 style={{ textAlign: 'center' }}>Update price of other component</h1>
                    <form style={{width: '100%'}} onSubmit={fetchUpdatePriceOtherComponent}>
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
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end',width: '100%', margin: '10px 0' }}>
                            <Button type="submit" title="Submit" background="green" color="white" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateOtherComponentPrice
