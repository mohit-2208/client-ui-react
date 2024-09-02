import React, {useState} from 'react';
import TextFields from '../../shared/form/textField';
import Buttons from '../../shared/button/index';
import { validatePhoneNumber, validateOTP } from '../../commonHelpers/formValidation';
import OTPForm from '../../shared/otp/index';

export default function CustomerLogin () {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [errors, setErrors] = useState({ mobile: '', otp: '' });
    const [toggleConsent, setToggleConsent] = useState(false);

    const generateOTPHandler = (event) => {
        event.preventDefault();
        const mobileError = validatePhoneNumber(mobile);

        if (mobileError) {
            setErrors({ mobile: mobileError, otp: '' });
            console.log('errors: ', {mobile, otp})
        }  else {
            setErrors({ mobile: '', otp: '' });
            setOtpSent(true);
            setDisabled(true)
        }
    }

    const loginWithOTPSubmitHandler = (event) => {
        event.preventDefault();
        const otpError = validateOTP(otp);

        if (otpError) {
            setErrors({ mobile: '', otp: otpError });
            console.log('Error: ', {mobile, otp})
        }  else {
            setErrors({ mobile: '', otp: '' });
            console.log('Form Submitted: ', {mobile, otp})
        }
    }

    return (
        <div
            id="customer-login"
            className="bg-cover bg-fixed bg-no-repeat h-full pt-20"
            style={{
                backgroundImage: "url('https://d1lfs7vzgvps2q.cloudfront.net/images/website/img/credit_score_bg.png')",
            }}
        >
            <div className="login-section relative shadow-lg rounded-lg bg-white max-w-[470px] mx-auto">
                <div className="py-14 px-10 pb-8">
                    <h2 className="font-normal text-center mb-3">{!otpSent ? 'Login' : 'Verify Mobile Number'}</h2>
                    <h4 className="text-center">{!otpSent ? 'Welcome to Indifi' : 'Enter OTP sent to ' + mobile}</h4>
                    <form name="loginForm">
                        <TextFields label="Mobile Number" placeholder="Your Mobile Number" value={mobile} onChange={(event) => setMobile(event.target.value)} type="text" className="phone-field" id="phone" name="phone" fullWidth="fullWidth" disabled={disabled} error={!!errors.mobile} helperTextMessage={errors.mobile} />
                        {
                            otpSent ?
                            <>
                                <div className="relative">
                                    <OTPForm value={otp} onChange={setOtp} numInputs={4} errors={!!errors.otp} label="OTP" helperTextMessage={errors.otp} />
                                    <div className="absolute right-0 text-[13px]">
                                        <span className="cursor-pointer text-sky-600">Resend OTP</span>
                                    </div>
                                </div>
                                <div className="action-btn text-center mt-8">
                                    <Buttons label="Verify" variant="contained" type="submit" className="rounded py-2 px-4 text-lg text-white btn bg-gradient-to-r from-blue-800 to-blue-600 w-full border border-transparent" clickHandler={loginWithOTPSubmitHandler} />
                                </div>
                            </>
                            : 
                            <>
                                <div className="action-btn text-center mt-8">
                                    <Buttons label="Generate OTP" variant="contained" className="rounded py-2 px-4 text-lg text-white btn bg-gradient-to-r from-blue-800 to-blue-600 w-full border border-transparent" clickHandler={generateOTPHandler} />
                                </div>
                            </>
                        }
                    </form>
                </div>
                {
                    otpSent && 
                    <div className="relative">
                        <div className="border-t-[1px] border-slate-200 py-6 px-10">
                            By clicking on "Verify", I agree to Indifi's <a href="https://www.indifi.com/privacy-policy" target="_blank" rel="noreferrer"><b>Privacy Policy</b></a>(including the 'purpose' of collection of my information); and <a href="https://app.indifi.com/terms-and-conditions"  target="_blank" rel="noreferrer"><b>T&amp;C</b></a> (collectively the “Terms”).
                            {
                                toggleConsent && 
                                <>
                                    Subject to applicable laws, I also give my consent (and consent on behalf of any persons I am authorised to give consent for) to Indifi and its associated financing partners (whether as my authorized representative or otherwise) and/or other assigns to collect, receive, handle or share my information from Experian/CIBIL/CRIF and Central KYC registry for our credentials linked with our PAN as per the Terms and Bureau Terms & Conditions stated in <a href="https://www.indifi.com/bureau-tnc" target="_blank" rel="noreferrer">https://www.indifi.com/bureau-tnc</a>. Also, I declare my annual household income exceeds Rs 3 Lakhs. In case you do not provide your consent for the above, please do not access the services on our website/app or otherwise
                                </>
                            }
                        </div>
                        <span onClick={(e) => setToggleConsent(!toggleConsent)} className="absolute right-6 bottom-2 text-[12px]">{toggleConsent ? 'Show Less': 'Show More'}</span>
                    </div>
                }
                <div className="text-center text-sm p-2.5 bg-slate-100 rounded-b-lg flex items-center justify-center">
                    <img src="https://client.indifi.com/app/customer-login/verified.svg" alt="" className="mr-2" /> Your personal information is 100% secured with us.
                </div>
            </div>
        </div>
    );
}