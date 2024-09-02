import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextFields from '../../shared/form/textField';
import Buttons from '../../shared/button/index';
import { Link } from "react-router-dom";
import { validatePhoneNumber, validateOTP } from '../../commonHelpers/formValidation';
import OTPForm from '../../shared/otp/index';
import { getData, postData } from '../../commonHelpers/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OTPLogin () {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [errors, setErrors] = useState({ mobile: '', otp: '' });
    const [loading, setLoading] = useState(false);

    const generateOTPHandler = async (event) => {
        event.preventDefault();
        const mobileError = validatePhoneNumber(mobile);

        if (mobileError) {
            setErrors({ mobile: mobileError, otp: '' });
        }  else {
            setErrors({ mobile: '', otp: '' });
            setLoading(true);
            try {
                const response = await getData('/auth/otp/'+mobile);
                // console.log(response)
                setOtpSent(true);
                setDisabled(true);
            } catch (error) {
                
            } finally {
                setLoading(false);
            }
        }
    }

    const loginWithOTPSubmitHandler = async (event) => {
        event.preventDefault();
        const otpError = validateOTP(otp);

        if (otpError) {
            setErrors({ mobile: '', otp: otpError });
            console.log('Error: ', {mobile, otp})
        }  else {
            setErrors({ mobile: '', otp: '' });
            console.log('Form Submitted: ', {mobile, otp})
            setLoading(true);
            try {
                const response = await postData('/auth/otp_login', { 'phone': mobile, 'otp': otp });
                setResponseData(response); 
                navigate('/dashboard', { replace: true });
                window.localStorage.setItem(process.env.REACT_APP_tokenKey, response.data.token);
                // console.log(response.data.token);
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <div className="signup-section bg-slate-700 py-14 px-10 text-white rounded-l-lg max-w-[300px]">
                <h2 className="mb-12 font-normal">Benefits</h2>
                <ul className="pl-4 list-disc">
                    <li className="text-[13px] pb-4">Get your loan details on the Go</li>
                    <li className="text-[13px] pb-4">Send disburse request in a click</li>
                    <li className="text-[13px] pb-0">Get invoice discounting</li>
                </ul>
            </div>
            <div className="login-section py-14 px-10 relative flex-1">
                <h2 className="font-normal text-center">Login with OTP</h2>
                <form name="loginForm">
                    <TextFields label="Mobile Number" placeholder="Your Mobile Number" value={mobile} onChange={(event) => setMobile(event.target.value)} type="text" className="phone-field" id="phone" name="phone" fullWidth="fullWidth" disabled={disabled} error={!!errors.mobile} helperTextMessage={errors.mobile} />
                    {
                        otpSent ?
                        <>
                            <OTPForm value={otp} onChange={setOtp} numInputs={4} errors={!!errors.otp} label="OTP" helperTextMessage={errors.otp} />
                            <div className="links flex justify-between mt-4 mb-5">
                                <Link to="#forgot-password" rel="noreferrer" className="text-[11px]">Cannot access your account?</Link>
                                <Link to="#forgot-password" rel="noreferrer" className="text-[11px]" onClick={generateOTPHandler}>Resend OTP</Link>
                            </div>
                            <div className="action-btn text-center mt-8">
                                <Buttons label={loading ? "Loading..." : "Login"} variant="contained" type="submit" className="rounded py-2 px-4 text-lg text-white btn bg-green w-3/5 border border-transparent" clickHandler={loginWithOTPSubmitHandler} />
                            </div>
                        </>
                        : 
                        <>
                            <div className="links flex justify-between mt-4 mb-5">
                                <Link to="#forgot-password" rel="noreferrer" className="text-[11px]">Cannot access your account?</Link>
                            </div>
                            <div className="action-btn text-center mt-8">
                                <Buttons label={loading ? "Loading..." : "Generate OTP"} variant="contained" className="rounded py-2 px-4 text-lg text-white btn bg-green w-3/5 border border-transparent" clickHandler={generateOTPHandler} />
                            </div>
                        </>
                    }
                </form>
                <Link to="/login" rel="noreferrer" className="back-link absolute text-[11px] right-2.5 top-2.5">Back</Link>
            </div>
            <ToastContainer />
        </>
    )
}