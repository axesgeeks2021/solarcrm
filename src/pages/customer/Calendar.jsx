import React, {useState} from 'react'
import ApiCalender from 'react-google-calendar-api'
import Calendars from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'



const config = {
  clientId: "114425628459604314981",
  apiKey: "AIzaSyCnVGbJSCXnaNrgDWSz8RI_vIiAfHOtwJ4",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
}

const apiCalendar = new ApiCalender(config)

function Calendar() {

  const [date, setDate] = useState(new Date())


  console.log(typeof date)

  return (
    <div>
      <Calendars onChange={setDate} value={date} className="calender" />
    </div>
  )
}

export default Calendar