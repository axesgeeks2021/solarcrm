import React, { useState } from "react";

import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";
import axios from "axios";
import { useCookies } from "react-cookie";

import { toast, ToastContainer } from "react-toastify";

function ReferAFriend() {
  const [text, setText] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    email: "",
    address: "",
    street: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const {
    firstname,
    lastname,
    mobilenumber,
    email,
    address,
    street,
    city,
    state,
    postcode,
    country,
  } = text;

  const [cookies] = useCookies();

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const body = {
    first_name: firstname,
    last_name: lastname,
    mobile_no: mobilenumber,
    email: email,
    referral_address_line: address,
    referral_street: street,
    referral_city: city,
    referral_state: state,
    referral_postcode: postcode,
    referral_country: country,
  };

  const sendReffer = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://65.1.123.138:8000/referral/", body, {
      headers: {
        Authorization: `Token ${cookies.Authorization}`,
      },
    });

    const data = await res.data;
    toast.success("Your request has been submitted successfully");
    setText({
      firstname: "",
      lastname: "",
      mobilenumber: "",
      address: "",
      email: "",
      street: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    });
  };
  return (
    <>
      <section className="w-screen">
        <ToastContainer />
        <div className="w-full">
          <Heading
            heading="Refer A Friend"
            size="1.9rem"
            weight="600"
            color="black"
          />
          <Heading
            heading="On this page you will find your system details"
            size="1.9rem"
            weight="600"
            color="black"
          />
        </div>
        <PageHeading heading1="Refer A Friend" heading2="Refer A Friend" />
        <div className="refer__form m-auto">
          <form className="form w-full" onSubmit={sendReffer}>
            <div className="input__box">
              <input
                type="text"
                className="input"
                placeholder="Full Name"
                value={firstname}
                name="firstname"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastname}
                name="lastname"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input__box">
              <input
                type="text"
                className="input"
                placeholder="Mobile Number"
                value={mobilenumber}
                name="mobilenumber"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="input"
                placeholder="e-Mail"
                value={email}
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input__box">
              <input
                type="text"
                className="input"
                placeholder="Address"
                value={address}
                name="address"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="input"
                placeholder="Street"
                value={street}
                name="street"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input__box">
              <input
                type="text"
                className="input"
                placeholder="City"
                value={city}
                name="city"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="input"
                placeholder="State"
                value={state}
                name="state"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input__box">
              <input
                type="text"
                className="input"
                placeholder="Postcode"
                value={postcode}
                name="postcode"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="input"
                placeholder="Country"
                value={country}
                name="country"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="pre__site__button"
              style={{
                marginRight: "20px",
                padding: "5px 30px",
                alignSelf: "flex-end",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ReferAFriend;
