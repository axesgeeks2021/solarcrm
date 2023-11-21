import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { BiLogOut } from 'react-icons/bi'
import Button from '../../components/Button/Button'
import Navigation from "./Menu/InstallationTeamNavigation"

function CompletedJobs() {

    const [cookies] = useCookies()
    const [completedJobsList, setCompletedJobsList] = useState([])

    const fetchCompletedJobsList = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://13.126.231.119/completed-order-list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setCompletedJobsList(result)
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
        const subscribe = fetchCompletedJobsList()

        return () => [subscribe]
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
        <div className="container__table">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Building Type</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Assign</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        completedJobsList?.length < 1 ? <h2>There is no order available right now...</h2> : completedJobsList?.map((ele, idx) => {
                            return (
                                <tr key={idx}>
                                    <th scope="row">{ele?.project}</th>
                                    <td >{ele?.to_address?.user?.first_name}</td>
                                    <td >{ele?.building_Type}</td>
                                    <td >{ele?.company_Name}</td>
                                    <td >{ele?.order_status === "Completed" ? "Assigned" : ele?.order_status}</td>
                                    <td >{ele?.order_status}</td>
                                </tr>
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

export default CompletedJobs
