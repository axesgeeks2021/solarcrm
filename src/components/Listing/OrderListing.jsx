import React from "react";

function OrderListing({ data }) {

  console.log('datais m ', data)
  return (
    <>
      <ol className="gradient-list flex flex-wrap justify-evenly items-center relative overflow-hidden order__list">
        <li>
          Project : <span>{data.order?.project}</span>
        </li>
        <li>
          System Size : <span>{data.order?.system_Size}</span>
        </li>
         <li>
          Building Type : <span>{data.order?.building_Type}</span>
        </li>
        <li>
          NMI Number : <span>{data.order?.nmi_no}</span>
        </li>
        <li>
          Panels : <span>{data.order?.panels?.code}</span>
        </li>
        <li>
          Inverrter(s) : <span>{data.order?.inverter?.code}</span>
        </li>
        <li>
          Meter Phase : <span>{data.order?.meter_Phase}</span>
        </li>
        <li>
          Installation Type : <span>{data.order?.installation_Type}</span>
        </li>
      </ol>
    </>
  );
}

export default OrderListing;
