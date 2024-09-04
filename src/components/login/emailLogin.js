import React, {useState, useEffect} from 'react';
import TextFields from '../../shared/form/textField';
import Checkboxes from '../../shared/form/checkbox';
import { Link } from "react-router-dom";
import Buttons from '../../shared/button/index';
import { validateEmail, validatePassword } from '../../commonHelpers/formValidation';
import { postData } from '../../commonHelpers/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiEndpoints from '../../commonHelpers/apiEndpoints';

export default function EmailLogin () {
    const navigate = useNavigate();
    const [responseData, setResponseData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tnc, setTnc] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '', tnc: '' });
    const [loading, setLoading] = useState(false);

    const linkRedirect = () => {}

    useEffect(() => {
        if(localStorage.getItem('invoice_discounting_token')) {
            navigate('/dashboard', { replace: true });
        }
    });

    const loginFormSubmitHandler = async (event) => {
        event.preventDefault();
    
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const tncError = tnc ? '' : 'Please agree to our terms and conditions';
    
        if (emailError || passwordError || tncError) {
            setErrors({ email: emailError, password: passwordError, tnc: tncError });
        } else {
            setErrors({ email: '', password: '', tnc: '' });
            console.log('Form submitted with:', { email, password, tnc });
            setLoading(true);
            try {
                const response = await postData(apiEndpoints.login, { 'email': email, 'password': password });
                setResponseData(response); 
                navigate('/dashboard', { replace: true });
                window.localStorage.setItem(process.env.REACT_APP_tokenKey, response.data.token);
                // console.log(response.data.token);
            } catch (error) {
                // console.error('Error:', error);
                if (error?.response?.data?.data?.inner?.errorCode) {
                    if (error.response.data.data.inner.errorCode === "ACCOUNT_LOCKED") {
                        toast.error(error.response.data.data.message, { autoClose: false });
                    } else  if (error.response.data.data.inner.errorCode === "PASSWORD_EXPIRED") {}
                } else {
                    toast.error("The username or password you entered is invalid.", { autoClose: false });
                }
            } finally {
                setLoading(false)
            }
        }
    };

    return (
        <>
            <div className="signup-section bg-slate-700 py-14 px-10 text-white rounded-l-lg max-w-[300px]">
                <h2 className="mb-12 font-normal">Not a Member?</h2>
                <p className="mb-10 text-base font-light">Sign up to create account and connect</p>
                <Buttons label="Register Now" className="rounded py-2 px-4 text-lg font-light text-white btn bg-transparent w-full border border-white" clickHandler={linkRedirect} />
            </div>
            <div className="login-section py-14 px-10 relative flex-1">
                <h2 className="font-normal text-center">Login</h2>
                <form name="loginForm">
                    <TextFields label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your Email" type="email" className="email-field" id="email" name="email" fullWidth="fullWidth" error={!!errors.email} helperTextMessage={errors.email} />
                    <TextFields label="Password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your Password" type="password" className="password-field" id="password" name="password" fullWidth="fullWidth" error={!!errors.password} helperTextMessage={errors.password} />
                    <div className="links flex justify-between mt-4 mb-5">
                        <Link to="#forgot-password" rel="noreferrer" className="text-[11px]">Cannot access your account?</Link>
                        <Link to="#otp-login" rel="noreferrer" className="text-[11px]">Login with OTP</Link>
                    </div>
                    <Checkboxes 
                        name="tnc" 
                        id="tnc" 
                        checked={tnc} 
                        onChange={(e) => setTnc(e.target.checked)} 
                        errors={errors.tnc}
                        labelSize="text-[11px]"
                        label={
                            <>
                                I agree to Indifi&apos;s{" "}
                                <a href="https://www.indifi.com/privacy-policy" rel="noreferrer" target="_blank">
                                    Privacy Policy
                                </a>{" "}
                                and{" "}
                                <a href="https://app.indifi.com/terms-and-conditions" target="_blank" rel="noreferrer">
                                    T&amp;C
                                </a>{" "}
                                and authorize them to make credit enquiries
                            </>
                        }  
                    />
                    <div className="action-btn text-center mt-8">
                        <Buttons label={loading ? "Loading..." : "Login"} type="submit" variant="contained" className="rounded py-2 px-4 text-lg text-white btn bg-green w-3/5 border border-transparent" clickHandler={loginFormSubmitHandler} />
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
