import React from "react"

export default function UnFoldIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.iconHeight || "22px"} width={props.iconWidth || "22px"} viewBox="0 -960 960 960"  fill={props.fillColor || "#5f6368"} className={props.className}>
            <path d="M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z"/>
        </svg>
    )
}
