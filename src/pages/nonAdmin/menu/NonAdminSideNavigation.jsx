import React from 'react'
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {Navigation} from 'react-minimal-side-navigation';

import {AiOutlineHome} from "react-icons/ai"
import {MdHardware} from "react-icons/md"
import {CgProfile} from "react-icons/cg"
import {BiUserCheck} from "react-icons/bi"
import {HiBuildingOffice2} from "react-icons/hi2"
import { useLocation, useNavigate } from 'react-router-dom';

function NonAdminSideNavigation() {

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
        itemId: '/non-admin',
        elemBefore: () => <AiOutlineHome />,
      },
      {
        title: 'Create Profiles',
        itemId: '',
        elemBefore: () => <BiUserCheck />,
        subNav: [
          {
            title: "Customer",
            itemId: '/non-admin/register-customer'
          },
        ]
      },
      // {
      //   title: 'Hardwares',
      //   elemBefore: () => <MdHardware />,
      //   subNav: [
      //     {
      //       title: 'Panels',
      //       itemId: '/panels',
      //     },
      //     {
      //       title: 'Inverteres',
      //       itemId: '/inverters',
      //     },
      //     {
      //       title: 'Batteries',
      //       itemId: '/battery',
      //     },
      //     {
      //       title: 'Other',
      //       itemId: '/other-component',
      //     },
      //   ],
      // },
      {
        title: 'Update Profile',
        itemId: '/non-admin/update-profile',
        elemBefore: () => <CgProfile />,
      },
      {
        title: 'Profiles',
        itemId: "/non-admin-profile",
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
      {
        title: 'Calendar',
        itemId: '/non-admin/calendar',
        elemBefore: () => <AiOutlineHome />
      }
    ]}
  />
  )
}

export default NonAdminSideNavigation