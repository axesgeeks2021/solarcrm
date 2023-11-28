import React, { useEffect } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import Line from '../../../components/heading/Line'
import Heading from '../../../components/heading/Heading'
import Button from '../../../components/Button/Button'
import { useState } from 'react'
import FormsContainer from '../Forms/FormsContainer'
import FormInput from '../../../components/inputsfield/FormInput'
import Loading from '../../../components/loading/Loading'

import { useCookies } from "react-cookie";
import Input from '../../../components/inputsfield/Input'
import { toast } from 'react-toastify'

function OtherComponentPriceDetails() {
  const navigate = useNavigate()
  const data = useLocation()

  console.log('new lsdf', data)
  const [cookies, removeCookies] = useCookies()
  const [displayForm, setDisplayForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [companyList, setCompanyList] = useState([])
  const [otherComponentList, setOtherComponentList] = useState([])
  const [otherComponentDetails, setOtherComponentDetails] = useState({})
  const [deleteForm, setDeleteForm] = useState(false)
  const [value, setValue] = useState({
    company: '',
    component: '',
    price: '',
    freeQuantity: ""
  })

  const { company, component, price, freeQuantity } = value

  const handleChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const fetchCompanyList = () => {
    try {
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/get_none_admin_profile/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoading(false)
          setCompanyList(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const fetchOtherComponent = () => {
    try {
      setLoading(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/other_component/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoading(false)
          setOtherComponentList(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const updateOrder = () => {
    if (price === "") {
      return alert('Please fill price...')
    }
    try {
      const loadingId = toast.loading('Please wait...')
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      const formdata = new FormData();
      formdata.append("price", price);
      formdata.append("price", price);
      
      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/pricing-other_component/${data?.state?.ele?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setDisplayForm(false)
          setValue({
            price: ''
          })
          toast.update(loadingId, { render: 'updated successfully...', isLoading: false, autoClose: true, type: 'success' })
          return fetchRecord()
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRecord = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/pricing-other_component/${data?.state?.ele?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setOtherComponentDetails(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const deleteRecord = () => {
    try {
      console.log('weo')
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const subscribe = fetchCompanyList()
    const subscribe2 = fetchOtherComponent()
    const subscribe3 = fetchRecord()

    return () => [subscribe, subscribe2, subscribe3]
  }, [])

  return (
    <div className='admin__order__container' style={{ justifyContent: 'flex-start' }}>
      <div className='flex justify-end items-center gap-5 py-2 px-4' style={{ width: "100%", borderBottom: '2px solid lightgray' }}>
        <div style={{ width: '50%' }}>
          <Button title="Go Back" color="white" background="lightgray" onclick={() => navigate(-1)} alignSelf="flex-start" />
        </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '20px', padding: '0 10px' }}>
          <Button title="Update" color="white" background="orange" onclick={() => setDisplayForm(!displayForm)} />
          <Button title="Delete" color="white" background="red" onclick={() => setDeleteForm(true)} />
          {
            deleteForm && 
            <div style={{ padding: '0px 20px',paddingBottom: '20px', background: 'beige', position: 'fixed', top: "50%", left: "50%", transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.1), -2px -2px 10px 2px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
            <p style={{margin: '20px 0'}}>Are you sure want to delete?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button title="Ok" background="#4bb543" margin="0px 10px" color="#fff" onclick={deleteRecord}/>
              <Button title="Cancel" background="orange" color="#fff" onclick={() => setDeleteForm(false)}/>
            </div>
          </div>
          }
         
        </div>
      </div>
      <div className='admin__card'>
        <div className='admin__order__details'>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Heading heading="Battery Details" size="32px" weight="600" color="#F95738" classname="heading__background" />
          </div>
          <hr></hr>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Company" value={otherComponentDetails?.company?.company_name} />
            <Line title="Component Name" value={otherComponentDetails?.other_component?.code} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: "10px 0" }}>
            <Line title="Price" value={otherComponentDetails?.price} />
          </div>
        </div>
      </div>
      {
        displayForm && <FormsContainer flexDirection="column">
          <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
            <Heading heading="Update your other your component price..." size="200%" />
          </div>
          <form style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <select required style={{ border: "2px solid gray", padding: '3px 10px', width: "100%" }}>
                <option>{otherComponentDetails?.company?.company_name}</option>
              </select>
              <select required style={{ border: "2px solid gray", padding: '3px 10px', width: "100%", margin: '5px 10px' }}>
                <option >{otherComponentDetails?.other_component?.code}</option>
              </select>

            </div>
            <div style={{ width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
              <Input placeholder="Price" onChange={handleChange} name="price" value={price} />
            </div>

            <div style={{ width: '90%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', margin: '10px 0', gap: '10px' }}>
              <Button title="Submit" background="orange" color="white" onclick={updateOrder} />
              <Button title="Close" background="gray" color="white" onclick={() => setDisplayForm(false)} />
            </div>
          </form>
        </FormsContainer>
      }
    </div>
  )
}

export default OtherComponentPriceDetails
