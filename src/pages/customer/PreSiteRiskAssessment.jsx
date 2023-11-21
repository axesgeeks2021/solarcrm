import React, { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";

import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import UploadFile from "../../components/inputsfield/UploadFile";

function PreSiteRiskAssessment() {
  const [cookies] = useCookies();
  const location = useLocation()
  const navigate = useNavigate()

  const [checkHazards, setCheckHazards] = useState("No");
  const [checkRoof, setCheckRoof] = useState("No");
  const [checkTension, setCheckTension] = useState("No");
  const [checkDamaged, setCheckDamaged] = useState("No");
  const [checkExposed, setCheckExposed] = useState("No");
  const [checkVehicle, setCheckVehicle] = useState("No");
  const [checkPresence, setCheckPresence] = useState("No");
  const [checkConcerns, setCheckConcerns] = useState("No");

  const [mossComment, setMossComment] = useState("");
  const [safetyComment, setSafetyComment] = useState("");

  const [hazards] = useState([
    "Pets",
    "Swimming Pool",
    "Slopping Ground",
    "Difficult Access",
    "Rough/Uneven roads",
    "Other",
  ]);

  const [selectHazards, setSelectHazards] = useState([]);

  const [roofValue] = useState(["None", "Fragile/Brittle", "Skylight"]);
  const [range, setRange] = useState("");

  const [selectRoofValue, setSelectRoofValue] = useState([]);
  const [file, setFile] = useState(null);
  const [document, setDocument] = useState(null);
  const [orderData, setOrderData] = useState()

  const convertValue = (val) => {
    if (val === true || val === "true") {
      return "yes";
    } else if (val === false || val === "false") {
      return "No";
    } else {
      return "null";
    }
  };

  const handlechange = (e) => {
    setRange(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const getRiskData = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=ffv5SBCT3rpgiaHd0K3aVmWClCzflJMw; sessionid=b0ybmwwag66c50h1yuezwz8ck6c7uvnf");

      const formdata = new FormData();
      formdata.append("approximate_age", range);
      formdata.append("hazards",  checkHazards);
      formdata.append("select_hazards",  selectHazards);
      formdata.append("roof_structure",  selectRoofValue);
      formdata.append("moss",  checkRoof);
      formdata.append("moss_comment",  mossComment);
      formdata.append("high_tension",  checkTension);
      formdata.append("damaged_severley",  checkDamaged);
      formdata.append("any_damage",  checkExposed);
      formdata.append("vehicle_activities",  checkVehicle);
      formdata.append("asbestos_presence",  checkPresence);
      formdata.append("safety_concerns",  checkConcerns);
      formdata.append("safety_concerns_comment",  safetyComment);

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`http://13.126.231.119/update_presite/${location?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result) {
            toast.success("Your assessment has been submitted successfully");
            return navigate('/')
          }
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }

  };

  const fetchOrder = () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Token ${cookies.Authorization}`);
      myHeaders.append("Cookie", "csrftoken=3K58yeKlyHJY3mVYwRFaBimKxWRKWrvZ; sessionid=gxzztx05okbwr01oti653d1rovjsx37z");

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      fetch(`http://13.126.231.119/order/${location?.state?.id}/`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('presite', result)
          setOrderData(result)
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscribe = fetchOrder()

    return () => [subscribe]
  }, [])

  return (
    <>
      <section className="w-screen my-5 py-12">
        <ToastContainer />
        <div className="w-full">
          <Heading
            heading="Pre Site Risk Assessment"
            size="1.9rem"
            weight="600"
            color="black"
          />
          <Heading
            heading="On this page you will find your system details"
            size="1rem"
            weight="600"
            color="black"
          />
        </div>
        <PageHeading heading2="Pre Site Risk" />
        <div className="assesment__section">
          <div className="assesment">
            <div className="question">
              <p>What is the approximate age of the property?</p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ? <div className="options">
                <select name="" id="" onChange={handlechange}>
                  <option defaultValue="Select Your Range">
                    Select Your Value
                  </option>
                  <option value="0 to 5">0 to 5</option>
                  <option value="5 to 10">5 to 10</option>
                  <option value="10 to 20">10 to 20</option>
                  <option value="30+">30+</option>
                </select>
              </div> :
                <p>{orderData?.presite?.approximate_age}</p>
            }

            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any obvious hazards while approaching or entering your
                property?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ? <div className="options">
                <div
                  className="select__options"
                  style={{
                    background: checkHazards === "Yes" ? "#34a446" : "",
                    border: checkHazards === "Yes" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckHazards("Yes")}
                >
                  <p style={{ color: checkHazards === "Yes" ? "#34a446" : "" }}>Yes</p>
                </div>
                <div
                  className="select__options"
                  style={{
                    background: checkHazards === "No" ? "#34a446" : "",
                    border: checkHazards === "No" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckHazards("No")}
                >
                  <p
                    style={{
                      color: checkHazards === "No" ? "#34a446" : "",
                    }}
                  >
                    No
                  </p>
                </div>
              </div> : <div className="options">
                <div
                  className="select__options"
                  style={{
                    background: "#34a446",
                    border: "2px solid #34a446",
                  }}
                >
                  <p style={{ color: "#34a446" }}>{orderData?.presite?.hazards}</p>
                </div>
              </div>
            }

            {
              orderData?.presite?.presite_status !== "Completed" ? <div
                className="additional"
                style={{ display: checkHazards === "Yes" ? "block" : "none" }}
              >
                <Multiselect
                  isObject={false}
                  options={hazards}
                  placeholder="Select Hazards"
                  onRemove={(e) => setSelectHazards([...e])}
                  onSelect={(e) => setSelectHazards([...e])}
                />
              </div> : <p>{orderData?.presite?.select_hazards}</p>
            }
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any part of the roof structure is fragile/brittle or
                has skylights?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ? <div className="options">
                <Multiselect
                  isObject={false}
                  options={roofValue}
                  placeholder="Select Roof Structure"
                  onRemove={(e) => setSelectRoofValue([...e])}
                  onSelect={(e) => setSelectRoofValue([...e])}
                />
              </div> : <p>{orderData?.presite?.roof_structure}</p>
            }

            <div className="additional">
              <input
                type="file"
                onChange={(e) => setDocument(e.target.files[0])}
              />
            </div>
          </div>
          <div className="assesment" >
            <div className="question">
              <p>
                Is there build up of moss/algae/dew on the roof which may make
                it slippery?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ? <div className="options">
                <div
                  className="select__options"
                  style={{
                    background: checkRoof === "Yes" ? "#34a446" : "",
                    border: checkRoof === "Yes" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckRoof("Yes")}
                >
                  <p style={{ color: checkRoof === "Yes" ? "#34a446" : "" }}>Yes</p>
                </div>
                <div
                  className="select__options"
                  style={{
                    background: checkRoof === "No" ? "#34a446" : "",
                    border: checkRoof === "No" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckRoof("No")}
                >
                  <p
                    style={{
                      color: checkRoof === "No" ? "#34a446" : "",
                    }}
                  >
                    No
                  </p>
                </div>
              </div> :
                <div className="options" style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <div
                    className="select__options"
                    style={{
                      background: "#34a446",
                      border: "2px solid #34a446",
                    }}
                  >
                    <p style={{ color: "#34a446" }}>{orderData?.presite?.moss}</p>
                  </div>
                  {
                    orderData?.presite?.moss.toLowerCase() === 'yes' ?

                      <div
                        className="additional"
                      >
                        <input
                          type="text"
                          placeholder="Leave Comment..."
                          className="comment"
                          value={orderData?.presite?.moss_comment}
                          onChange={(e) => setMossComment(e.target.value)}
                        />
                      </div> : null
                  }
                </div>
            }

            <div
              className="additional"
              style={{ visibility: checkRoof === "Yes" ? "visible" : "hidden" }}
            >
              <input
                type="text"
                placeholder="Leave Comment..."
                className="comment"
                value={mossComment}
                onChange={(e) => setMossComment(e.target.value)}
              />
            </div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any high-tension overhead electrical lines passing-by
                within 4m of roof/property?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ?
                <div className="options">
                  <div
                    className="select__options"
                    style={{
                      background: checkTension === "Yes" ? "#34a446" : "",
                      border: checkTension === "Yes" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckTension("Yes")}
                  >
                    <p style={{ color: checkTension === "Yes" ? "#34a446" : "" }}>Yes</p>
                  </div>
                  <div
                    className="select__options"
                    style={{
                      background: checkTension === "No" ? "#34a446" : "",
                      border: checkTension === "No" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckTension("No")}
                  >
                    <p
                      style={{
                        color: checkTension === "No" ? "#34a446" : "",
                      }}
                    >
                      No
                    </p>
                  </div>
                </div> : <div
                  className="select__options"
                  style={{
                    background: "#34a446",
                    border: "2px solid #34a446",
                  }}
                >
                  <p style={{ color: "#34a446" }}>{orderData?.presite?.high_tension}</p>
                </div>
            }

            <div
              className="additional"
              style={{ visibility: checkTension  === "Yes" ? "visible" : "hidden" }}
            >
            <UploadFile id="hightension" label="High Tension Attachment" onchange={handleFile} />
            </div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Has the roof been damaged severley in the past and been repaired
                since then?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ? <div className="options">
                <div
                  className="select__options"
                  style={{
                    background: checkDamaged === "Yes" ? "#34a446" : "",
                    border: checkDamaged === "Yes" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckDamaged("Yes")}
                >
                  <p style={{ color: checkDamaged === "Yes" ? "#34a446" : "" }}>
                    Yes
                  </p>
                </div>
                <div
                  className="select__options"
                  style={{
                    background: checkDamaged === "No" ? "#34a446" : "",
                    border: checkDamaged === "No" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckDamaged("No")}
                >
                  <p
                    style={{
                      color: checkDamaged === "No" ? "#34a446" : "",
                    }}
                  >
                    No
                  </p>
                </div>
                <div
                  className="select__options"
                  style={{
                    background: checkDamaged === "Not Sure" ? "#34a446" : "",
                    border: checkDamaged === "Not Sure" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckDamaged("Not Sure")}
                >
                  <p
                    style={{
                      color: checkDamaged === "Not Sure" ? "#34a446" : "",
                    }}
                  >
                    Not&nbsp;Sure
                  </p>
                </div>
              </div> : <div
                className="select__options"
                style={{
                  background: "#34a446",
                  border: "2px solid #34a446",
                }}
              >
                <p style={{ color: "#34a446" }}>
                  {orderData?.presite?.roof_damage}
                </p>
              </div>
            }

            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any damaged or exposed electrical cable which can be
                concern of installer?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ?
                <div className="options">
                  <div
                    className="select__options"
                    style={{
                      background: checkExposed === "Yes" ? "#34a446" : "",
                      border: checkExposed === "Yes" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckExposed("Yes")}
                  >
                    <p style={{ color: checkExposed === "Yes" ? "#34a446" : "" }}>
                      Yes
                    </p>
                  </div>
                  <div
                    className="select__options"
                    style={{
                      background: checkExposed === "No" ? "#34a446" : "",
                      border: checkExposed === "No" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckExposed("No")}
                  >
                    <p
                      style={{
                        color: checkExposed === "No" ? "#34a446" : "",
                      }}
                    >
                      No
                    </p>
                  </div>
                  <div
                    className="select__options"
                    style={{
                      background: checkExposed === "Not Sure" ? "#34a446" : "",
                      border: checkExposed === "Not Sure" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckExposed("Not Sure")}
                  >
                    <p
                      style={{
                        color: checkExposed === "Not Sure" ? "#34a446" : "",
                      }}
                    >
                      Not&nbsp;Sure
                    </p>
                  </div>
                </div> : <div
                  className="select__options"
                  style={{
                    background: "#34a446",
                    border: "2px solid #34a446",
                  }}
                >
                  <p
                    style={{
                      color: "#34a446",
                    }}
                  >
                    {orderData?.presite?.any_damage}
                  </p>
                </div>
            }

            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there high pedestrian/vehicle activities, education
                institute, childcare, Aged Care, Construction Site, etc around
                your premise?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ?
                <div className="options">
                  <div
                    className="select__options"
                    style={{
                      background: checkVehicle === "Yes" ? "#34a446" : "",
                      border: checkVehicle === "Yes" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckVehicle("Yes")}
                  >
                    <p style={{ color: checkVehicle === "Yes" ? "#34a446" : "" }}>Yes</p>
                  </div>
                  <div
                    className="select__options"
                    style={{
                      background: checkVehicle === "No" ? "#34a446" : "",
                      border: checkVehicle === "No" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckVehicle("No")}
                  >
                    <p
                      style={{
                        color: checkVehicle === "No" ? "#34a446" : "",
                      }}
                    >
                      No
                    </p>
                  </div>
                </div> : <div
                  className="select__options"
                  style={{
                    background: "#34a446",
                    border: "2px solid #34a446",
                  }}
                >
                  <p style={{ color: "#34a446" }}>{orderData?.presite?.vehicle_activities}</p>
                </div>
            }

            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Are you aware of any asbestos presence inside the electricty
                meter box or roof?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ?
                <div className="options">
                  <div
                    className="select__options"
                    style={{
                      background: checkPresence === "Yes" ? "#34a446" : "",
                      border: checkPresence === "Yes" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckPresence("Yes")}
                  >
                    <p style={{ color: checkPresence === "Yes" ? "#34a446" : "" }}>Yes</p>
                  </div>
                  <div
                    className="select__options"
                    style={{
                      background: checkPresence === "No" ? "#34a446" : "",
                      border: checkPresence === "No" ? "none" : "2px solid black",
                    }}
                    onClick={() => setCheckPresence("No")}
                  >
                    <p
                      style={{
                        color: checkPresence === "No" ? "#34a446" : "",
                      }}
                    >
                      No
                    </p>
                  </div>
                </div> : <div
                  className="select__options"
                  style={{
                    background: "#34a446",
                    border: "2px solid #34a446",
                  }}
                >
                  <p style={{ color: "#34a446" }}>{orderData?.presite?.asbestos_presence}</p>
                </div>
            }

            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question" >
              <p>
                Any other Safety concerns which you would like to mention about
                and we haven't asked you?
              </p>
            </div>
            {
              orderData?.presite?.presite_status !== "Completed" ? <div className="options">
                <div
                  className="select__options"
                  style={{
                    background: checkConcerns === "Yes" ? "#34a446" : "",
                    border: checkConcerns === "Yes" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckConcerns("Yes")}
                >
                  <p style={{ color: checkConcerns === "Yes" ? "#34a446" : "" }}>Yes</p>
                </div>
                <div
                  className="select__options"
                  style={{
                    background: checkConcerns === "No" ? "#34a446" : "",
                    border: checkConcerns === "No" ? "none" : "2px solid black",
                  }}
                  onClick={() => setCheckConcerns("No")}
                >
                  <p
                    style={{
                      color: checkConcerns === "No" ? "#34a446" : "",
                    }}
                  >
                    No
                  </p>
                </div>
              </div> :
                <div className="options" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div
                    className="select__options"
                    style={{
                      background: "#34a446",
                      border: "2px solid #34a446",
                      position: 'relative'
                    }}

                  >
                    <p style={{ color: "#34a446" }}>{orderData?.presite?.safety_concerns}</p>
                  </div>
                  {
                    orderData?.presite?.safety_concerns.toLowerCase() === 'yes' ? <div
                      className="additional"
                      style={{ position: 'relative' }}
                    >
                      <input
                        type="text"
                        placeholder="Leave Comment..."
                        className="comment"
                        value={orderData?.presite?.safety_concerns_comment}
                        onChange={(e) => setSafetyComment(e.target.value)}
                      />
                    </div> : null
                  }

                </div>
            }

            <div
              className="additional"
              style={{ display: checkConcerns === "Yes" ? "block" : "none" }}
            >
              <input
                type="text"
                placeholder="Leave Comment..."
                className="comment"
                value={safetyComment}
                onChange={(e) => setSafetyComment(e.target.value)}
              />
          </div>
          </div>
          {
            orderData?.presite?.presite_status !== "Completed" ? <button
              type="button"
              className="pre__site__button"
              onClick={getRiskData}
            >
              Submit
            </button> : null
          }

        </div>
      </section>
    </>
  );
}

export default PreSiteRiskAssessment;
