import React, { useEffect } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstallation } from "../../features/InstallationSlice";

function InstallationDetails() {
  const [cookies] = useCookies();

  const dispatch = useDispatch();

  const install = useSelector((state) => state.install);

  useEffect(() => {
    dispatch(fetchInstallation(cookies.Authorization));
  }, []);

  return (
    <>
      <section className="w-screen">
        <Heading
          heading="Installation Details"
          size="1.9rem"
          weight="600"
          color="black"
        />
        <Heading
          heading="In this page you will find information concerning the progress of your solar PV system installation."
          size="1rem"
          weight="600"
          color="black"
        />
        <PageHeading heading1="Installation Details" heading2="Download" />
        <div className="grid__connection__cards flex justify-evenly items-center gap-10">
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>
                {install.data.install?.ins_booking_date
                  .toString()
                  .substring(0, 10)}
              </p>
              <p>Installation Booking Date</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>${install.data.install?.payment_due}</p>
              <p>Payment Due</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>Click Here</p>
              <p>Pay Now</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>{install.data.install?.installation_status}</p>
              <p>Installation Status</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>{install.data.install?.net_meter_status}</p>
              <p>Net Meter Status</p>
            </div>
          </div>
        </div>
        <div className="block"></div>
        <div className="important__notice">
          <Heading heading="Important Notice" size="1.6rem" weight="600" />
          <ol className="my-2 p-2">
            <li>
              Once the installation has been Completed and all the documents
              have been received from the installer, we will forward those
              documents to you or the retailer depending upon your Energy
              retailer’s process. If we send the documents directly to your
              energy retailer, we will inform you.
            </li>
            <li>
              It is then your responsibility to inform your Energy retailer. We
              are not liable to communicate with your Energy retailer on your
              behalf.
            </li>
            <li>
              We are not liable to any compensate loss of energy or access to
              Feed-in-Tariff due to your lack of actions concerning the
              installation of the Net Meter.
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}

export default InstallationDetails;
