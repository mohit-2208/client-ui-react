import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import CustomerLogin from './components/customer-login';
import StepSwitcher from "./components/steps";
import Dashboard from "./components/dashboard";
import ApplicationWorkFlow from "./components/application-workflow";

const RouterApp = () => {
    return (
        <Routes>
            {/* login */}
            <Route path="/login" element={<Login />}/>

            {/* login with OTP */}
            <Route path="/login#otp-login" element={<Login />}/>

            <Route path="/dashboard" element={<Dashboard />}/>

            {/* Forgot Password */}
            <Route path="/login#forgot-password" element={<Login />}/>

            <Route path="/customer-login" element={<CustomerLogin />} />

            <Route path="/v2/instant-loan/application" element={<StepSwitcher />} />

            <Route 
                path="/instant-loan/application/:applicationId" element={<ApplicationWorkFlow />} 
            />

            {/* Redirect to Login by default after npm started */}
            <Route path="*" element={<Navigate to='/login' />} />
        </Routes>
    );
};
  
export default RouterApp;