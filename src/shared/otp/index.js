import React from "react";
import OtpInput from 'react-otp-input';

export default function OTPForm(props) {
    const {value, onChange, numInputs, errors, label, helperTextMessage} = props;

    return(
        <div className="form-group otp-section relative mt-7">
            <label className="text-sm mb-1.5 font-semibold block">{label}</label>
            <OtpInput
                value={value}
                onChange={onChange}
                numInputs={numInputs}
                renderSeparator={<span className="text-neutral-300">-</span>}
                inputStyle={'otp-input text-[14px] mx-3 rounded-md border border-neutral-300 !w-11 h-11 first:ml-0'}
                renderInput={(props) => <input {...props} />}
                errors={errors}
            />
            {
                errors && value.length < 4 &&
                <small className="error-field absolute text-[11px] font-normal text-red -bottom-5">{helperTextMessage}</small>
            }
        </div>
    )
}