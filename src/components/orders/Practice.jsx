import React from 'react'

function OrderList(props) {

    const lists = {"name": "kalim", "names": "hello", length: 2}

    const RenderList = (lists) => {
        let list = Array.from(lists).map((ele, idx) => {
            return(
                <p>{idx}</p>
            )
        })

        return list
    }

  return (
    <li className="table-row">
        <div className='bg-teal-300 w-200 h-100'>
            {
                props.val.map((ele, idx) => {
                    return(
                        <p>{ele}</p>
                    )
                })
            }
        </div>
      {/* <div className={`col col-2 text-center`}>{props.Id}</div>
      <div className={`col col-2 text-center`}>{props.Project}</div>
      <div className={`col col-2 text-center`}>{props.CustomerName}</div>
      <div className={`col col-2 text-center`}>{props.SystemSize}</div>
      <div className={`col col-2 text-center`}>{props.BuildingType}</div>
      <div className={`col col-2 text-center`}>{props.NmiNo}</div> */}
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