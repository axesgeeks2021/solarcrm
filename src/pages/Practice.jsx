import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

function Practice() {

  const [selectDate, setSelectDate] = useState(new Date())

  const [listOfDates, setListOfDates] = useState([])

  const handleDates = day => {
    setSelectDate(day)
    setListOfDates([...listOfDates, day])
  }

  return (
    <>
      <section style={{width: '100%', height: '100vh', background: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <div style={{width: "100%", height: '50vh', border: '1px solid black',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Calendar onChange={day => handleDates(day.toString().split(' 00:')[0])} value={selectDate} />
        </div>
        <div style={{width: "100%", height: '50vh', border: '1px solid black',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          {
            listOfDates.length > 0 ? listOfDates.map((ele, idx) => {
              return(
                <li key={idx}>{ele}</li>
              )
            }) : null
          }
          
        </div>
      </section>
    </>
  )
}

export default Practice