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

//USER MANAGEMENT =================================
import UMDashboard from "./usermanagement/UMDashboard";
import UMUserList from "./usermanagement/UMUserList";

//HR =================================
import HrDashboard from "./hr/global/HrDashboard";
import HrEmployeeForm from "./hr/employee/HrEmployeeForm";
import HrEmployeeFormUser from "./hr/employee/HrEmployeeFormUser";
import HrEmployeeList from "./hr/employee/HrEmployeeList";
import HrRunSalary from "./hr/payroll/HrRunSalary";
import HrPayslip from "./hr/report/HrPayslip";
import HrPayslipReport from "./hr/report/HrPayslipReport";

function App() {
  const session = localStorage.getItem("session");
  const params = {app:"global", header:false, side:false, btn:false, footer:false, mode:"bright"};

  return (
    <BrowserRouter>
      <Routes>
      
      {/*GLOBAL ====================================*/}
      {/*Make the home page dashboard if user is login*/}
      
      <Route path="/" element={<Layout params={{...params}} />}>
        <Route index element={<Login />}></Route>
      </Route>
      <Route path="/" element={<Layout params={{...params, header:true, footer:true}} />}>
        <Route exact path='/dashboard'  element={<Dashboard />}></Route>
      </Route>

      <Route path="/" element={<Layout params={{...params, header:true, footer:true}} />}>
        <Route exact path='/contact' element={<Contact />}></Route>
        <Route exact path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route exact path='/mediator/:entry' element={<Mediator />}></Route>
        <Route exact path='/privacy-policy' element={<PrivacyPolicy />}></Route>
      </Route>

      <Route exact path='/logout' element={<AuthLogout />}></Route>

      {/*USER MANAGEMENT ====================================*/}
      <Route path="/" element={<Layout params={{...params, app:"user", header:true, side:true, footer:true}} />}>
        <Route exact path='/um/dashboard'  element={<UMDashboard />}></Route>
        <Route exact path='/um/user-list'  element={<UMUserList />}></Route>
      </Route>

      {/*HCM ====================================*/}
      <Route path="/" element={<Layout params={{...params, app:"hr", header:true, side:true}} />}>
        <Route exact path='/hr/dashboard'  element={<HrDashboard />}></Route>
        <Route exact path='/hr/employee-user-form'  element={<HrEmployeeFormUser />}></Route>
        <Route exact path='/hr/employee-form/:code'  element={<HrEmployeeForm />}></Route>
        <Route exact path='/hr/employee-list'  element={<HrEmployeeList />}></Route>
        <Route exact path='/hr/run-salary'  element={<HrRunSalary />}></Route>
        <Route exact path='/hr/report/payslip'  element={<HrPayslip />}></Route>
        <Route exact path='/hr/report/payslip-resport/:month'  element={<HrPayslipReport />}></Route>
      </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
