import React, { useState } from "react";
import Input from "../../components/inputsfield/Input";
import Heading from "../../components/heading/Heading";

import logo from "../../assets/images/logo.webp";
import Button from "../../components/Button/Button";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Loading from "../../components/loading/Loading"
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies();

  const [loading, setLoading] = useState(false)

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [urlParams, setUrlParams] = useState("")
  const [text, setText] = useState({
    username: "",
    password: "",
  });

  const { username, password } = text;

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };


  const getLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const myHeaders = new Headers();
      myHeaders.append("Cookie", "csrftoken=fNiUPJtpHuwOF0mTvC7UBQ7AxmXSMAg3eKqclbKGPCbnEsvvpiu4Bz6f9FWDOrEr; sessionid=frqid0r3440wl6wpg6696ldn0g6man6o");

      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      const url = `https://solar365.co.in/login/?user_type=${urlParams}`
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoading(false)
          
          if (result?.user?.user_type === 'CUSTOMER') {
            setCookie("Authorization", result?.token, {path: '/'});
            localStorage.setItem('auth', JSON.stringify(result))
            return navigate("/");
          }
          if (result?.user?.user_type === 'ADMIN') {
            setCookie("Authorization", result?.token, {path: '/'});
            localStorage.setItem('auth', JSON.stringify(result))
            return navigate("/admin");
          }
          if (result?.user?.admin?.user?.user_type === 'NON_ADMIN') {
            setCookie("Authorization", result?.token, {path: '/'});
            localStorage.setItem('auth', JSON.stringify(result))
            return navigate("/non-admin");
          }
          if (result?.user?.admin?.user?.user_type === 'TEAM') {
            setCookie("Authorization", result?.token, {path: '/'});
            localStorage.setItem('auth', JSON.stringify(result))
            return navigate("/team-dashboard");
          }
          return toast.error(result?.message)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  };

  if (loading) {
    return (
      <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <section className="login">
        <div className="login-box" >
          <div className="flex justify-start items-start overflow-hidden flex-col" >
            <img
              src={logo}
              alt="website logo"
              style={{ width: "50%", objectFit: "cover", position: "relative" }}
            />
            <Heading heading="Welcome to solar365" size="2rem" weight="600" />
          </div>
          <p>
            Login to access your solar system details, warranty information &
            refer friends.
          </p>
          <div className="flex justify-start items-center gap-6 flex-wrap" >
            <span className="solar-related">Solar</span>
            <span className="solar-related">Inverter</span>
            <span className="solar-related">Battery</span>
            <span className="solar-related">Commercial</span>
            <span className="solar-related">Residential</span>
          </div>
          <form
            style={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: 0, gap: '10px' }}
            className=""
            onSubmit={getLogin}
          >
            <select value={urlParams} onChange={e => setUrlParams(e.target.value)} style={{ width: '100%', border: '2px solid #CDD9ED', padding: '5px 0' }} required>
              <option defaultChecked>Select User Type</option>
              <option value="ADMIN">Admin</option>
              <option value="NON_ADMIN">Non Admin</option>
              <option value="CUSTOMER">Customer</option>
              <option value="TEAM">Team</option>
            </select>
            <Input
              type="text"
              placeholder="Project ID"
              value={username}
              name="username"
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Pin Number"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              title="Submit"
              width="120px"
              color="white"
              background="#f8690e"
            />
          </form>
        </div>
        <div className="login-image flex justify-start items-center flex-col">
          <div className="flex justify-start items-center gap-5">
            <Heading heading="Save" size="3rem" weight="600" />
            <Heading
              heading="energy"
              size="3rem"
              weight="600"
              color="#f8690e"
            />
          </div>
          <div className="flex justify-start items-center gap-5">
            <Heading heading="Save" size="3rem" weight="600" />
            <Heading heading="Money" size="3rem" weight="600" color="#f8690e" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
