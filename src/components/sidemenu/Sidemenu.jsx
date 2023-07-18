import React from "react";

import logo from "../../assets/images/logo.webp";
import { Link } from "react-router-dom";

import { MdClose } from "react-icons/md";

function Sidemenu({ show, showmenu, logout, setShow }) {
  return (
    <>
      <div
        className="sidemenu flex justify-start items-center flex-col gap-10 "
        style={{
          transform: show ? "translateX(-310px)" : "translateX(0)",
          background: show ? "transparent" : "white",
        }}
      >
        <MdClose className="close" onClick={showmenu} />
        <div className="logo-img">
          <img src={logo} alt="website logo" className="cursor-pointer" />
        </div>
        <div className="menu">
          <ul className="menu flex justify-center items-center flex-col gap-4">
            <li onClick={() => setShow(true)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/order-details">Order Details</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/pre-site-risk-assessment">
                Pre-Site Risk Assessment
              </Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/billing-info">Billing Info</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/documents-upload">Documents upload</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/grid-connection-approval">
                Grid Connection Approval
              </Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/installation-details">Installation Details</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/document-warranty">Documents & Warranty</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/call-support">Call Support</Link>
            </li>
            <li onClick={() => setShow(true)}>
              <Link to="/refer-a-friend">Refer A Friend</Link>
            </li>
            <li onClick={logout}>Logout</li>
            {/* <li onClick={() => setShow(true)}>
              <Link to="/login">Login</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidemenu;
