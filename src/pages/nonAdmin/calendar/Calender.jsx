import React, { useState } from 'react';
import Calendar from 'react-calendar';

// import Calendar from 'react-awesome-calendar';

// import { CalendarComponent } from '@syncfusion/ej2-react-calendars';


const events = [{
    id: 1,
    color: '#fd3153',
    from: '2023-06-02T18:00:00+00:00',
    to: '2023-06-05T19:00:00+00:00',
    title: 'This is an event'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2023-06-10T13:00:00+00:00',
    to: '2023-06-15T14:00:00+00:00',
    title: 'This is another event'
}, {
    id: 3,
    color: '#3694DF',
    from: '2023-06-18T13:00:00+00:00',
    to: '2023-06-18T20:00:00+00:00',
    title: 'This is also another event'
}]; 

function Calender() {

    const [value, onChange] = useState(new Date());

    const [selectedDates , setSelectedDates] = useState([])

    console.log(selectedDates)

    const handleDates = (val) => {
        setSelectedDates([...selectedDates, val])
    } 

    return (
        <div>
            <Calendar onChange={day => handleDates(day.toLocaleString().split(',')[0])} value={value} />
        </div>
    )
}

export default Calender