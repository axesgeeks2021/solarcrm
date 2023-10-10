import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./style/style.css";

import "react-widgets/styles.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-calendar/dist/Calendar.css';


import Homepage from "./pages/customer/Homepage";
import Login from "./pages/authentication/CustomerLogin";
import Header from "./components/Header-Footer/Header";
import OrderDetails from "./pages/customer/OrderDetails";
import Sidemenu from "./components/sidemenu/Sidemenu";
import DocumentsUpload from "./pages/customer/DocumentsUpload";
import GridConnection from "./pages/customer/GridConnection";
import InstallationDetails from "./pages/customer/InstallationDetails";
import DocumentWarranty from "./pages/customer/DocumentWarranty";
import BillingInfo from "./pages/customer/BillingInfo";
import ReferAFriend from "./pages/customer/ReferAFriend";
import PreSiteRiskAssessment from "./pages/customer/PreSiteRiskAssessment";
import CallSupport from "./pages/customer/CallSupport";


import AdminLogin from "./pages/authentication/AdminLogin";
import AdminDashboard from "./pages/admin/adminDashboard/AdminDashboard";
import AdminOrders from "./pages/admin/orders/AdminOrders";
import CreateOrders from "./pages/admin/orders/CreateOrders";
import Inverter from "./pages/admin/products/Inverter";
import Panels from "./pages/admin/products/Panels";
import Battery from "./pages/admin/products/Battery";
import Customer from "./pages/admin/organization/Customer";
import RegisterInstaller from "./pages/admin/organization/RegisterInstaller"
import RegisterNonAdmin from "./pages/admin/organization/RegisterNonAdmin"

import RegisterTeam from "./pages/admin/organization/RegisterTeam"
import AllLogin from "./pages/admin/authentication/AllLogin"
import RegisterAdmin from "./pages/admin/organization/RegisterAdmin";
import PanelsOrders from "./pages/admin/orders/PanelsOrders";
import InverterOrders from "./pages/admin/orders/InverterOrders";
import BatterOrders from "./pages/admin/orders/BatteryOrders";
import OtherComponent from "./pages/admin/products/OtherComponent";
import OtherComponentOrders from "./pages/admin/orders/OtherComponentOrders";
import UpdateProfile from "./pages/admin/user/UpdateProfile";
import AdminSideNavigation from "./pages/admin/menu/AdminSideNavigation";
import NonAdminRegisterForm from "./pages/nonAdmin/NonAdminRegisterForm";
import NonAdminDashboard from "./pages/nonAdmin/NonAdminDashboard";
import Calendar from "./pages/Calendar/Calendar";
import UnapprovedCompany from "./pages/admin/approval/UnapprovedCompany";
import ApprovedCompany from "./pages/admin/approval/ApprovedCompany";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import NonAdminProfile from "./pages/nonAdmin/profile/NonAdminProfile";
import Accordian from "./components/Accordian";

import NonAdminCustomer from "./pages/nonAdmin/organization/Customer"
import NonAdminOrders from "./pages/nonAdmin/orders/NonAdminOrders"
import NonAdminUpdateProfile from "./pages/nonAdmin/user/UpdateProfile"
import InstallerProfile from "./pages/admin/organization/InstallerProfile"
import Dashboard from "./pages/Team/Dashboard";
import AssignedJobs from "./pages/Team/AssignedJobs";
import UpdateAssignedOrders from "./pages/Team/UpdateAssignedOrders";
import Practice from "./pages/Practice";


function App() {

  const locations = useLocation()

  const [cookies, setCookies, removeCookies] = useCookies();

  const [show, setShow] = useState(true);
  const [showSlotModal, setShowSlotModal] = useState(false)

  const navigate = useNavigate();

  const showmenu = () => {
    setShow(!show);
  };

  const logout = () => {
    // setShow(false)
    removeCookies("Authorization");
    return navigate("/login");
  };

  const auth = JSON.parse(localStorage.getItem('auth'))


  useEffect(() => {
    if (!cookies.Authorization) {
      locations.pathname === ("/login" && "/") ? navigate("/admin-dashboard") : navigate("*")
      return navigate('/login')
    }

    if (!cookies.Authorization && locations.pathname === "/admin-dashboard") {
      // locations.pathname === ("/login" && "/") ?  navigate("/admin-dashboard") : navigate("*") 
      return navigate('/all-login')
    }
  }, [])

  if (auth?.user?.user_type === "CUSTOMER") {
    return (
      <>
        {
          cookies.Authorization && auth?.user?.user_type === "CUSTOMER" ? (
            <Header showmenu={showmenu} logout={logout} setShowSlotModal={setShowSlotModal} />
          ) : null
        }
        <Sidemenu
          show={show}
          showmenu={showmenu}
          logout={logout}
          setShow={setShow}

        />
        <Routes>
          <Route path="/" element={<Homepage showSlotModal={showSlotModal} setShowSlotModal={setShowSlotModal} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer/order-details" element={<OrderDetails />} />
          <Route path="/customer/documents-upload" element={<DocumentsUpload />} />
          <Route path="/customer/grid-connection-approval" element={<GridConnection />} />
          <Route path="/customer/installation-details" element={<InstallationDetails />} />
          <Route path="/customer/document-warranty" element={<DocumentWarranty />} />
          <Route path="/customer/billing-info" element={<BillingInfo />} />
          <Route path="/customer/refer-a-friend" element={<ReferAFriend />} />
          <Route path="/customer/call-support" element={<CallSupport />} />
          <Route path="/customer/refer-a-friend" element={<ReferAFriend />} />
          <Route
            path="/customer/pre-site-risk-assessment"
            element={<PreSiteRiskAssessment />}
          />
        </Routes>
      </>
    )
  }

  if (auth?.user?.user_type === "ADMIN") {
    return (
      <>
        {/* {
          cookies.Authorization && auth?.user?.user_type === "ADMIN" ? <AdminSideNavigation /> : null
        } */}
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-orders" element={<AdminOrders />} />
          <Route path="/panels-orders" element={<PanelsOrders />} />
          <Route path="/inverters-orders" element={<InverterOrders />} />
          <Route path="/battery-orders" element={<BatterOrders />} />
          <Route path="/create-orders" element={<CreateOrders />} />
          <Route path="/panels" element={<Panels />} />
          <Route path="/inverters" element={<Inverter />} />
          <Route path="/battery" element={<Battery />} />
          <Route path="/other-component" element={<OtherComponent />} />
          <Route path="/other-component-orders" element={<OtherComponentOrders />} />
          <Route path="/register-customer" element={<Customer />} />
          <Route path="/register-team" element={<RegisterTeam />} />
          <Route path="/register-installer" element={<RegisterInstaller />} />
          <Route path="/installer-profile" element={<InstallerProfile />} />
          <Route path="/register-admin" element={<RegisterAdmin />} />
          <Route path="/register-non-admin" element={<RegisterNonAdmin />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/unapproved-company" element={<UnapprovedCompany />} />
          <Route path="/approved-company" element={<ApprovedCompany />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    )
  }

  if (auth?.user?.admin?.user?.user_type === 'NON_ADMIN') {
    return (
      <Routes>
        {/* {
          cookies.Authorization && auth?.user?.user_type === "ADMIN" ? <AdminSideNavigation /> : null
        } */}
        <Route path="/non-admin-registration" element={<NonAdminRegisterForm />} />
        <Route path="/non-admin-profile" element={<NonAdminProfile />} />
        <Route path="/non-admin" element={<NonAdminDashboard />} />
        <Route path="/register-non-admin" element={<RegisterNonAdmin />} />
        <Route path="/non-admin/register-customer" element={<NonAdminCustomer />} />
        <Route path="/non-admin/orders" element={<NonAdminOrders />} />
        <Route path="/non-admin/calendar" element={<Calendar />} />
        <Route path="/non-admin/update-profile" element={<NonAdminUpdateProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  if (auth?.user?.admin?.user?.user_type === 'TEAM') {
    return (
      <Routes>
        {/* {
          cookies.Authorization && auth?.user?.user_type === "TEAM" ? 
          <Route path="/" element={<AdminSideNavigation />} />
           : null
        } */}
        <Route path="/team-dashboard" element={<Dashboard />} />
        <Route path="/team/assigned-jobs" element={<AssignedJobs />} />
        <Route path="/team/assigned-jobs/update-orders" element={<UpdateAssignedOrders />} />
        <Route path="/team/practice" element={<Practice />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <Login />
  )
}

export default App;
