import React, { useEffect } from "react";
import Heading from "../../components/heading/Heading";
import PageHeading from "../../components/heading/PageHeading";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchGridConnection } from "../../features/GridConnectionSlice";

function GridConnection() {
  const [cookies] = useCookies();

  const dispatch = useDispatch();

  const grid = useSelector((state) => state.grid);

  useEffect(() => {
    dispatch(fetchGridConnection(cookies.Authorization));
  }, []);
  
  return (
    <>
      <section className="w-screen">
        <Heading
          heading="Grid Connection Approval"
          size="1.9rem"
          weight="600"
          color="black"
        />
        <Heading
          heading="In this page you will find grid application status"
          size="1rem"
          weight="600"
          color="black"
        />
        <PageHeading heading1="Grid Connection" heading2="Download" />
        <div className="grid__connection__cards flex justify-evenly items-center gap-10">
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>
                {grid.data.grid_approval?.meter_date
                  .toString()
                  .substring(0, 10)}
              </p>
              <p>Meter Application Date</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              {grid.data.grid_approval?.meter_Approved_date === null ? (
                <p>Not Apporved Yet</p>
              ) : (
                <p>
                  {grid.data.grid_approval?.meter_Approved_date
                    .toString()
                    .substring(0, 10)}
                </p>
              )}
              <p>Meter Application Approved Date</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>25-01-2022</p>
              <p>Meter Date</p>
            </div>
          </div>
          <div className="grid__connection__card">
            <div className="grid__connection__details" style={{ width: "70%" }}>
              <p>{grid.data.grid_approval?.nmi_no}</p>
              <p>NMI Number</p>
            </div>
          </div>
        </div>
        <div className="block"></div>
        <div className="important__notice">
          <Heading heading="Important Notice" size="1.6rem" weight="600" />
          <ol className="my-2 p-2">
            <li>
              Please note that Grid Connection Approval in not an approval for
              the installation of a Net Meter.
            </li>
            <li>The Net Meter Will be installed by your Energy Retailer.</li>
            <li>
              It is your responsibility to communicate with your Energy retailer
              once the solar PV system is installed.
            </li>
            <li>
              We are not authorized to communicate with your Energy Retailer on
              your behalf.
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}

export default GridConnection;
