import React, {useState} from 'react'
import TeamSideNavigation from './Menu/InstallationTeamNavigation'
import Button from '../../components/Button/Button'

function TeamProfile() {
    const [adminProfile, setAdminProfile] = useState(JSON.parse(localStorage.getItem('auth')))

    const changePassword = () => {
        if (changeText === "") {
          alert('Enter your valid email id!')
          return
        }
    
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          const raw = JSON.stringify({
            "email": changeText
          });
    
          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch("https://solar365.co.in/change-password/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        } catch (error) {
          console.log(error)
        }
      }
    
  return (
    <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
    <div style={{ width: "20%" }}>
      <TeamSideNavigation />
    </div>
    <div style={{ width: "80%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0', flexDirection: 'column' }}>
      <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2%', padding: '0% 4%' }}>
        <Button title="Change Password" background="yellow" color="black" onclick={() => setDisplay({ change: !display.change, forget: false })} />
        {/*<Button title="Forget Password" background="red" color="white" onclick={() => setDisplay({ forget: !display.forget, change: false })} />*/}
      </div>
      <div className="completejobs__box">
        <div className="header">
          <p>Personal Details</p>
        </div>
        <div className='content'>
          <div>
            <p>Username: {adminProfile?.user?.admin?.user?.username}</p>
            <p>Name: {adminProfile?.user?.admin?.user?.first_name} {adminProfile?.user?.admin?.user?.last_name}</p>
          </div>
          <div>
            <p>Email: {adminProfile?.user?.admin?.user?.email}</p>
            <p>Phone: {adminProfile?.user?.admin?.user?.phone}</p>
          </div>
          <div>
            <p>Address: {adminProfile?.user?.admin?.address_line}</p>
            <p>City: {adminProfile?.user?.admin?.city}</p>
          </div>
          <div>
            <p>State: {adminProfile?.user?.admin?.state}</p>
            <p>Country: {adminProfile?.user?.admin?.country}</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default TeamProfile
