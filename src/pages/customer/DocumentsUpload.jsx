import React, { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";

import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumnets } from "../../features/DocumentSubmissionSlice";
import axios from "axios";

import Loading from "../../components/loading/Loading";
import { useLocation } from "react-router-dom";
import UploadFile from "../../components/inputsfield/UploadFile";
import { toast } from "react-toastify";

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
  const [meterBool, setMeterBool] = useState(false)
  const [electricityBool, setElectricityBool] = useState(false)
  const [miscBool, setMiscBool] = useState(false)

  const fileUpload = (e) => {
    setFormDataField(e.target.name);
    setUploadImage(e.target.files[0]);
    setModal(true);
  };

  const uploadDocument = () => {
    try {
      const loadingId = toast.loading("Please wait....")
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);

      const formdata = new FormData();
      formdata.append(formDataField, uploadImage);

      if (formDataField === "meter_box") {
        setMeterBool(true)
      }
      if (formDataField === "electricity_bill") {
        setElectricityBool(true)
      }
      if (formDataField === "miscellaneous_file" && allStatus?.miscellaneous?.length > 2) {
        setMiscBool(true)
      }

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://solar365.co.in/upload_meter_docs/${data?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          toast.update(loadingId, { render: 'Document updated Successfully...', type: 'success', isLoading: false, autoClose: true })
          setModal(false);
          console.log(result)
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

      fetch(`https://solar365.co.in/get_docs/${data?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setLoading(false)
          setAllStatus(result)
          console.log(result)
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
        <p style={{ position: 'absolute', left: '10px', top: '5px' }} onClick={() => setModal(false)}>X</p>
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
        <div className="documents w-full flex justify-evenly items-start flex-col gap-10">

          <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <div className={`${allStatus?.meter?.map(ele => ele?.meter_status === "Completed" ? "status" : "pending")}`}
                >
                  {allStatus?.meter?.map((ele, idx) => {
                    return (
                      <p key={idx}>{ele?.meter_status}</p>
                    )
                  })}
                </div>
              </div>
              <div className="flex w-full justify-center items-center p-3 border-t-2 border-slate-200 " style={{ fontSize: '1rem' }}>
                Meter Box Photo
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">

              <div className="uploading">
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                  {
                    allStatus?.meter?.map((ele, idx) => {
                      return ele?.meter_status !== "Completed" ? <div
                        className="file-upload-wrapper"
                        style={{ background: allStatus?.meter?.map(ele => ele?.meter_status === "Completed" ? "#99A3BA" : "#f8690e") }}
                      >
                        <UploadFile id="meter_box" onchange={fileUpload} name="meter_box" disabled={meterBool} key={idx} />
                      </div> : <a href={ele?.meter_box} style={{ background: '#34a446', color: '#fff', width: '100%', textAlign: 'center', padding: '6px 10px', fontWeight: '600' }} key={idx} download target="_blank">Download</a>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <div
                  className={`status ${allStatus?.electricity?.map(ele => ele?.electricity_status === "Completed" ? "status" : "pending")}`}
                >
                  {allStatus?.electricity?.map((ele, idx) => {
                    return (
                      <p key={idx}>{ele?.electricity_status}</p>
                    )
                  })}
                </div>
              </div>
              <div className="flex w-full justify-center items-center p-3 border-t-2 border-slate-200 " style={{ fontSize: '1rem' }}>
                Electricity Bill
              </div>
            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">

              <div className="uploading">
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                  {
                    allStatus?.electricity?.map((ele, idx) => {
                      return ele?.electricity_status !== "Completed" ?
                        <div
                          className="file-upload-wrapper"
                          style={{ background: allStatus?.electricity?.map(ele => ele?.electricity_status === "Completed" ? "#99A3BA" : "#f8690e") }}
                        >
                          <UploadFile id="electricity_bill" onchange={fileUpload} name="electricity_bill" disabled={electricityBool} />
                          <input
                            name="electricity_bill"
                            type="file"
                            className="file-upload-field"
                            onChange={fileUpload}
                          />
                        </div> : <a href={ele?.electricity_bill} style={{ background: '#34a446', color: '#fff', width: '100%', textAlign: 'center', padding: '6px 10px', fontWeight: '600' }} key={idx} download target="_blank">Download</a>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="documents__card flex justify-evenly items-center">
            <div className="document__card__details p-2">
              <div className="svg w-full flex justify-center items-center overflow-hidden py-2">
                <div
                  className={`status ${allStatus?.miscellaneous?.map(ele => ele?.miscellaneous_status === "Completed" ? "status" : "pending")}`}
                >
                  {allStatus?.miscellaneous?.slice(0, 1).map((ele, idx) => {
                    return (
                      <p key={idx}>{ele?.miscellaneous_status}</p>
                    )
                  })}
                </div>
              </div>
              <div className="misc__files flex w-full justify-center items-center p-3 border-t-2 border-slate-200 " style={{ fontSize: '1rem' }}>
                Miscellaneous
              </div>
{
  allStatus?.miscellaneous?.length > 0 ? allStatus?.miscellaneous?.map((ele, idx) => {
    return ele?.miscellaneous_status === "Completed" ?  <p key={idx} className={`files__left__indicator-${idx}`} >{4 - (1 + idx)} Files Lefts</p> : <p style={{color: "red"}} key={idx}>4 Files Lefts</p>
  }) : null
}

            </div>
            <div className="documents__connected__line"></div>
            <div className="status__uploading">
              <div className="uploading">
                <div className="container">
                  {
                    allStatus?.miscellaneous?.length > 3 ?
                      allStatus?.miscellaneous?.map((ele, idx) => {
                        return (
                          <div className="flex flex-col mt-1" key={idx} >
                            <a href={ele?.miscellaneous_file} style={{ background: '#34a446', color: '#fff', width: '100%', textAlign: 'center', padding: '6px 10px', fontWeight: '600' }} key={idx} download target="_blank">Download</a>
                          </div>
                        )
                      }) : <div
                        className="file-upload-wrapper"
                        data-text="Select your file!"
                        style={{ background: allStatus?.miscellaneous?.length > 3 ? "#99A3BA" : "#f8690e" }}
                      >
                        <UploadFile id="miscellaneous_file" onchange={fileUpload} name="miscellaneous_file" disabled={miscBool} />
                        <input
                          name="miscellaneous_file"
                          type="file"
                          className="file-upload-field"
                          onChange={fileUpload}
                          disabled={allStatus?.miscellaneous?.length > 3 ? true : false}
                        />
                      </div>
                  }

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


