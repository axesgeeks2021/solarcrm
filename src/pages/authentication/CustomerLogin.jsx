import React, { useState } from "react";
import Input from "../../components/inputsfield/Input";
import Heading from "../../components/heading/Heading";

import logo from "../../assets/images/logo.webp";
import Button from "../../components/Button/Button";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Loading from "../../components/loading/Loading"

function Login() {
  const navigate = useNavigate();

  const [cookie, setCookie] = useCookies();

  const [loading, setLoading] = useState(false)

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [text, setText] = useState({
    username: "",
    password: "",
  });

  const { username, password } = text;

  const handleChange = (e) => {
    setText({ ...text, [e.target.name]: e.target.value });
  };

  const body = {
    username: username,
    password: password,
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

      fetch("http://solar365.co.in/login/", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setLoading(false)
          setCookie("Authorization", result.token);

          localStorage.setItem('auth', JSON.stringify(result))
          if (result.user?.user_type === 'CUSTOMER') {
            return navigate("/");
          }
          if (result.user?.user_type === 'ADMIN') {
            return navigate("/admin");
          }
          if (result.user?.admin?.user?.user_type === 'NON_ADMIN') {
            return navigate("/non-admin");
          }
          // if (result.user?.user_type === 'TEAM') {
          //   return navigate("/team-dashboard");
          // }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  };

  if(loading){
    return(
      <div style={{width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <section className="login">
        <div className="login-box">
          <div className="flex justify-start items-start overflow-hidden flex-col">
            <img
              src={logo}
              alt="website logo"
              style={{ width: "50%", objectFit: "cover", position: "relative" }}
            />
            <Heading
              heading="welcome to the solar panel"
              size="2.5rem"
              weight="600"
            />
          </div>
          <p>
            Login to access your solar system details, warranty information &
            refer friends.
          </p>
          <div className="flex justify-start items-center gap-6 flex-wrap w-72">
            <span className="solar-related">Solar</span>
            <span className="solar-related">Inverter</span>
            <span className="solar-related">Battery</span>
            <span className="solar-related">Commercial</span>
            <span className="solar-related">Residential</span>
          </div>
          <form
            style={{ width: "100%" }}
            className="flex justify-center items-start gap-5 flex-col"
            onSubmit={getLogin}
          >
            <Input
              type="text"
              placeholder="Project ID"
              value={username}
              name="username"
              onchange={handleChange}
            />
            <Input
              type="text"
              placeholder="Pin Number"
              value={password}
              name="password"
              onchange={handleChange}
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
