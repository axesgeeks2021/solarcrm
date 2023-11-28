import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
const menuItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Services',
    url: '/services',
    submenu: [
      {
        title: 'web design',
        url: 'web-design',
      },
      {
        title: 'web development',
        url: 'web-dev',
      },
      {
        title: 'SEO',
        url: 'seo',
      },
    ],
  },
  {
    title: 'About',
    url: '/about',
  },
];

// function Practice() {

//   const [selectDate, setSelectDate] = useState(new Date())

//   const [listOfDates, setListOfDates] = useState([])

//   const handleDates = day => {
//     setSelectDate(day)
//     setListOfDates([...listOfDates, day])
//   }

//   return (
//     <>
//       <section style={{width: '100%', height: '100vh', background: 'lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
//         <div style={{width: "100%", height: '50vh', border: '1px solid black',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//           <Calendar onChange={day => handleDates(day.toString().split(' 00:')[0])} value={selectDate} />
//         </div>
//         <div style={{width: "100%", height: '50vh', border: '1px solid black',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
//           {
//             listOfDates.length > 0 ? listOfDates.map((ele, idx) => {
//               return(
//                 <li key={idx}>{ele}</li>
//               )
//             }) : null
//           }

//         </div>
//       </section>
//     </>
//   )
// }

const options = [
  {
    label: 'Home',
    value: 'Home'
  },
  {
    label: 'Electrician',
    value: 'Electrician'
  },
  {
    label: 'Installer',
    value: 'Installer'
  },
]

import Dropdown from 'react-multilevel-dropdown';


const Dropdowns = () => {
  const [selectedOption, setSelectedOption] = useState("");

  console.log(selectedOption)

  const [list, setList] = useState([])

  console.log(list)

  const fetchGetInstaller = () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token 0732c5ac3e806a5cc13a0147ff81e0017b9c647d`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/get_installer_profile/", requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          setList(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = fetchGetInstaller()

    return () => subscribe
  }, [])

  return (
    <section style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Dropdown
        title='Dropdown title'
        
      >
        <Dropdown.Item
        >
          Electrician
          <Dropdown.Submenu>
            {
              list?.Electrician?.map((ele, idx) => {
                return (
                  <Dropdown.Item onClick={() => setSelectedOption(ele?.admin?.user?.id)}>
                    {
                      ele?.admin?.user?.first_name
                    }
                  </Dropdown.Item>
                )
              })
            }
          </Dropdown.Submenu>
        </Dropdown.Item>
        <Dropdown.Item >
          Installer
          <Dropdown.Submenu>
            {
              list?.Installer?.map((ele, idx) => {
                return (
                  <Dropdown.Item onClick={() => setSelectedOption(ele?.admin?.user?.id)}>
                    {
                      ele?.admin?.user?.first_name
                    }
                  </Dropdown.Item>
                )
              })
            }
          </Dropdown.Submenu>
        </Dropdown.Item>
      </Dropdown>
    </section>
  );
};

export default Dropdowns;

