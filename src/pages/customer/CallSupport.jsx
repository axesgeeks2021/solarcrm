import React, { useState } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useCookies } from "react-cookie";

function CallSupport() {
  const [requestType] = useState([
    "Refund Request",
    "Installation Booking Request",
    "System Not Working",
    "Wifi/Monitoring Setup Request",
    "Other Request",
  ]);

  const [selectRequest, setSelectRequest] = useState([]);

  const [cookies] = useCookies();

  const [requestData, setRequestData] = useState("");

  const handleChange = (e) => {
    setRequestData(e.target.value);
  };

  const body = {
    reason_type: requestData,
    tell_us: selectRequest.toString(),
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://solar365.co.in/api/cust-request/",
      body,
      {
        headers: {
          Authorization: `Token ${cookies.Authorization}`,
        },
      }
    );

    const data = await res.data;
  };
  return (
    <>
      <section className="documents__container w-screen mb-20">
        <div className=" headings w-full">
          <Heading
            heading="Customer Request"
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
        <PageHeading heading2="Customer Help" />
        <div className="customer__form__request w-2/3 m-auto">
          <Heading
            heading="Customer Request"
            size="1.9rem"
            weight="600"
            color="black"
            align="start"
            classname="mb-2"
          />
          <Heading
            heading="We need you to supply some documentation to ensure small-scale technology certificate(STC) eligibility and grid connection permits done correctly."
            size="1rem"
            weight="600"
            color="black"
            classname="mb-8"
            align="start"
          />
          <form onSubmit={sendRequest}>
            <Multiselect
              options={requestType}
              isObject={false}
              singleSelect
              onSelect={(e) => setSelectRequest([...e])}
              onRemove={(e) => setSelectRequest([...e])}
            />
            <textarea
              className="textarea mt-2 w-full"
              placeholder="Enter your request here..."
              onChange={handleChange}
              value={requestData}
              required
            />
            <button
              type="submit"
              className="pre__site__button"
              style={{ padding: "5px 70px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CallSupport;
