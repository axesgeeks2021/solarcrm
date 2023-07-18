import React from 'react'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {Navigation} from 'react-minimal-side-navigation';

import {AiOutlineHome} from "react-icons/ai"
import {MdHardware} from "react-icons/md"
import {CgProfile} from "react-icons/cg"
import {BiUserCheck} from "react-icons/bi"
import {HiBuildingOffice2} from "react-icons/hi2"
import { useLocation, useNavigate } from 'react-router-dom';

function AdminSideNavigation() {

  const navigate = useNavigate()

  const location = useLocation()
  return (
    <Navigation
    
    // you can use your own router's api to get pathname
    activeItemId={location.pathname}
    onSelect={({itemId}) => {
      navigate(itemId)
    }}

    items={[
      {
        title: 'Dashboard',
        itemId: '/admin',
        elemBefore: () => <AiOutlineHome />,
      },
      {
        title: 'Create Profiles',
        itemId: '',
        elemBefore: () => <BiUserCheck />,
        subNav: [
          {
            title: "Admin",
            itemId: '/register-admin'
          },
          {
            title: "Non Admin",
            itemId: '/register-non-admin'
          },
          {
            title: "Team",
            itemId: '/register-team'
          },
          {
            title: "Customer",
            itemId: '/register-customer'
          },
          {
            title: "Installer",
            itemId: '/register-installer'
          },
        ]
      },
      {
        title: 'Hardwares',
        elemBefore: () => <MdHardware />,
        subNav: [
          {
            title: 'Panels',
            itemId: '/panels',
          },
          {
            title: 'Inverteres',
            itemId: '/inverters',
          },
          {
            title: 'Batteries',
            itemId: '/battery',
          },
          {
            title: 'Other',
            itemId: '/other-component',
          },
        ],
      },
      {
        title: 'Update Profile',
        itemId: '/update-profile',
        elemBefore: () => <CgProfile />,
      },
      {
        title: 'Un Approved Company',
        itemId: '/unapproved-company',
        elemBefore: () => <HiBuildingOffice2 />,
      },
      {
        title: 'Approved Company',
        itemId: '/approved-company',
        elemBefore: () => <HiBuildingOffice2 />,
      },
      {
        title: 'Profiles',
        itemId: "/admin-profile",
        elemBefore: () => <HiBuildingOffice2 />,
        // subNav: [
        //   {
        //     title: 'Forget Password',
        //     itemId: 'forget-password',
        //     elemBefore: () => <CgProfile />
        //   },
        //   {
        //     title: 'Change Password',
        //     itemId: 'change-password',
        //     elemBefore: () => <CgProfile />
        //   }
        // ]
      },
    ]}
  />
  )
}

export default AdminSideNavigation