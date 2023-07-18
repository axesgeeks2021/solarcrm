import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";

import pho from "../../assets/images/login-solar-banner.jpg";
import Heading from "../../components/heading/Heading";
import { useCookies } from "react-cookie";
import axios from "axios";

function Homepage() {
  const [cookies] = useCookies();

  const [status, setStatus] = useState([]);

  const getOrderStatus = async () => {
    const res = await axios.get("http://65.0.45.255:8000/home_status", {
      headers: {
        Authorization: `Token ${cookies.Authorization}`,
      },
    });
    const data = await res.data;
    console.log(data)
    setStatus(data);
  };

  useEffect(() => {
    getOrderStatus();
  }, []);

  return (
    <>
      <section
        style={{ zIndex: "-1" }}
        className="flex flex-col gap-5 justify-center items-center py-5 overflow-hidden"
      >
        <Heading
          heading="Hello Tracey And Norman Rickman,"
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
          />
          <Card
            src={pho}
            heading="Order details"
            text="Document Submission"
            status={status[0]?.doc_status}
            link="/customer/documents-upload"
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
