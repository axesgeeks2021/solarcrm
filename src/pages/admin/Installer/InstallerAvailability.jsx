import React, { useEffect, useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import Button from '../../../components/Button/Button'
import AdminSideNavigation from '../menu/AdminSideNavigation'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function InstallerAvailability() {

  const [cookies, removeCookies] = useCookies()
  const [days, setDays] = useState([])

  function getUpcomingDays() {
    const today = new Date();
    const upcomingDays = [];
    for (let i = 0; i < 7; i++) {
      const upcomingDay = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
      upcomingDays.push(upcomingDay.toDateString());
    }

    return setDays(upcomingDays)
  }

  const logout = () => {
    removeCookies('Authorization', {path: '/'})
    return navigate('/login')
  }

  useEffect(() => {
    const day = getUpcomingDays()

    return () => day
  }, [])


  return (
    <div className='container-fluid' style={{ display: 'flex', flexDirection: 'row' }}>
      <div>
        <AdminSideNavigation />
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '10px', padding: '0 23px' }}>
          <BiLogOut />
          <Button title="Logout" onclick={logout} />
        </div>
      </div>
      <div className="container py-5">

        <div>
          <div style={{ background: '#003f91', padding: '5px 0' }}>
            <p style={{ fontSize: '30px', fontWeight: '600', color: '#fff' }}>Upcoming dates for Availability</p>
          </div>
          <div style={{ background: '#eee', padding: '20px 20px' }}>
            <ul>
              {
                days.map((ele, idx) => {
                  return (
                    <Link to="/admin/list-of-installer-electrician" key={idx} state={{ele}}>
                      <div  style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', width: '100%', background: '#2B59C3', padding: '8px 10px', margin: '12px 0' }}>
                        <li style={{ background: '#F15156', width: 'calc(100% / 4 - 2%)', padding: '10px 10px', textAlign: 'center', color: '#fff', fontWeight: '500', fontSize: '24px' }}>{ele.toString().split(' ')[0]}</li>
                        <li style={{ background: '#F15156', width: 'calc(100% / 4 - 2%)', padding: '10px 10px', textAlign: 'center', color: '#fff', fontWeight: '500', fontSize: '24px' }}>{ele.toString().split(' ')[1]}</li>
                        <li style={{ background: '#F15156', width: 'calc(100% / 4 - 2%)', padding: '10px 10px', textAlign: 'center', color: '#fff', fontWeight: '500', fontSize: '24px' }}>{ele.toString().split(' ')[2]}</li>
                        <li style={{ background: '#F15156', width: 'calc(100% / 4 - 2%)', padding: '10px 10px', textAlign: 'center', color: '#fff', fontWeight: '500', fontSize: '24px' }}>{ele.toString().split(' ')[3]}</li>
                      </div>
                    </Link>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default InstallerAvailability
