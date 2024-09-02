import React, {useEffect} from "react";
import styles from './login.module.css';
import { useLocation } from "react-router-dom";
import EmailLogin from './emailLogin';
import ForgotPassword from './forgotPassword';
import OTPLogin from './otpLogin';
import { useConfig } from '../../configContext';

function Login() {
    let location = useLocation();
    const config = useConfig();

    console.log('env:', process.env.REACT_APP_ENV, ',', config.apiEndpoint);
    
    const renderComponents = () => {
        switch(location.hash) {
            case '#forgot-password': 
                return <ForgotPassword />
            case '#otp-login':
                return <OTPLogin />
            default:
                return <EmailLogin />
        }
    }


    return (
        <div className={`container mx-auto ${location.hash === '#forgot-password' ? 'max-w-[500px]' : 'max-w-[720px]'}`}>
            <div className={`${styles.loginWrapper} shadow-lg rounded-lg flex bg-white mt-24`}>
                {renderComponents()} 
            </div>
        </div>
    );
}

export default Login;
