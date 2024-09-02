import React from "react";
import styles from "./button.module.css";

export default function Buttons(props) {
  const { label, className, clickHandler, type, variant, id, disabled } = props;

  const getButtonClassName = (variant) => {
    switch (variant) {
      case "primary":
        return "bg-green";
      case "secondary":
        return "bg-blue";
      case "error":
        return "";
      case "outlined":
        return "";
      case "light":
        return "";
      case "dark":
        return "";
      default:
        return "";
    }
  };

  return (
    <button
      className={`rounded-md border p-2 text-white disabled:bg-slate-300 ${getButtonClassName(
        variant
      )} ${styles.btn} ${className}`}
      type={type}
      onClick={clickHandler}
      id={id}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
