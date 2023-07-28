import React from 'react'

function OrderList(props) {

  return (
    <li className="table-row">
      <div className={`col col-1 text-center`}>{props.Id}</div>
      <div className={`col col-2 text-center`}>{props.Project}</div>
      <div className={`col col-2 text-center`}>{props.CustomerName}</div>
      <div className={`col col-2 text-center`}>{props.SystemSize}</div>
      <div className={`col col-2 text-center`}>{props.BuildingType}</div>
      <div className={`col col-2 text-center`}>{props.NmiNo}</div>
      {/* <div className="col col-1 text-center">{props.Panels}</div>
      <div className="col col-1 text-center">{props.Inverter}</div>
      <div className="col col-1 text-center">{props.MeterPhase}</div>
      <div className="col col-1 text-center">{props.OrderStatus}</div>
      <div className="col col-1 text-center">{props.Manufacturer}</div>
      <div className="col col-1 text-center">{props.SmartMeter}</div> */}
    </li>
  )
}

export default OrderList