import React from "react";
import { Field, Input, Label } from "@headlessui/react";
// import styles from "./form.module.css";

export default function TextFields(props) {
  const {
    label,
    className,
    id,
    name,
    type,
    placeholder,
    error,
    onChange,
    helperTextMessage,
    disabled,
    value,
    subLabel,
  } = props;

  return (
    <div className="form-group mt-7 relative">
      <Field>
        <Label className="text-sm mb-1.5 font-semibold block" htmlFor={id}>{label} {subLabel && subLabel}</Label>
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          className={`form-field px-3 py-3 text-sm border border-neutral-300 w-full rounded ${className}`}
          onChange={onChange}
          disabled={disabled}
          value={value || ''}
        />
      </Field>
      {error && helperTextMessage && <small className="error-field absolute text-[11px] font-normal text-red -bottom-5">{helperTextMessage}</small>}
    </div>
  );
}
