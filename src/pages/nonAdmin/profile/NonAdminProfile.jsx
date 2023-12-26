import { useEffect, useState } from 'react';
import AdminSideNavigation from '../../admin/menu/AdminSideNavigation';
import Button from '../../../components/Button/Button';
import FormInput from '../../../components/inputsfield/FormInput';
import { useCookies } from 'react-cookie';
import NonAdminSideNavigation from '../menu/NonAdminSideNavigation';
import Input from '../../../components/inputsfield/Input';

function NonAdminProfile() {

  const [cookies, removeCookies] = useCookies()
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

  const [adminProfile, setAdminProfile] = useState(JSON.parse(localStorage.getItem('auth')))

  console.log('admin profile', adminProfile)
  const [display, setDisplay] = useState({
    forget: false,
    change: false
  })


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

  const forgetPassword = () => {

    if (currentPassword === "" || password === "" || confirmPassword === "") {
      alert("Please fill all the fields!")
      return
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

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

      fetch("https://solar365.co.in/forgot-password/", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ width: "20%" }}>
          <NonAdminSideNavigation />
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
          {
            display.change && <div style={{ width: "50%", background: 'white', position: 'absolute', overflow: 'hidden', padding: "10% 5%", boxShadow: "2px 2px 10px 1px rgba(0,0,0,0.4), -2px -2px 10px 1px rgba(0,0,0,0.4)", borderRadius: 4 }}>
              <Input placeholder="Enter your valid e-Mail id..." width="65%" value={changeText} onChange={e => setChangeText(e.target.value)} />
              <Button title="Submit" background="green" color="white" onclick={changePassword} />
              <Button title="Close" background="orange" color="white" onclick={() => setDisplay({ change: false })} margin="0 10px" />
            </div>
          }
          {
            display.forget && <div style={{ width: "50%", background: 'white', position: 'absolute', overflow: 'hidden', gap: '20px', padding: "6% 5%", boxShadow: "2px 2px 10px 1px rgba(0,0,0,0.4), -2px -2px 10px 1px rgba(0,0,0,0.4)", borderRadius: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <Input placeholder="Current Password" width="90%" value={currentPassword} onChange={handleChange} name="currentPassword" />
              <Input placeholder="Password" width="90%" value={password} onChange={handleChange} name="password" />
              <Input placeholder="Confirm Password" width="90%" value={confirmPassword} onChange={handleChange} name="confirmPassword" />
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

export default NonAdminProfile