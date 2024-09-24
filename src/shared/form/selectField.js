import React, { useState } from "react";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import UnFoldIcon from '../../assets/icons/unfold_more';

export default function SelectFields(props) {
    const {
        label,
        className,
        id,
        name,
        error,
        onChange,
        helperTextMessage,
        disabled,
        subLabel,
        options,
    } = props;

    const [selected, setSelected] = useState(options.length > 0 ? options[0] : null);

    return (
        <div className="form-group mt-7 relative">
            <Listbox value={selected} onChange={setSelected}>
                <Label className="text-sm mb-1.5 font-semibold block" htmlFor={id}>
                    {label} {subLabel && <span>{subLabel}</span>}
                </Label>
                <div className="relative">
                <ListboxButton
                    disabled={disabled}
                    className="relative w-full cursor-default rounded-md form-field pl-3 pr-8 py-3 text-sm border border-neutral-300"
                >
                    <span className="flex items-center justify-between">
                        <span className="block truncate">
                            {selected ? selected.name : "Select an option"}
                        </span>
                        <UnFoldIcon className="absolute right-1" />
                    </span>
                </ListboxButton>

                <ListboxOptions
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {options.map((item) => (
                    <ListboxOption
                        key={item.id}
                        value={item}
                        className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 group-data-[selected]:bg-indigo-600 group-data-[selected]:text-white"
                    >
                        <div className="flex items-center">
                        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                            {item.name}
                        </span>
                        </div>
                    </ListboxOption>
                    ))}
                </ListboxOptions>
                </div>

                {error && helperTextMessage && (
                <small className="error-field absolute text-[11px] font-normal text-red-500 -bottom-5">
                    {helperTextMessage}
                </small>
                )}
            </Listbox>
        </div>
    );
}
