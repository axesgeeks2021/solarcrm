import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";

import pho from "../../assets/images/login-solar-banner.jpg";
import Heading from "../../components/heading/Heading";
import { useCookies } from "react-cookie";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { fetchingOrders } from "../../features/OrderSlice";

function Homepage({ showSlotModal, setShowSlotModal,setBookingStatus  }) {

  const [cookies] = useCookies();
  const dispatch = useDispatch()
 
  const orders = useSelector(state => state.order)
  const { data, error, loading } = orders;

  
  const [userData, setUserData] = useState({})
  const [status, setStatus] = useState([]);
  const [listOfSlots, setListOfSlots] = useState({})
  const [bookModal, setBookModal] = useState({
    status: false,
    date: null
  })

  const getOrderStatus = async () => {
    const res = await axios.get("https://solar365.co.in/home_status", {
      headers: {
        Authorization: `Token ${cookies.Authorization}`,
      },
    });
    const data = await res.data;
    console.log('status', data)
    setStatus(data);
    return fetchBookingSlotsDetails(data[0]?.id) 
  };

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
          setListOfSlots(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const updateSlots = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const formdata = new FormData();
      formdata.append("appointment_date", bookModal.date);
      formdata.append("project", data?.order?.project);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/take-appointment/", requestOptions)
        .then(response => response.json())
        .then(result => {

          if (result.message === 'success') {
            toast.success('Your appointment has been booked')
            setBookModal({
              status: false,
              date: null
            })
            setShowSlotModal(false)
            return [fetchSlots(), getOrderStatus()]
          }
          console.log('booking', result)
        }
        )
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }
  const fetchBookingSlotsDetails = (id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3KEGrC3nJhaRe1T3aORf4oEo3QoN0bvu; sessionid=a3z1zr9yzah6nzespvylq9f2wfyhjjji");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/take-appointment/${id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('booking status', result)
            return setBookingStatus(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    const subscribe = getOrderStatus();
    const subscribe1 = fetchSlots()

    const user = JSON.parse(localStorage.getItem('auth'))
    setUserData(user)

    dispatch(fetchingOrders(cookies.Authorization));

    return () => [subscribe, subscribe1]
  }, []);

  return (
    <>
      <div style={{ zIndex: 110, width: '40%', background: '#fff', position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', height: '30%', display: bookModal.status ? 'flex' : 'none', justifyContent: 'space-between', boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3), -2px -2px 20px 2px rgba(0,0,0,0.3)', borderRadius: '5px', backfaceVisibility: 'hidden', alignItems: 'center', flexDirection: 'column' }}>
        <p style={{ fontSize: '1.1rem', margin: '5% 2%', alignSelf: 'flex-start' }}>Please press confirm to book your slot</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button style={{ background: 'green', color: 'white', fontWeight: '600', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px' }} onClick={updateSlots}>Confirm</button>
          <button onClick={() => setBookModal({
            status: false,
            date: null
          })} style={{ background: '', margin: '3% 1%', padding: '4px 15px', borderRadius: '3px', fontWeight: '600' }}>Cancel</button>
        </div>
      </div>
      <div style={{ height: '80vh', overflowY: 'scroll', position: 'fixed', zIndex: 100, background: '#fff', backdropFilter: 'blur(10px)', padding: '20px 20px', width: "70%", display: showSlotModal ? 'flex' : 'none', justifyContent: 'center', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: '2px 2px 10px 2px rgba(0,0,0,0.4), -2px -2px 10px 2px rgba(0,0,0,0.4)', borderRadius: '4px' }}>
        <AiOutlineClose style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} size={25} onClick={() => setShowSlotModal(false)} />
        <table style={{ background: '#34a446', color: '#fff', border: '2px solid #000', margin: '20px 10px', }}>
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
                  <tr key={idx} style={{ background: "#fff", border: '2px solid black' }}>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>{idx + 1}</td>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>{ele?.date}</td>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>{ele?.remaininig_slots}</td>
                    <td style={{ padding: '5px 0', color: 'black', fontWeight: '600' }}>
                      <button onClick={() => setBookModal({
                        status: true,
                        date: ele?.date
                      })} disabled={ele?.remaininig_slots === 0 ? true : false} style={{ background: ele?.remaininig_slots === 0 ? "#ccc" : "#34a446" , color: 'white', padding: '4px 15px', borderRadius: '3px' }}>Book</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <section
        style={{ zIndex: "-1" }}
        className="flex flex-col gap-5 justify-center items-center py-5 overflow-hidden"
      >
        <Heading
          heading={`Hello ${userData?.user?.first_name} ${userData?.user?.last_name} - ${userData?.user?.username}`}
          color="black"
          size="1.4rem"
          weight="600"
        />
        <Heading
          heading="Welcome to the Solar365"
          color="black"
          size="1.2rem"
          weight="600"
        />
        <div className="w-screen flex justify-center items-center card-box">
          <Card
            src={pho}
            heading="Order details"
            text="Order Details"
            status={status[0]?.order_status}
            link="/customer/order-details"

          />
          <Card
            src={pho}
            heading="Order details"
            text="Pre-Site Risk Assessment"
            status={status[0]?.presite_status}
            link="/customer/pre-site-risk-assessment"
            id={status[0]?.id}
          />
          <Card
            src={pho}
            heading="Order details"
            text="Document Submission"
            status={status[0]?.doc_status}
            link="/customer/documents-upload"
            id={status[0]?.id}
          />
        </div>
        <div className="w-screen flex justify-center items-center card-box">
          <Card
            src={pho}
            heading="Order details"
            text="Grid Connection Approval"
            status={status[0]?.grid_status}
            link="/customer/grid-connection-approval"
          />
          <Card
            src={pho}
            heading="Order details"
            text="Installation Details"
            status={status[0]?.installation_status}
            link="/customer/installation-details"
          />
          <Card
            src={pho}
            heading="Order details"
            text="Documents & Warranties"
            status={status[0]?.war_status}
            link="/customer/document-warranty"
          />
        </div>
      </section>
    </>
  );
}

export default Homepage;
