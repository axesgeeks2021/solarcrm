import React from 'react'
import { useCookies } from 'react-cookie';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import Line from '../../components/heading/Line';
import { useState } from 'react';
import FormInput from '../../components/inputsfield/FormInput';
import Button from '../../components/Button/Button';

function UpdateAssignedOrders() {

    const [cookies] = useCookies()

    const [showState, setShowState] = useState(false)
    const [selectDate, setSelectDate] = useState({
        meterDate: '',
        meterApproveDate: ''
    })

    const {meterApproveDate, meterDate} = selectDate

    const handleChange = e => {
        setSelectDate({...selectDate, [e.target.name] : e.target.value})
    }

    const fetchUpdateOrder = (e) => {
        e.preventDefault()
        try {
            console.log(selectDate)
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const formdata = new FormData();
            formdata.append("meter_date", meterDate);
            formdata.append("meter_Approved_date", meterApproveDate);
            formdata.append("energy_provider", "Energy");

            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/update_grid/32/", requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <div style={{width: "100%",padding: '20px 20px', display: 'flex', justifyContent: 'center',alignItems: 'center'}}>
        <div style={{width: '90%', display: 'flex', justifyContent: 'space-between', margin: "10px 0", flexDirection: 'column' }} >
              <div className='accordian__box'>
                <div className='accordian__question' onClick={() => setShowState(!showState)}>Update Grid
                   <AiOutlinePlus size={40} onClick={() => setShowState(true)} style={{ transition: '0.3s' }} /> 
                    <AiOutlineMinus size={40} onClick={() => setShowState(false)} style={{ transition: '0.3s' }} />
                </div>
                <div style={{ height: showState ? "auto" : 0, overflow: 'hidden', transition: "0.3s" }} className='accordian__answer'>
                    <form style={{margin: '20px auto'}} onSubmit={fetchUpdateOrder}>
                        <FormInput type="date" placeholder="Meter Date" onChange={handleChange}  name="meterDate" value={meterDate} />
                        <FormInput type="date" placeholder="Meter Date" onChange={handleChange}  name="meterApproveDate" value={meterApproveDate}/>
                        <Button type="submit" title="Submit" background="gray" width="100%" margin="10px 10px"/>
                    </form>
                </div>
              </div>
            </div>
        </div>
        </>
    )
}

export default UpdateAssignedOrders
