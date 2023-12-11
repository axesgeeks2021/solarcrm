import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { FaPlus } from "react-icons/fa";
import Select from 'react-select';
import { Multiselect } from "multiselect-react-dropdown"

function Practice() {

    const [cookies, setCookies, removeCookies] = useCookies();
    const [value, setValue] = useState([])
    const [text, setText] = useState([])

    const [list, setList] = useState([])
    const [bool, setBool] = useState(false)

    const [obj, setObj] = useState([])

    const [inslist, setInslist] = useState({})

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const getlist = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token 7c859bcce8fbd61832220b2cf262b1460c251797`);
            myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/get_installer/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log('ins', result)
                    setInslist(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }

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
                        setObj([...obj, { value: ele?.admin?.user?.first_name }])
                    })
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        const subscribe2 = fetchGetInstaller()
        const subscribe3 = getlist()

        return () => [subscribe2, subscribe3]
    }, [])


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', background: '#eee', flexDirection: 'column' }}>
                <Select
                    options={inslist?.Installer?.first_name}
                    isMulti
                    closeMenuOnSelect={false}
                    
                />
                <Multiselect
                    isObject={true}
                    options={inslist?.Installer}
                    displayValue="full_name"
                    placeholder='Select Installer'
                    onSelect={(e) => console.log('multi',e?.map(ele => ele?.id))}
                />


            </div >
        </>
    )
}

export default Practice
