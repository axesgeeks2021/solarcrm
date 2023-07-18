import { useEffect, useState } from 'react';
import AdminSideNavigation from '../menu/AdminSideNavigation';
import Button from '../../../components/Button/Button';
import FormInput from '../../../components/inputsfield/FormInput';

import { useCookies } from "react-cookie";

// import {BiSolidUserBadge} from "react-icons/bi"
import {HiOutlineMail} from "react-icons/hi"
import {SiGooglestreetview} from "react-icons/si"
import {FaCity, FaClipboard} from "react-icons/fa"
// import {TbBuildingEstate} from "react-icons/tb"



function AdminProfile() {

  const [cookies] = useCookies();


  const [changeText, setChangeText] = useState('')

  const [value, setValue] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: ""
  })

  const { currentPassword, password, confirmPassword } = value

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }


  const [adminProfile, setAdminProfile] = useState(null)

  const [display, setDisplay] = useState({
    forget: false,
    change: false
  })

  const fetchAdminData = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("http://65.0.45.255:8000/get_admin_profile/1/?query=ADMIN", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setAdminProfile(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

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

      fetch("http://65.0.45.255:8000/forgot-password/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const forgetPassword = () => {

    if (currentPassword === "" || password === "" || confirmPassword === "") {
      alert("Please fill all the fields!")
      return
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Token ${cookies.Authorization}`)

      const formdata = new FormData();
      formdata.append("current_password", currentPassword);
      formdata.append("password", password);
      formdata.append("confirm_password", confirmPassword);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://65.0.45.255:8000/change-password/", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = fetchAdminData()

    return () => subscribe
  }, [])


  return (
    <>
      <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ width: "20%" }}>
          <AdminSideNavigation />
        </div>
        <div style={{ width: "80%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0', flexDirection: 'column' }}>
          <div style={{ width: "100%", display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2%', padding: '0% 4%' }}>
            <Button title="Change Password" background="yellow" color="black" onclick={() => setDisplay({ change: !display.change, forget: false })} />
            <Button title="Forget Password" background="red" color="white" onclick={() => setDisplay({ forget: !display.forget, change: false })} />
          </div>
          <div style={{ margin: '15px 0' }}>
            <article className="card">
              <div className="image">
                <img src="https://assets.codepen.io/652/photo-1468777675496-5782faaea55b.jpeg" alt="mixed vegetable salad in a mason jar. " />
                <p className="note" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', borderBottom: '1px solid black'}}><FaClipboard size={20}/>Profile</p>
              </div>
              <div className="card__content">
                <h2 className="card_title">{adminProfile?.user?.first_name} {adminProfile?.user?.last_name}</h2>
                <p className="card_title" style={{fontSize: "1.3rem", borderBottom: '1px solid black'}}>{adminProfile?.user?.user_type}</p>
                {/* <p>Dig into the freshest veggies of the season! This salad-in-a-jar features a mixture of leafy greens and seasonal vegetables, fresh from the farmer's market.</p> */}
                {/* <p className="list-label">Served with your choice of dressing:</p> */}
                <ul style={{borderBottom: '1px solid black'}}>
                  <li><HiOutlineMail size={20} style={{marginRight: "10px"}} color='black'/> {adminProfile?.user?.email}</li>
                  <li><SiGooglestreetview size={20} style={{marginRight: "10px"}} color='black'/>{adminProfile?.address_line}</li>
                  <li><FaCity size={20} style={{marginRight: "10px"}} color='black'/>{adminProfile?.city}</li>
                  <li><FaCity size={20} style={{marginRight: "10px"}} color='black'/>{adminProfile?.state}</li>
                  <li><FaCity size={20} style={{marginRight: "10px"}} color='black'/>{adminProfile?.country}</li>
                </ul>
                {/* <h3 className="label">Add to your meal:</h3>
        <p className="add-ons">Your choice of protein for an $2 more.</p> */}
              </div>
            </article>
          </div>
          {
            display.change && <div style={{ width: "50%", background: 'white', position: 'absolute', overflow: 'hidden', padding: "10% 5%", boxShadow: "2px 2px 10px 1px rgba(0,0,0,0.4), -2px -2px 10px 1px rgba(0,0,0,0.4)", borderRadius: 4 }}>
              <FormInput placeholder="Enter your valid e-Mail id..." width="65%" value={changeText} onChange={e => setChangeText(e.target.value)} />
              <Button title="Submit" background="green" color="white" onclick={changePassword} />
              <Button title="Close" background="orange" color="white" onclick={() => setDisplay({ change: false })} margin="0 10px" />
            </div>
          } 
          {
            display.forget && <div style={{ width: "50%", background: 'white', position: 'absolute', overflow: 'hidden', gap: '20px', padding: "6% 5%", boxShadow: "2px 2px 10px 1px rgba(0,0,0,0.4), -2px -2px 10px 1px rgba(0,0,0,0.4)", borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <FormInput placeholder="Current Password" width="90%" value={currentPassword} onChange={handleChange} name="currentPassword" />
              <FormInput placeholder="Password" width="90%" value={password} onChange={handleChange} name="password" />
              <FormInput placeholder="Confirm Password" width="90%" value={confirmPassword} onChange={handleChange} name="confirmPassword" />
              <div style={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center', width: "100%", gap: '10px' }}>
                <Button title="Submit" background="green" color="white" onclick={forgetPassword} />
                <Button title="Close" background="orange" color="white" onclick={() => setDisplay({ forget: false })} />
              </div>
              <p><span>Note : </span>Password should be contain atleast 1 capital alphabet, 1 number , 1 small alphabet and 1 symbol and minimum of 8 words</p>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default AdminProfile