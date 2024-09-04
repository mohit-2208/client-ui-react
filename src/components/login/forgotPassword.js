import React, {useState} from 'react';
import TextFields from '../../shared/form/textField';
import Buttons from '../../shared/button/index';
import { Link } from "react-router-dom";
import { validateEmail } from '../../commonHelpers/formValidation';
import { postData } from '../../commonHelpers/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiEndpoints from '../../commonHelpers/apiEndpoints';

export default function ForgotPassword () {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: '' });
    const [responseData, setResponseData] = useState(null);
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const forgotPasswordSubmitHandler = async (event) => {
        event.preventDefault();
        const emailError = validateEmail(email);

        if (emailError) {
            setErrors({ email: emailError });
        } else {
            setErrors({ email: '' });
            console.log('Form submitted with:', { email });
            setLoading(true);
            try {
                const response = await postData(apiEndpoints.forgotpassword, { 'email': email });
                setResponseData(response); 
                setEmailSent(true);
            } catch (error) {
                console.error('Error:', error);
                toast.error('');
            } finally {
                setLoading(false);
            }
        }

    }

    return (
        <>
            <div className="login-section py-14 px-10 relative flex-1">
                <h2 className="font-normal text-center">Cannot access your account?</h2>
                <form name="forgotPasswordForm">
                    {
                        emailSent ? 
                        <div className="bg-[#f3faf3] border-l-4 border-green p-6 mt-6 text-green">An email has been sent to your inbox with new password.</div>
                        : <TextFields label="Email address" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your Email" type="email" className="email-field" id="forgetemail" name="email" fullWidth="fullWidth" error={!!errors.email} helperTextMessage={errors.email} />
                    }
                    <div className="action-btn text-center mt-8">
                        <Buttons label={loading ? "Loading..." : "Request Password"} type="submit" variant="contained" className="rounded py-2 px-4 text-lg text-white btn bg-green w-3/5 border border-transparent" disabled={emailSent} clickHandler={forgotPasswordSubmitHandler} />
                    </div>
                </form>
                <Link to="/login" rel="noreferrer" className="back-link absolute text-[11px] right-2.5 top-2.5">Back</Link>
            </div>
            <ToastContainer />
        </>
    )
}