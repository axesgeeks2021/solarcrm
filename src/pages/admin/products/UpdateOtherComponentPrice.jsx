import React, { useEffect, useState } from 'react'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { BiLogOut } from "react-icons/bi"
import Button from '../../../components/Button/Button'
import { useCookies } from 'react-cookie'
import FormsContainer from '../Forms/FormsContainer'
import Input from '../../../components/inputsfield/Input'

function UpdateOtherComponentPrice() {

    const [cookies, removeCookies] = useCookies()

    const [loading, setLoading] = useState(false)
    const [companyList, setCompanyList] = useState([])

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


    const logout = () => {
        removeCookies('Authorization')
        return navigate('/login')
    }

    useEffect(() => {
        const subscribe = fetchCompanyList()

        return () => [subscribe]
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
                    <h1 style={{textAlign: 'center'}}>Update price of other component</h1>
                    <div>
                    <select style={{border: "2px solid gray",padding: '3px 10px'}}>
                        <option>Select Company</option>
                        {
                            companyList && companyList.map((ele, idx) => {
                                return(
                                    <option key={idx}>{ele?.company_name}</option>
                                )
                            })
                        }
                    </select>
                            <Input placeholder="Enter price..."/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateOtherComponentPrice
