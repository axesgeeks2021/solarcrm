import React, { useState } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";

import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function PreSiteRiskAssessment() {
  const [cookies] = useCookies();

  const [checkHazards, setCheckHazards] = useState(false);
  const [checkRoof, setCheckRoof] = useState(false);
  const [checkTension, setCheckTension] = useState(false);
  const [checkDamaged, setCheckDamaged] = useState("false");
  const [checkExposed, setCheckExposed] = useState("false");
  const [checkVehicle, setCheckVehicle] = useState(false);
  const [checkPresence, setCheckPresence] = useState(false);
  const [checkConcerns, setCheckConcerns] = useState(false);

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

  const [selectRoofValue, setSelectRoofValue] = useState([]);

  const convertValue = (val) => {
    if (val === true || val === "true") {
      return "yes";
    } else if (val === false || val === "false") {
      return "No";
    } else {
      return "null";
    }
  };

  const [range, setRange] = useState("");

  const handlechange = (e) => {
    setRange(e.target.value);
  };

  const [file, setFile] = useState(null);
  const [document, setDocument] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const getRiskData = async () => {
    const formdata = new FormData();
    formdata.append("approximate_age", range);
    formdata.append("hazards", convertValue(checkHazards));
    formdata.append("select_hazards", selectHazards);
    formdata.append("roof_structure", selectRoofValue);
    formdata.append("document_attachment", document);
    formdata.append("moss", convertValue(checkRoof));
    formdata.append("moss_comment", mossComment);
    formdata.append("high_tension", convertValue(checkTension));
    formdata.append("high_tension_attachment", file);
    formdata.append("damaged_severley", convertValue(checkDamaged));
    formdata.append("any_damage", convertValue(checkExposed));
    formdata.append("vehicle_activities", convertValue(checkVehicle));
    formdata.append("asbestos_presence", convertValue(checkPresence));
    formdata.append("safety_concerns", convertValue(checkConcerns));
    formdata.append("safety_concerns_comment", safetyComment);

    const res = await axios.put(
      "http://solar365.co.in/presite_risk/1/",
      formdata,
      {
        headers: {
          Authorization: `Token ${cookies.Authorization}`,
        },
      }
    );

    const data = await res.data;
    toast.success("Your assessment has been submitted successfully");
  };

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
            <div className="options">
              <select name="" id="" onChange={handlechange}>
                <option defaultValue="Select Your Range">
                  Select Your Value
                </option>
                <option value="0 to 5">0 to 5</option>
                <option value="5 to 10">5 to 10</option>
                <option value="10 to 20">10 to 20</option>
                <option value="30+">30+</option>
              </select>
            </div>
            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any obvious hazards while approaching or entering your
                property?
              </p>
            </div>
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkHazards ? "#34a446" : "",
                  border: checkHazards ? "none" : "2px solid black",
                }}
                onClick={() => setCheckHazards(true)}
              >
                <p style={{ color: checkHazards ? "#34a446" : "" }}>Yes</p>
              </div>
              <div
                className="select__options"
                style={{
                  background: !checkHazards ? "#34a446" : "",
                  border: !checkHazards ? "none" : "2px solid black",
                }}
                onClick={() => setCheckHazards(false)}
              >
                <p
                  style={{
                    color: !checkHazards ? "#34a446" : "",
                  }}
                >
                  No
                </p>
              </div>
            </div>
            <div
              className="additional"
              style={{ visibility: checkHazards ? "visible" : "hidden" }}
            >
              <Multiselect
                isObject={false}
                options={hazards}
                placeholder="Select Hazards"
                onRemove={(e) => setSelectHazards([...e])}
                onSelect={(e) => setSelectHazards([...e])}
              />
            </div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any part of the roof structure is fragile/brittle or
                has skylights?
              </p>
            </div>
            <div className="options">
              <Multiselect
                isObject={false}
                options={roofValue}
                placeholder="Select Roof Structure"
                onRemove={(e) => setSelectRoofValue([...e])}
                onSelect={(e) => setSelectRoofValue([...e])}
              />
            </div>
            <div className="additional">
              <input
                type="file"
                onChange={(e) => setDocument(e.target.files[0])}
              />
            </div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there build up of moss/algae/dew on the roof which may make
                it slippery?
              </p>
            </div>
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkRoof ? "#34a446" : "",
                  border: checkRoof ? "none" : "2px solid black",
                }}
                onClick={() => setCheckRoof(true)}
              >
                <p style={{ color: checkRoof ? "#34a446" : "" }}>Yes</p>
              </div>
              <div
                className="select__options"
                style={{
                  background: !checkRoof ? "#34a446" : "",
                  border: !checkRoof ? "none" : "2px solid black",
                }}
                onClick={() => setCheckRoof(false)}
              >
                <p
                  style={{
                    color: !checkRoof ? "#34a446" : "",
                  }}
                >
                  No
                </p>
              </div>
            </div>
            <div
              className="additional"
              style={{ visibility: checkRoof ? "visible" : "hidden" }}
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
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkTension ? "#34a446" : "",
                  border: checkTension ? "none" : "2px solid black",
                }}
                onClick={() => setCheckTension(true)}
              >
                <p style={{ color: checkTension ? "#34a446" : "" }}>Yes</p>
              </div>
              <div
                className="select__options"
                style={{
                  background: !checkTension ? "#34a446" : "",
                  border: !checkTension ? "none" : "2px solid black",
                }}
                onClick={() => setCheckTension(false)}
              >
                <p
                  style={{
                    color: !checkTension ? "#34a446" : "",
                  }}
                >
                  No
                </p>
              </div>
            </div>
            <div
              className="additional"
              style={{ visibility: checkTension ? "visible" : "hidden" }}
            >
              <input type="file" onChange={handleFile} />
            </div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Has the roof been damaged severley in the past and been repaired
                since then?
              </p>
            </div>
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkDamaged === "true" ? "#34a446" : "",
                  border: checkDamaged === "true" ? "none" : "2px solid black",
                }}
                onClick={() => setCheckDamaged("true")}
              >
                <p style={{ color: checkDamaged === "true" ? "#34a446" : "" }}>
                  Yes
                </p>
              </div>
              <div
                className="select__options"
                style={{
                  background: checkDamaged === "false" ? "#34a446" : "",
                  border: checkDamaged === "false" ? "none" : "2px solid black",
                }}
                onClick={() => setCheckDamaged("false")}
              >
                <p
                  style={{
                    color: checkDamaged === "false" ? "#34a446" : "",
                  }}
                >
                  No
                </p>
              </div>
              <div
                className="select__options"
                style={{
                  background: checkDamaged === "null" ? "#34a446" : "",
                  border: checkDamaged === "null" ? "none" : "2px solid black",
                }}
                onClick={() => setCheckDamaged("null")}
              >
                <p
                  style={{
                    color: checkDamaged === "null" ? "#34a446" : "",
                  }}
                >
                  Not&nbsp;Sure
                </p>
              </div>
            </div>
            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Is there any damaged or exposed electrical cable which can be
                concern of installer?
              </p>
            </div>
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkExposed === "true" ? "#34a446" : "",
                  border: checkExposed === "true" ? "none" : "2px solid black",
                }}
                onClick={() => setCheckExposed("true")}
              >
                <p style={{ color: checkExposed === "true" ? "#34a446" : "" }}>
                  Yes
                </p>
              </div>
              <div
                className="select__options"
                style={{
                  background: checkExposed === "false" ? "#34a446" : "",
                  border: checkExposed === "false" ? "none" : "2px solid black",
                }}
                onClick={() => setCheckExposed("false")}
              >
                <p
                  style={{
                    color: checkExposed === "false" ? "#34a446" : "",
                    // fontWeight: !checkHazards ? "700" : "400",
                  }}
                >
                  No
                </p>
              </div>
              <div
                className="select__options"
                style={{
                  background: checkExposed === "null" ? "#34a446" : "",
                  border: checkExposed === "null" ? "none" : "2px solid black",
                }}
                onClick={() => setCheckExposed("null")}
              >
                <p
                  style={{
                    color: checkExposed === "null" ? "#34a446" : "",
                  }}
                >
                  Not&nbsp;Sure
                </p>
              </div>
            </div>
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
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkVehicle ? "#34a446" : "",
                  border: checkVehicle ? "none" : "2px solid black",
                }}
                onClick={() => setCheckVehicle(true)}
              >
                <p style={{ color: checkVehicle ? "#34a446" : "" }}>Yes</p>
              </div>
              <div
                className="select__options"
                style={{
                  background: !checkVehicle ? "#34a446" : "",
                  border: !checkVehicle ? "none" : "2px solid black",
                }}
                onClick={() => setCheckVehicle(false)}
              >
                <p
                  style={{
                    color: !checkVehicle ? "#34a446" : "",
                    // fontWeight: !checkHazards ? "700" : "400",
                  }}
                >
                  No
                </p>
              </div>
            </div>
            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Are you aware of any asbestos presence inside the electricty
                meter box or roof?
              </p>
            </div>
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkPresence ? "#34a446" : "",
                  border: checkPresence ? "none" : "2px solid black",
                }}
                onClick={() => setCheckPresence(true)}
              >
                <p style={{ color: checkPresence ? "#34a446" : "" }}>Yes</p>
              </div>
              <div
                className="select__options"
                style={{
                  background: !checkPresence ? "#34a446" : "",
                  border: !checkPresence ? "none" : "2px solid black",
                }}
                onClick={() => setCheckPresence(false)}
              >
                <p
                  style={{
                    color: !checkPresence ? "#34a446" : "",
                    // fontWeight: !checkHazards ? "700" : "400",
                  }}
                >
                  No
                </p>
              </div>
            </div>
            <div className="additional"></div>
          </div>
          <div className="assesment">
            <div className="question">
              <p>
                Any other Safety concerns which you would like to mention about
                and we haven't asked you?
              </p>
            </div>
            <div className="options">
              <div
                className="select__options"
                style={{
                  background: checkConcerns ? "#34a446" : "",
                  border: checkConcerns ? "none" : "2px solid black",
                }}
                onClick={() => setCheckConcerns(true)}
              >
                <p style={{ color: checkConcerns ? "#34a446" : "" }}>Yes</p>
              </div>
              <div
                className="select__options"
                style={{
                  background: !checkConcerns ? "#34a446" : "",
                  border: !checkConcerns ? "none" : "2px solid black",
                }}
                onClick={() => setCheckConcerns(false)}
              >
                <p
                  style={{
                    color: !checkConcerns ? "#34a446" : "",
                  }}
                >
                  No
                </p>
              </div>
            </div>
            <div
              className="additional"
              style={{ visibility: checkConcerns ? "visible" : "hidden" }}
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
          <button
            type="button"
            className="pre__site__button"
            onClick={getRiskData}
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
}

export default PreSiteRiskAssessment;
