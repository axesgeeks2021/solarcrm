import React from "react";

import logo from "../../assets/images/logo.webp";
import Heading from "../heading/Heading";
import Button from "../Button/Button";
import { useCookies } from "react-cookie";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

function Header({ showmenu, logout, setShowSlotModal, bookingStatus }) {
  console.log('header appointment', bookingStatus)
  return (
    <>
      <header className="w-full overflow-hidden mb-2">
        <div className="w-full bg-yellow-400 flex justify-between items-center" style={{ background: "#0C70D4" }}>
          <p className="text-white pl-10">{bookingStatus?.reason}</p>
        </div>
        <nav className="w-full flex justify-between items-center overflow-hidden mt-2">
          <div className="website__logo w-2/5 overflow-hidden flex justify-start items-center px-12 py-2">
            <GiHamburgerMenu className="hamburgermenu" onClick={showmenu} />
            <img
              src={logo}
              alt="wesbite-logo"
              className="relative object-cover w-1/3 ml-5 cursor-pointer"
            />
          </div>
          <div className="profile__details w-3/5 flex justify-end items-center mr-12">
            <div className="mx-3">
              <Button
                color="white"
                background={bookingStatus?.update_appointment_appove ? "#34a446" : "#eee"}
                type="button"
                title="Book Your Slots"
                onclick={() => setShowSlotModal(true)}
                disabled={!bookingStatus?.update_appointment_appove}
              />
            </div>
            <Link to="refer-a-friend">
              <Button
                color="white"
                background="#34a446"
                type="button"
                title="Refer A Friend"
              />
            </Link>
            <div className="border-l-2 border-slate-500 w-1 h-10 mx-5"></div>
            <Button
              color="white"
              background="#f8690e"
              type="button"
              title="Log out"
              onclick={logout}
            />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
