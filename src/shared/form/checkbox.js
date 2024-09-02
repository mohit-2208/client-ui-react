import React from "react";
import styles from "./form.module.css";

export default function Checkboxes(props) {
    const { name, id, checked, onChange, label, errors, labelSize } = props;

    return (
        <div className={`${styles.formGroup} mt-8 relative flex flex-start`}>
            <input
                checked={checked}
                onChange={onChange}
                name={name}
                id={id}
                type="checkbox"
                className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={id} className={`${labelSize || "text-sm"} ml-2 font-normal`}>
                {label}
            </label>
            {
                !checked && errors &&
                <small className="error-field absolute text-[11px] font-normal text-red -bottom-5">{errors}</small>
            }
        </div>
    );
}
