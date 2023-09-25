import React from "react";

import logo from "../../assets/images/logo.webp";
import Heading from "../heading/Heading";
import Button from "../Button/Button";
import { useCookies } from "react-cookie";

import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

function Header({ showmenu, logout, setShowSlotModal }) {
  return (
    <>
      <header className="w-full overflow-hidden my-2">
        <nav className="w-full flex justify-between items-center overflow-hidden">
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
                width="160px"
                color="white"
                background="#34a446"
                type="button"
                title="Book Your Slots"
                onclick={() => setShowSlotModal(true)}
              />
            </div>
            <Link to="refer-a-friend">
              <Button
                width="160px"
                color="white"
                background="#34a446"
                type="button"
                title="Refer A Friend"
              />
            </Link>
            <div className="border-l-2 border-slate-500 w-1 h-10  mx-5"></div>
            <Button
              width="100px"
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
