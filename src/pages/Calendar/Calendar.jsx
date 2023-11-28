import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { useCookies } from 'react-cookie'

function Calendars() {

    const [cookies] = useCookies()

    const [modal, setModal] = useState(false)
    const [selectDate, setSelectDate] = useState(new Date())

    const [listOfDates, setListOfDates] = useState([])

    const [listOfSlots, setListOfSlots] = useState({})

    const handleDates = day => {
        setSelectDate(day)
        setListOfDates([...listOfDates, day])
    }

    const fetchSlots = () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch("https://solar365.co.in/slots_list/", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setListOfSlots(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const subscribe = fetchSlots()

        return () => [subscribe]
    }, [])

    return (
        <>
            <section style={{ width: '100%', background: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ width: '40%', background: '#fff', position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', height: '30%', display: modal ? 'flex' : 'none', justifyContent: 'space-between', boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3), -2px -2px 20px 2px rgba(0,0,0,0.3)', borderRadius: '5px', backfaceVisibility: 'hidden', alignItems: 'center', flexDirection: 'column' }}>
                    <p style={{ fontSize: '1.1rem', margin: '5% 2%', alignSelf: 'flex-start' }}>Please press confirm to book your slot</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <button style={{ background: 'green', color: 'white', fontWeight: '600', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px' }}>Confirm</button>
                        <button onClick={() => setModal(false)} style={{ background: '', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px', fontWeight: '600' }}>Cancel</button>
                    </div>
                </div>
                <div style={{ width: "100%", border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
                    <Calendar onChange={day => handleDates(day.toString().split(' 00:')[0])} value={selectDate} tileContent='' />
                </div>
                <div style={{ width: "100%", border: '1px solid black', display: 'flex', justifyContent: 'flex-start', padding: '10px 10px', alignItems: 'center', flexDirection: 'column', height: '50vh', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>
                    <table style={{ background: 'gray', border: '2px solid white', margin: '20px 10px', }}>
                        <thead >
                            <tr>
                                <th style={{ padding: '10px 0' }}>S.No</th>
                                <th style={{ padding: '10px 0' }}>Dates</th>
                                <th style={{ padding: '10px 0' }}>Slots</th>
                                <th style={{ padding: '10px 0' }}>Booking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listOfSlots?.data?.map((ele, idx) => {
                                    return (
                                        <tr key={idx} style={{ background: idx % 2 === 0 ? 'black' : 'white', border: idx % 2 === 0 ? '2px solid white' : '2px solid black' }}>
                                            <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{idx + 1}</td>
                                            <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{ele?.date}</td>
                                            <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>{ele?.remaininig_slots}</td>
                                            <td style={{ padding: '5px 0', color: idx % 2 === 0 ? 'white' : 'black', fontWeight: '600' }}>
                                                <button onClick={() => setModal(true)} style={{ background: idx % 2 === 0 ? 'white' : 'black', color: idx % 2 !== 0 ? 'white' : 'black', padding: '4px 15px', borderRadius: '3px' }}>Book</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Calendars

// import React from 'react'
// // import Calendar from '@event-calendar/core';
// // import TimeGrid from '@event-calendar/time-grid';

// import '@event-calendar/core/index.css';

// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css';





// const events = [
//     {
//         id: 1,
//         title: 'Hello',
//         startDate: new Date(2023, 7, 22),
//         endDate: new Date(2023, 7, 26)
//     },
//     {
//         id: 2,
//         title: 'world',
//         startDate: new Date(2023, 7, 8),
//         endDate: new Date(2023, 7, 13)
//     },
//     {
//         id: 1,
//         title: 'say',
//         startDate: new Date(2023, 7, 1),
//         endDate: new Date(2023, 7, 3)
//     },
// ]

// function Calendars() {
//     const localizer = momentLocalizer(moment)
//   return (
//     <div>
//     <Calendar
//       localizer={localizer}
//       events={events}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 600 }}
//       selectable={'ignoreEvents'}
//     />
//   </div>
//   )
// }

// export default Calendars