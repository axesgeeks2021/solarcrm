import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { FaPlus } from "react-icons/fa";
import Select from 'react-select';

function Practice() {

    const [cookies, setCookies, removeCookies] = useCookies();
    const [value, setValue] = useState([])
    const [text, setText] = useState([])

    const [list, setList] = useState([])
    const [bool, setBool] = useState(false)

    const [obj, setObj] = useState([])

    console.log('list ', obj)

    
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

   
    const fetchGetInstaller = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token 93c1589d1da7b9bd6b15abd6d99c4d9a533ccbe5`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/get_installer_profile/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log('installer ', result)
                    setList(result?.Installer)
                    list?.map(ele => {
                        setObj([...obj, {value: ele?.admin?.user?.first_name}])
                    })
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        const subscribe2 = fetchGetInstaller()
        
        return () => [subscribe2]
    }, [])


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', background: '#eee', flexDirection: 'column' }}>
                <Select
                    options={options}
                    isMulti
                    closeMenuOnSelect={false}
                />
                {
                    list?.map(ele => {
                        return <p>{ele?.admin?.user?.first_name}</p>
                    })

                }
            
            </div >
        </>
    )
}

export default Practice
