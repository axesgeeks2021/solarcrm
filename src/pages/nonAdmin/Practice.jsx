import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import DropdownList from "react-widgets/DropdownList";
import Multiselect from "react-widgets/Multiselect"
import { fetchRequest } from '../../utils/FetchRequest';

import { useCookies } from 'react-cookie'


function Practice() {

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    
    const [cookies] = useCookies();
    
    const [data, setData] = useState([])
    
    const [text, setText] = useState('')
    
    
    const d = []
    console.log('data', data)

    const fetchOrder = async () => {
        try {

            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
            // myHeaders.append("Cookie", "csrftoken=svQq77wcRBEpbzWkYfqDJcnsopUicTNd; sessionid=1rloxayuhazv0kteh8za8nnulqar1bf1");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("http://solar365.co.in/inverter_module/", requestOptions)
                .then(response => response.json())
                .then(result => {  
                    console.log(result)
                    result.map(ele => {
                        return setData(prev => [...new Set([...prev, ele.code])])
                    })
                }).catch(error => console.log('error', error));

        } catch (error) {
            console.log(error)
        }
    }


    const convertIntoValue = (arr) => {
        arr?.map((ele, idx) => {
            return(
                console.log(ele.code)
                // setNewArr([...newArr, ele.code])


                
            )
        })
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Multiselect 
            //    defaultValue={'Select Inverter'}
               data={data}
               title='Inverter'
            />

            {/* <div style={{width: '300px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input type='text' placeholder='enter your values' style={{ width: '300px', padding: '4px 10px', border: "2px solid black" }} />
                <select style={{position: 'absolute', right: '10px', width: '300px'}}>
                    <option></option>
                    <option>Hello</option>
                    <option>Hello</option>
                    <option>Hello</option>
                    <option>Hello</option>
                </select>
                </div> */}
        </div>

    )
}

export default Practice;