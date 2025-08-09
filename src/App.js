import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layout ================================
import Layout from "./global/components/Layout";

//Global ======================================
import Login from "./global/Login";
import Dashboard from "./global/Dashboard";
import Contact from './global/Contact';
import SignUp from "./global/SignUp";
import ForgotPassword from "./global/ForgotPassword";
import Mediator from "./global/Mediator";
import ChangePassword from "./global/ChangePassword";
import PrivacyPolicy from "./global/PrivacyPolicy";
import AuthLogout from "./global/components/AuthLogout";

//User Management =================================
import UMDashboard from "./usermanagement/UMDashboard";
import HrDashboard from "./hr/HrDashboard";
import EmployeeForm from "./hr/EmployeeForm";

function App() {
  const session = localStorage.getItem("session");

  return (
    <BrowserRouter>
      <Routes>
      
      {/*GLOBAL ====================================*/}
      {/*Make the home page dashboard if user is login*/}
      
      <Route path="/" element={<Layout header={false} side={false} btn={false} footer={false} mode={"bright"} />}>
        <Route index element={<Login />}></Route>
      </Route>
      <Route path="/" element={<Layout header={true} side={true} btn={false} footer={false} mode={"bright"} />}>
        <Route exact path='/dashboard'  element={<Dashboard />}></Route>
      </Route>

      <Route path="/" element={<Layout header={true} side={false} btn={false} footer={true} mode={"bright"} />}>
        <Route exact path='/contact' element={<Contact />}></Route>
        <Route exact path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route exact path='/mediator/:entry' element={<Mediator />}></Route>
        <Route exact path='/privacy-policy' element={<PrivacyPolicy />}></Route>
      </Route>

      <Route path="/" element={<Layout header={true} side={true} btn={false} footer={false} mode={"bright"} />}>
        <Route exact path='/dashboard'  element={<Dashboard />}></Route>
      </Route>
      <Route exact path='/logout' element={<AuthLogout />}></Route>

      <Route path="/" element={<Layout header={true} side={true} btn={false} footer={false} mode={"bright"} />}>
        <Route exact path='/um/dashboard'  element={<UMDashboard />}></Route>
      </Route>

      <Route path="/" element={<Layout header={true} side={true} btn={false} footer={false} mode={"bright"} />}>
        <Route exact path='/hr/dashboard'  element={<HrDashboard />}></Route>
        <Route exact path='/hr/employee-form/:code'  element={<EmployeeForm />}></Route>
      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
