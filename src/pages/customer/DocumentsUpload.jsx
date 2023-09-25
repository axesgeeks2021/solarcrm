import React, { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";

import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumnets } from "../../features/DocumentSubmissionSlice";
import axios from "axios";

import Loading from "../../components/loading/Loading";
import { useLocation } from "react-router-dom";

function DocumentsUpload() {

  const data = useLocation()

  const [cookies] = useCookies();

  const dispatch = useDispatch();

  const document = useSelector((state) => state.document);

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [formDataField, setFormDataField] = useState("");
  const [allStatus, setAllStatus] = useState({})

  const fileUpload = (e) => {
    setFormDataField(e.target.name);
    setUploadImage(e.target.files[0]);
    setTimeout(() => {
      setModal(true);
    }, 1000);
  };


  const uploadDocument = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const formdata = new FormData();
      formdata.append(formDataField, uploadImage);

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/upload_meter_docs/${data?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setModal(false);
          return getStatus()
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  const getStatus = () => {
    try {
      setLoading(true)
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch("https://solar365.co.in/get_docs/", requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoading(false)
          setAllStatus(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = getStatus()

    return () => subscribe
  }, []);

  if (loading) {
    return (
      <div style={{ width: "100%", height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className="modal" style={{ display: modal ? "block" : "none" }}>
        <div className="cookiesContent" id="cookiesPopup">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
            alt="cookies-img"
          />
          <p>To upload your file Please Click Submit Button</p>
          <button className="accept" onClick={uploadDocument}>
            Submit
          </button>
        </div>
      </div>
      <section className="documents__container w-screen">
        <div className=" headings w-full">
          <Heading
            heading="Documents Submission"
            size="1.9rem"
            weight="600"
            color="black"
          />
          <Heading
            heading="We need you to supply some documentation to ensure small-scale technology certificate(STC) eligibility and grid connection permits done correctly."
            size="1rem"
            weight="600"
            color="black"
          />
        </div>
        <PageHeading heading1="Documents Upload" heading2="Download" />
        <div className="documents w-full flex justify-evenly items-center flex-col gap-10">
          {/*<div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <svg
                  version="1.2"
                  baseProfile="tiny"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <g id="Layer_2">
                    <g></g>
                  </g>
                  <g display="none">
                    <path
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      d="M201.061,256.032H54.951
        c-30.376,0-55-24.624-55-55V54.923c0-30.376,24.624-55,55-55h146.11c30.376,0,55,24.624,55,55v146.11
        C256.061,231.408,231.437,256.032,201.061,256.032z"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.013"
                      cy="127.978"
                      r="48"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="67.946"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="111.966"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="128.006"
                      y1="-19.285"
                      x2="128.006"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="239.972"
                      y1="-19.285"
                      x2="239.972"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="16.04"
                      y1="-19.285"
                      x2="16.04"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="176"
                      y1="-19.285"
                      x2="176"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="80"
                      y1="-19.285"
                      x2="80"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.625"
                      y1="127.978"
                      x2="275.612"
                      y2="127.978"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="239.943"
                      x2="275.625"
                      y2="239.943"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="16.012"
                      x2="275.625"
                      y2="16.012"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="80"
                      x2="275.625"
                      y2="80"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="176"
                      x2="275.625"
                      y2="176"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="-10.748"
                      x2="266.732"
                      y2="266.704"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="266.704"
                      x2="266.732"
                      y2="-10.748"
                    />
                  </g>
                  <g>
                    <ellipse
                      fill="none"
                      cx="205.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />

                    <ellipse
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 27.4938 160.6463)"
                      fill="none"
                      cx="207.664"
                      cy="47.135"
                      rx="15.494"
                      ry="15.494"
                    />
                    <ellipse
                      fill="none"
                      cx="65.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />
                    <polygon
                      fill="none"
                      points="96,131.97 96,168 178,168 154,131.97 	"
                    />
                    <polygon
                      fill="none"
                      points="28,138 28,168 84,168 84,131.97 28,131.97 	"
                    />
                    <path
                      d="M190.299,60.119l-12.872,12.872l4.382,4.382l12.872-12.872c2.838,2.126,6.216,3.576,9.885,4.103v18.196h6.198V68.603
        c3.669-0.527,7.047-1.977,9.885-4.103l12.872,12.872l4.382-4.382L225.03,60.119c2.126-2.838,3.576-6.216,4.103-9.885h18.196v-6.198
        h-18.196c-0.527-3.669-1.977-7.047-4.103-9.885l12.872-12.872l-4.382-4.382L220.648,29.77c-2.839-2.126-6.216-3.576-9.885-4.103
        V7.471h-6.198v18.196c-3.669,0.527-7.047,1.977-9.885,4.103l-12.872-12.872l-4.382,4.382l12.872,12.872
        c-2.126,2.838-3.576,6.216-4.103,9.885H168v6.198h18.196C186.723,53.903,188.173,57.281,190.299,60.119z M207.664,31.641
        c8.546,0,15.494,6.947,15.494,15.494s-6.947,15.494-15.494,15.494s-15.494-6.947-15.494-15.494S199.118,31.641,207.664,31.641z"
                    />
                    <path
                      d="M65.917,203.935c-14.336,0-26,11.669-26,26.014C39.917,244.294,51.664,256,66,256s25.917-11.706,25.917-26.051
        C91.917,215.604,80.253,203.935,65.917,203.935z M65.917,241.955c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006
        s12,5.386,12,12.006S72.534,241.955,65.917,241.955z"
                    />
                    <path
                      d="M244,208.011v-30.016c0-5.523-4.48-9.995-10-9.995h-40l-31.5-48H157h-6.5H28h-2H16v9.969V138v10H8c-4.42,0-8,3.56-8,7.983
        v40.022C0,200.427,3.58,204,8,204h8v20h16.458c2.8-15.959,16.702-28.066,33.462-28.066c16.75,0,30.708,12.107,33.518,28.066h72.958
        c2.8-15.959,16.764-28.066,33.524-28.066c16.75,0,30.624,12.107,33.434,28.066H248c4.42,0,8-3.563,8-7.985v-8.004H244z M84,168H28
        v-30v-6.03h56V168z M96,168v-36.03h58L178,168H96z"
                    />
                    <path
                      d="M205.917,203.935c-14.337,0-26,11.669-26,26.014C179.917,244.294,191.663,256,206,256
        c14.337,0,25.917-11.706,25.917-26.051C231.917,215.604,220.254,203.935,205.917,203.935z M205.917,241.955
        c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006s12,5.386,12,12.006S212.534,241.955,205.917,241.955z"
                    />
                    <polygon points="134.177,82.344 128.232,75.078 111.647,75.078 115.046,82.344 	" />
                    <polygon points="92.142,94.962 115.699,94.962 111.537,84.277 91.726,84.277 	" />
                    <polygon points="110.783,82.344 107.952,75.078 91.366,75.078 91.649,82.344 	" />
                    <polygon points="130.399,115.172 161.038,115.172 146.919,97.916 122.329,97.916 	" />
                    <polygon points="92.257,97.916 92.93,115.172 123.573,115.172 116.851,97.916 	" />
                    <polygon points="120.946,94.962 144.503,94.962 135.759,84.277 115.948,84.277 	" />
                    <polygon points="87.674,75.078 71.087,75.078 68.256,82.344 87.391,82.344 	" />
                    <polygon points="63.09,84.277 43.282,84.277 34.538,94.962 58.092,94.962 	" />
                    <polygon points="86.896,94.962 87.313,84.277 67.503,84.277 63.339,94.962 	" />
                    <polygon points="56.71,97.916 32.121,97.916 18,115.172 48.639,115.172 	" />
                    <polygon points="67.392,75.078 50.809,75.078 44.863,82.344 63.994,82.344 	" />
                    <polygon points="55.465,115.172 86.108,115.172 86.783,97.916 62.189,97.916 	" />
                  </g>
                </svg>
              </div>
              <div className="flex w-full justify-center items-center flex-col p-3 border-t-2 border-slate-200">
                Sign Quote / Contract
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">
              <div
                className={`status ${allStatus?.contract?.contract_status === "Completed"
                    ? "status"
                    : "pending"
                  }`}
              >
                {allStatus?.contract?.map((ele, idx) => {
                  return (
                    <p key={idx}>{ele?.contract_status}</p>
                  )
                })}
              </div>
              <div className="uploading">
                <div className="container">
                  <div className="file-upload-wrapper">
                    <input
                      name="contract_file"
                      type="file"
                      className="file-upload-field"
                      onChange={fileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
              </div>*/}
          <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <svg
                  version="1.2"
                  baseProfile="tiny"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <g id="Layer_2">
                    <g></g>
                  </g>
                  <g display="none">
                    <path
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      d="M201.061,256.032H54.951
		c-30.376,0-55-24.624-55-55V54.923c0-30.376,24.624-55,55-55h146.11c30.376,0,55,24.624,55,55v146.11
		C256.061,231.408,231.437,256.032,201.061,256.032z"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.013"
                      cy="127.978"
                      r="48"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="67.946"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="111.966"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="128.006"
                      y1="-19.285"
                      x2="128.006"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="239.972"
                      y1="-19.285"
                      x2="239.972"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="16.04"
                      y1="-19.285"
                      x2="16.04"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="176"
                      y1="-19.285"
                      x2="176"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="80"
                      y1="-19.285"
                      x2="80"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.625"
                      y1="127.978"
                      x2="275.612"
                      y2="127.978"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="239.943"
                      x2="275.625"
                      y2="239.943"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="16.012"
                      x2="275.625"
                      y2="16.012"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="80"
                      x2="275.625"
                      y2="80"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="176"
                      x2="275.625"
                      y2="176"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="-10.748"
                      x2="266.732"
                      y2="266.704"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="266.704"
                      x2="266.732"
                      y2="-10.748"
                    />
                  </g>
                  <g>
                    <ellipse
                      fill="none"
                      cx="205.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />

                    <ellipse
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 27.4938 160.6463)"
                      fill="none"
                      cx="207.664"
                      cy="47.135"
                      rx="15.494"
                      ry="15.494"
                    />
                    <ellipse
                      fill="none"
                      cx="65.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />
                    <polygon
                      fill="none"
                      points="96,131.97 96,168 178,168 154,131.97 	"
                    />
                    <polygon
                      fill="none"
                      points="28,138 28,168 84,168 84,131.97 28,131.97 	"
                    />
                    <path
                      d="M190.299,60.119l-12.872,12.872l4.382,4.382l12.872-12.872c2.838,2.126,6.216,3.576,9.885,4.103v18.196h6.198V68.603
		c3.669-0.527,7.047-1.977,9.885-4.103l12.872,12.872l4.382-4.382L225.03,60.119c2.126-2.838,3.576-6.216,4.103-9.885h18.196v-6.198
		h-18.196c-0.527-3.669-1.977-7.047-4.103-9.885l12.872-12.872l-4.382-4.382L220.648,29.77c-2.839-2.126-6.216-3.576-9.885-4.103
		V7.471h-6.198v18.196c-3.669,0.527-7.047,1.977-9.885,4.103l-12.872-12.872l-4.382,4.382l12.872,12.872
		c-2.126,2.838-3.576,6.216-4.103,9.885H168v6.198h18.196C186.723,53.903,188.173,57.281,190.299,60.119z M207.664,31.641
		c8.546,0,15.494,6.947,15.494,15.494s-6.947,15.494-15.494,15.494s-15.494-6.947-15.494-15.494S199.118,31.641,207.664,31.641z"
                    />
                    <path
                      d="M65.917,203.935c-14.336,0-26,11.669-26,26.014C39.917,244.294,51.664,256,66,256s25.917-11.706,25.917-26.051
		C91.917,215.604,80.253,203.935,65.917,203.935z M65.917,241.955c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006
		s12,5.386,12,12.006S72.534,241.955,65.917,241.955z"
                    />
                    <path
                      d="M244,208.011v-30.016c0-5.523-4.48-9.995-10-9.995h-40l-31.5-48H157h-6.5H28h-2H16v9.969V138v10H8c-4.42,0-8,3.56-8,7.983
		v40.022C0,200.427,3.58,204,8,204h8v20h16.458c2.8-15.959,16.702-28.066,33.462-28.066c16.75,0,30.708,12.107,33.518,28.066h72.958
		c2.8-15.959,16.764-28.066,33.524-28.066c16.75,0,30.624,12.107,33.434,28.066H248c4.42,0,8-3.563,8-7.985v-8.004H244z M84,168H28
		v-30v-6.03h56V168z M96,168v-36.03h58L178,168H96z"
                    />
                    <path
                      d="M205.917,203.935c-14.337,0-26,11.669-26,26.014C179.917,244.294,191.663,256,206,256
		c14.337,0,25.917-11.706,25.917-26.051C231.917,215.604,220.254,203.935,205.917,203.935z M205.917,241.955
		c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006s12,5.386,12,12.006S212.534,241.955,205.917,241.955z"
                    />
                    <polygon points="134.177,82.344 128.232,75.078 111.647,75.078 115.046,82.344 	" />
                    <polygon points="92.142,94.962 115.699,94.962 111.537,84.277 91.726,84.277 	" />
                    <polygon points="110.783,82.344 107.952,75.078 91.366,75.078 91.649,82.344 	" />
                    <polygon points="130.399,115.172 161.038,115.172 146.919,97.916 122.329,97.916 	" />
                    <polygon points="92.257,97.916 92.93,115.172 123.573,115.172 116.851,97.916 	" />
                    <polygon points="120.946,94.962 144.503,94.962 135.759,84.277 115.948,84.277 	" />
                    <polygon points="87.674,75.078 71.087,75.078 68.256,82.344 87.391,82.344 	" />
                    <polygon points="63.09,84.277 43.282,84.277 34.538,94.962 58.092,94.962 	" />
                    <polygon points="86.896,94.962 87.313,84.277 67.503,84.277 63.339,94.962 	" />
                    <polygon points="56.71,97.916 32.121,97.916 18,115.172 48.639,115.172 	" />
                    <polygon points="67.392,75.078 50.809,75.078 44.863,82.344 63.994,82.344 	" />
                    <polygon points="55.465,115.172 86.108,115.172 86.783,97.916 62.189,97.916 	" />
                  </g>
                </svg>
              </div>
              <div className="flex w-full justify-center items-center p-3 border-t-2 border-slate-200">
                Meter Box Photo
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">
              <div
                className={`status ${allStatus?.meter?.meter_status === "Completed"
                    ? "status"
                    : "pending"
                  }`}
              >
                {allStatus?.meter?.map((ele, idx) => {
                  return (
                    <p key={idx}>{ele?.meter_status}</p>
                  )
                })}
              </div>
              <div className="uploading">
                <div className="container">
                  <div
                    className="file-upload-wrapper"
                  // data-text="Select your file!"
                  >
                    <input
                      name="meter_box"
                      type="file"
                      className="file-upload-field"
                      onChange={fileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <svg
                  version="1.2"
                  baseProfile="tiny"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <g id="Layer_2">
                    <g></g>
                  </g>
                  <g display="none">
                    <path
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      d="M201.061,256.032H54.951
		c-30.376,0-55-24.624-55-55V54.923c0-30.376,24.624-55,55-55h146.11c30.376,0,55,24.624,55,55v146.11
		C256.061,231.408,231.437,256.032,201.061,256.032z"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.013"
                      cy="127.978"
                      r="48"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="67.946"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="111.966"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="128.006"
                      y1="-19.285"
                      x2="128.006"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="239.972"
                      y1="-19.285"
                      x2="239.972"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="16.04"
                      y1="-19.285"
                      x2="16.04"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="176"
                      y1="-19.285"
                      x2="176"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="80"
                      y1="-19.285"
                      x2="80"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.625"
                      y1="127.978"
                      x2="275.612"
                      y2="127.978"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="239.943"
                      x2="275.625"
                      y2="239.943"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="16.012"
                      x2="275.625"
                      y2="16.012"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="80"
                      x2="275.625"
                      y2="80"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="176"
                      x2="275.625"
                      y2="176"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="-10.748"
                      x2="266.732"
                      y2="266.704"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="266.704"
                      x2="266.732"
                      y2="-10.748"
                    />
                  </g>
                  <g>
                    <ellipse
                      fill="none"
                      cx="205.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />

                    <ellipse
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 27.4938 160.6463)"
                      fill="none"
                      cx="207.664"
                      cy="47.135"
                      rx="15.494"
                      ry="15.494"
                    />
                    <ellipse
                      fill="none"
                      cx="65.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />
                    <polygon
                      fill="none"
                      points="96,131.97 96,168 178,168 154,131.97 	"
                    />
                    <polygon
                      fill="none"
                      points="28,138 28,168 84,168 84,131.97 28,131.97 	"
                    />
                    <path
                      d="M190.299,60.119l-12.872,12.872l4.382,4.382l12.872-12.872c2.838,2.126,6.216,3.576,9.885,4.103v18.196h6.198V68.603
		c3.669-0.527,7.047-1.977,9.885-4.103l12.872,12.872l4.382-4.382L225.03,60.119c2.126-2.838,3.576-6.216,4.103-9.885h18.196v-6.198
		h-18.196c-0.527-3.669-1.977-7.047-4.103-9.885l12.872-12.872l-4.382-4.382L220.648,29.77c-2.839-2.126-6.216-3.576-9.885-4.103
		V7.471h-6.198v18.196c-3.669,0.527-7.047,1.977-9.885,4.103l-12.872-12.872l-4.382,4.382l12.872,12.872
		c-2.126,2.838-3.576,6.216-4.103,9.885H168v6.198h18.196C186.723,53.903,188.173,57.281,190.299,60.119z M207.664,31.641
		c8.546,0,15.494,6.947,15.494,15.494s-6.947,15.494-15.494,15.494s-15.494-6.947-15.494-15.494S199.118,31.641,207.664,31.641z"
                    />
                    <path
                      d="M65.917,203.935c-14.336,0-26,11.669-26,26.014C39.917,244.294,51.664,256,66,256s25.917-11.706,25.917-26.051
		C91.917,215.604,80.253,203.935,65.917,203.935z M65.917,241.955c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006
		s12,5.386,12,12.006S72.534,241.955,65.917,241.955z"
                    />
                    <path
                      d="M244,208.011v-30.016c0-5.523-4.48-9.995-10-9.995h-40l-31.5-48H157h-6.5H28h-2H16v9.969V138v10H8c-4.42,0-8,3.56-8,7.983
		v40.022C0,200.427,3.58,204,8,204h8v20h16.458c2.8-15.959,16.702-28.066,33.462-28.066c16.75,0,30.708,12.107,33.518,28.066h72.958
		c2.8-15.959,16.764-28.066,33.524-28.066c16.75,0,30.624,12.107,33.434,28.066H248c4.42,0,8-3.563,8-7.985v-8.004H244z M84,168H28
		v-30v-6.03h56V168z M96,168v-36.03h58L178,168H96z"
                    />
                    <path
                      d="M205.917,203.935c-14.337,0-26,11.669-26,26.014C179.917,244.294,191.663,256,206,256
		c14.337,0,25.917-11.706,25.917-26.051C231.917,215.604,220.254,203.935,205.917,203.935z M205.917,241.955
		c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006s12,5.386,12,12.006S212.534,241.955,205.917,241.955z"
                    />
                    <polygon points="134.177,82.344 128.232,75.078 111.647,75.078 115.046,82.344 	" />
                    <polygon points="92.142,94.962 115.699,94.962 111.537,84.277 91.726,84.277 	" />
                    <polygon points="110.783,82.344 107.952,75.078 91.366,75.078 91.649,82.344 	" />
                    <polygon points="130.399,115.172 161.038,115.172 146.919,97.916 122.329,97.916 	" />
                    <polygon points="92.257,97.916 92.93,115.172 123.573,115.172 116.851,97.916 	" />
                    <polygon points="120.946,94.962 144.503,94.962 135.759,84.277 115.948,84.277 	" />
                    <polygon points="87.674,75.078 71.087,75.078 68.256,82.344 87.391,82.344 	" />
                    <polygon points="63.09,84.277 43.282,84.277 34.538,94.962 58.092,94.962 	" />
                    <polygon points="86.896,94.962 87.313,84.277 67.503,84.277 63.339,94.962 	" />
                    <polygon points="56.71,97.916 32.121,97.916 18,115.172 48.639,115.172 	" />
                    <polygon points="67.392,75.078 50.809,75.078 44.863,82.344 63.994,82.344 	" />
                    <polygon points="55.465,115.172 86.108,115.172 86.783,97.916 62.189,97.916 	" />
                  </g>
                </svg>
              </div>
              <div className="flex w-full justify-center items-center p-3 border-t-2 border-slate-200">
                Electricity Bill
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">
              <div
                className={`status ${allStatus?.electricity?.electricity_status === "Completed"
                    ? "status"
                    : "pending"
                  }`}
              >
                {allStatus?.electricity?.map((ele, idx) => {
                  return (
                    <p key={idx}>{ele?.electricity_status}</p>
                  )
                })}
              </div>
              <div className="uploading">
                <div className="container">
                  <div
                    className="file-upload-wrapper"
                  // data-text="Select your file!"
                  >
                    <input
                      name="electricity_bill"
                      type="file"
                      className="file-upload-field"
                      onChange={fileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
         {/* <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <svg
                  version="1.2"
                  baseProfile="tiny"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <g id="Layer_2">
                    <g></g>
                  </g>
                  <g display="none">
                    <path
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      d="M201.061,256.032H54.951
		c-30.376,0-55-24.624-55-55V54.923c0-30.376,24.624-55,55-55h146.11c30.376,0,55,24.624,55,55v146.11
		C256.061,231.408,231.437,256.032,201.061,256.032z"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.013"
                      cy="127.978"
                      r="48"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="67.946"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="111.966"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="128.006"
                      y1="-19.285"
                      x2="128.006"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="239.972"
                      y1="-19.285"
                      x2="239.972"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="16.04"
                      y1="-19.285"
                      x2="16.04"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="176"
                      y1="-19.285"
                      x2="176"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="80"
                      y1="-19.285"
                      x2="80"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.625"
                      y1="127.978"
                      x2="275.612"
                      y2="127.978"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="239.943"
                      x2="275.625"
                      y2="239.943"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="16.012"
                      x2="275.625"
                      y2="16.012"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="80"
                      x2="275.625"
                      y2="80"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="176"
                      x2="275.625"
                      y2="176"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="-10.748"
                      x2="266.732"
                      y2="266.704"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="266.704"
                      x2="266.732"
                      y2="-10.748"
                    />
                  </g>
                  <g>
                    <ellipse
                      fill="none"
                      cx="205.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />

                    <ellipse
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 27.4938 160.6463)"
                      fill="none"
                      cx="207.664"
                      cy="47.135"
                      rx="15.494"
                      ry="15.494"
                    />
                    <ellipse
                      fill="none"
                      cx="65.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />
                    <polygon
                      fill="none"
                      points="96,131.97 96,168 178,168 154,131.97 	"
                    />
                    <polygon
                      fill="none"
                      points="28,138 28,168 84,168 84,131.97 28,131.97 	"
                    />
                    <path
                      d="M190.299,60.119l-12.872,12.872l4.382,4.382l12.872-12.872c2.838,2.126,6.216,3.576,9.885,4.103v18.196h6.198V68.603
		c3.669-0.527,7.047-1.977,9.885-4.103l12.872,12.872l4.382-4.382L225.03,60.119c2.126-2.838,3.576-6.216,4.103-9.885h18.196v-6.198
		h-18.196c-0.527-3.669-1.977-7.047-4.103-9.885l12.872-12.872l-4.382-4.382L220.648,29.77c-2.839-2.126-6.216-3.576-9.885-4.103
		V7.471h-6.198v18.196c-3.669,0.527-7.047,1.977-9.885,4.103l-12.872-12.872l-4.382,4.382l12.872,12.872
		c-2.126,2.838-3.576,6.216-4.103,9.885H168v6.198h18.196C186.723,53.903,188.173,57.281,190.299,60.119z M207.664,31.641
		c8.546,0,15.494,6.947,15.494,15.494s-6.947,15.494-15.494,15.494s-15.494-6.947-15.494-15.494S199.118,31.641,207.664,31.641z"
                    />
                    <path
                      d="M65.917,203.935c-14.336,0-26,11.669-26,26.014C39.917,244.294,51.664,256,66,256s25.917-11.706,25.917-26.051
		C91.917,215.604,80.253,203.935,65.917,203.935z M65.917,241.955c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006
		s12,5.386,12,12.006S72.534,241.955,65.917,241.955z"
                    />
                    <path
                      d="M244,208.011v-30.016c0-5.523-4.48-9.995-10-9.995h-40l-31.5-48H157h-6.5H28h-2H16v9.969V138v10H8c-4.42,0-8,3.56-8,7.983
		v40.022C0,200.427,3.58,204,8,204h8v20h16.458c2.8-15.959,16.702-28.066,33.462-28.066c16.75,0,30.708,12.107,33.518,28.066h72.958
		c2.8-15.959,16.764-28.066,33.524-28.066c16.75,0,30.624,12.107,33.434,28.066H248c4.42,0,8-3.563,8-7.985v-8.004H244z M84,168H28
		v-30v-6.03h56V168z M96,168v-36.03h58L178,168H96z"
                    />
                    <path
                      d="M205.917,203.935c-14.337,0-26,11.669-26,26.014C179.917,244.294,191.663,256,206,256
		c14.337,0,25.917-11.706,25.917-26.051C231.917,215.604,220.254,203.935,205.917,203.935z M205.917,241.955
		c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006s12,5.386,12,12.006S212.534,241.955,205.917,241.955z"
                    />
                    <polygon points="134.177,82.344 128.232,75.078 111.647,75.078 115.046,82.344 	" />
                    <polygon points="92.142,94.962 115.699,94.962 111.537,84.277 91.726,84.277 	" />
                    <polygon points="110.783,82.344 107.952,75.078 91.366,75.078 91.649,82.344 	" />
                    <polygon points="130.399,115.172 161.038,115.172 146.919,97.916 122.329,97.916 	" />
                    <polygon points="92.257,97.916 92.93,115.172 123.573,115.172 116.851,97.916 	" />
                    <polygon points="120.946,94.962 144.503,94.962 135.759,84.277 115.948,84.277 	" />
                    <polygon points="87.674,75.078 71.087,75.078 68.256,82.344 87.391,82.344 	" />
                    <polygon points="63.09,84.277 43.282,84.277 34.538,94.962 58.092,94.962 	" />
                    <polygon points="86.896,94.962 87.313,84.277 67.503,84.277 63.339,94.962 	" />
                    <polygon points="56.71,97.916 32.121,97.916 18,115.172 48.639,115.172 	" />
                    <polygon points="67.392,75.078 50.809,75.078 44.863,82.344 63.994,82.344 	" />
                    <polygon points="55.465,115.172 86.108,115.172 86.783,97.916 62.189,97.916 	" />
                  </g>
                </svg>
              </div>
              <div className="flex w-full justify-center items-center p-3 border-t-2 border-slate-200">
                Council Rates Notice
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">
              <div
                className={`status ${allStatus?.council?.council_status === "Completed"
                    ? "status"
                    : "pending"
                  }`}
              >
                {allStatus?.council?.map((ele, idx) => {
                  return (
                    <p key={idx}>{ele?.council_status}</p>
                  )
                })}
              </div>
              <div className="uploading">
                <div className="container">
                  <div
                    className="file-upload-wrapper"
                  // data-text="Select your file!"
                  >
                    <input
                      name="council_rate"
                      type="file"
                      className="file-upload-field"
                      onChange={fileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
              </div>*/}
          <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <svg
                  version="1.2"
                  baseProfile="tiny"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  xmlSpace="preserve"
                >
                  <g id="Layer_2">
                    <g></g>
                  </g>
                  <g display="none">
                    <path
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      d="M201.061,256.032H54.951
		c-30.376,0-55-24.624-55-55V54.923c0-30.376,24.624-55,55-55h146.11c30.376,0,55,24.624,55,55v146.11
		C256.061,231.408,231.437,256.032,201.061,256.032z"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.013"
                      cy="127.978"
                      r="48"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="67.946"
                    />

                    <circle
                      display="inline"
                      fill="none"
                      stroke="#00993E"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      cx="128.006"
                      cy="127.978"
                      r="111.966"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="128.006"
                      y1="-19.285"
                      x2="128.006"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="239.972"
                      y1="-19.285"
                      x2="239.972"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="16.04"
                      y1="-19.285"
                      x2="16.04"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="176"
                      y1="-19.285"
                      x2="176"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="80"
                      y1="-19.285"
                      x2="80"
                      y2="275.952"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.625"
                      y1="127.978"
                      x2="275.612"
                      y2="127.978"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="239.943"
                      x2="275.625"
                      y2="239.943"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="16.012"
                      x2="275.625"
                      y2="16.012"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="80"
                      x2="275.625"
                      y2="80"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#7A7A7A"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-19.612"
                      y1="176"
                      x2="275.625"
                      y2="176"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="-10.748"
                      x2="266.732"
                      y2="266.704"
                    />

                    <line
                      display="inline"
                      fill="none"
                      stroke="#990000"
                      strokeWidth="0.25"
                      strokeMiterlimit="10"
                      x1="-10.72"
                      y1="266.704"
                      x2="266.732"
                      y2="-10.748"
                    />
                  </g>
                  <g>
                    <ellipse
                      fill="none"
                      cx="205.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />

                    <ellipse
                      transform="matrix(0.7071 -0.7071 0.7071 0.7071 27.4938 160.6463)"
                      fill="none"
                      cx="207.664"
                      cy="47.135"
                      rx="15.494"
                      ry="15.494"
                    />
                    <ellipse
                      fill="none"
                      cx="65.917"
                      cy="229.949"
                      rx="12"
                      ry="12.006"
                    />
                    <polygon
                      fill="none"
                      points="96,131.97 96,168 178,168 154,131.97 	"
                    />
                    <polygon
                      fill="none"
                      points="28,138 28,168 84,168 84,131.97 28,131.97 	"
                    />
                    <path
                      d="M190.299,60.119l-12.872,12.872l4.382,4.382l12.872-12.872c2.838,2.126,6.216,3.576,9.885,4.103v18.196h6.198V68.603
		c3.669-0.527,7.047-1.977,9.885-4.103l12.872,12.872l4.382-4.382L225.03,60.119c2.126-2.838,3.576-6.216,4.103-9.885h18.196v-6.198
		h-18.196c-0.527-3.669-1.977-7.047-4.103-9.885l12.872-12.872l-4.382-4.382L220.648,29.77c-2.839-2.126-6.216-3.576-9.885-4.103
		V7.471h-6.198v18.196c-3.669,0.527-7.047,1.977-9.885,4.103l-12.872-12.872l-4.382,4.382l12.872,12.872
		c-2.126,2.838-3.576,6.216-4.103,9.885H168v6.198h18.196C186.723,53.903,188.173,57.281,190.299,60.119z M207.664,31.641
		c8.546,0,15.494,6.947,15.494,15.494s-6.947,15.494-15.494,15.494s-15.494-6.947-15.494-15.494S199.118,31.641,207.664,31.641z"
                    />
                    <path
                      d="M65.917,203.935c-14.336,0-26,11.669-26,26.014C39.917,244.294,51.664,256,66,256s25.917-11.706,25.917-26.051
		C91.917,215.604,80.253,203.935,65.917,203.935z M65.917,241.955c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006
		s12,5.386,12,12.006S72.534,241.955,65.917,241.955z"
                    />
                    <path
                      d="M244,208.011v-30.016c0-5.523-4.48-9.995-10-9.995h-40l-31.5-48H157h-6.5H28h-2H16v9.969V138v10H8c-4.42,0-8,3.56-8,7.983
		v40.022C0,200.427,3.58,204,8,204h8v20h16.458c2.8-15.959,16.702-28.066,33.462-28.066c16.75,0,30.708,12.107,33.518,28.066h72.958
		c2.8-15.959,16.764-28.066,33.524-28.066c16.75,0,30.624,12.107,33.434,28.066H248c4.42,0,8-3.563,8-7.985v-8.004H244z M84,168H28
		v-30v-6.03h56V168z M96,168v-36.03h58L178,168H96z"
                    />
                    <path
                      d="M205.917,203.935c-14.337,0-26,11.669-26,26.014C179.917,244.294,191.663,256,206,256
		c14.337,0,25.917-11.706,25.917-26.051C231.917,215.604,220.254,203.935,205.917,203.935z M205.917,241.955
		c-6.617,0-12-5.385-12-12.006c0-6.62,5.383-12.006,12-12.006s12,5.386,12,12.006S212.534,241.955,205.917,241.955z"
                    />
                    <polygon points="134.177,82.344 128.232,75.078 111.647,75.078 115.046,82.344 	" />
                    <polygon points="92.142,94.962 115.699,94.962 111.537,84.277 91.726,84.277 	" />
                    <polygon points="110.783,82.344 107.952,75.078 91.366,75.078 91.649,82.344 	" />
                    <polygon points="130.399,115.172 161.038,115.172 146.919,97.916 122.329,97.916 	" />
                    <polygon points="92.257,97.916 92.93,115.172 123.573,115.172 116.851,97.916 	" />
                    <polygon points="120.946,94.962 144.503,94.962 135.759,84.277 115.948,84.277 	" />
                    <polygon points="87.674,75.078 71.087,75.078 68.256,82.344 87.391,82.344 	" />
                    <polygon points="63.09,84.277 43.282,84.277 34.538,94.962 58.092,94.962 	" />
                    <polygon points="86.896,94.962 87.313,84.277 67.503,84.277 63.339,94.962 	" />
                    <polygon points="56.71,97.916 32.121,97.916 18,115.172 48.639,115.172 	" />
                    <polygon points="67.392,75.078 50.809,75.078 44.863,82.344 63.994,82.344 	" />
                    <polygon points="55.465,115.172 86.108,115.172 86.783,97.916 62.189,97.916 	" />
                  </g>
                </svg>
              </div>
              <div className="flex w-full justify-center items-center p-3 border-t-2 border-slate-200">
                Miscellaneous
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">
              <div
                className={`status ${allStatus?.miscellaneous?.miscellaneous_status === "Completed"
                    ? "status"
                    : "pending"
                  }`}
              >
                {allStatus?.miscellaneous?.map((ele, idx) => {
                  return (
                    <p key={idx}>{ele?.miscellaneous_status}</p>
                  )
                })}
              </div>
              <div className="uploading">
                <div className="container">
                  <div
                    className="file-upload-wrapper"
                  // data-text="Select your file!"
                  >
                    <input
                      name="misxcellaneous_file"
                      type="file"
                      className="file-upload-field"
                      onChange={fileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DocumentsUpload;
