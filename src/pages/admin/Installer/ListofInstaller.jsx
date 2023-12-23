import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import AdminSideNavigation from '../menu/AdminSideNavigation';
import { BiLogOut } from 'react-icons/bi';
import Button from '../../../components/Button/Button';
import BarLoader from '../../../components/BarLoader/BarLoader';

function ListofInstaller() {

    const [cookies, removeCookies] = useCookies()
    const location = useLocation()
    const [installerList, setInstallerList] = useState({})
    const [changeFormat, setChangeFormat] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchInstallerList = (date) => {
        try {
            setLoading(false)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(`https://solar365.co.in/assign_get_profile/?date=${date}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setLoading(false)
                    setInstallerList(result)
                    return
                })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        removeCookies('Authorization', { path: '/' })
        return navigate('/login')
    }

    const handleDateFormat = () => {
        const date = new Date(location?.state?.ele);
        const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
        fetchInstallerList(dateString)
        setChangeFormat(dateString)
        return
    }

    useEffect(() => {
        const subscribe = handleDateFormat()

        return () => [subscribe]
    }, [])

    return (
        <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <AdminSideNavigation />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
                    <BiLogOut />
                    <Button title="Logout" onclick={logout} />
                </div>
            </div>
            <div className="container py-5">

                <div>
                    <div style={{ background: '#003f91', padding: '5px 0' }}>
                        <p style={{ fontSize: '30px', fontWeight: '600', color: '#fff' }}>List of Installer / Electrician available on &nbsp; - &nbsp; {location?.state?.ele}</p>
                    </div>
                    {
                        loading ? <BarLoader /> :
                        <div style={{ background: '#eee', padding: '20px 20px', display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ fontSize: '28px', fontWeight: '600', background: '#003f91', padding: '2px 15px', color: '#fff' }}>Electrician</p>
                                <div>
                                    <ul style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
                                        {
                                            installerList?.Electrician?.map((ele, idx) => {
                                                return <li key={idx} style={{ background: '#d9d9d9', width: '100%', marginTop: '10px', textAlign: 'center', padding: '4px 10px' }}>{ele?.full_name}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div >
                                <p style={{ fontSize: '28px', fontWeight: '600', background: '#003f91', padding: '2px 15px', color: '#fff' }}>Installer</p>
                                <div>
                                    <ul style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px' }}>
                                        {
                                            installerList?.Installer?.map((ele, idx) => {
                                                return <li key={idx} style={{ background: '#d9d9d9', width: '100%', marginTop: '10px', textAlign: 'center', padding: '4px 10px' }}>{ele?.full_name}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default ListofInstaller
