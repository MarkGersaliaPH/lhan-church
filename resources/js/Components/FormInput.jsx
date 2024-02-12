// FormInput.js
import React from "react";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import TextInput from "./TextInput";
import RichTextEditor from "./RichTextEditor";

const FormInput = ({
    label,
    name,
    value,
    onChange,
    error,
    autoComplete,
    type = "text",
    isFocused = false,
    options, // Array of objects for select options
    className 
}) => {


    const inputClass =  'w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
    className;

 

    return (
        <div className="mb-5">
            {(type == "checkbox" || type == "richeditor" ) ? null :   <InputLabel htmlFor={name} value={label} />}
          
            {type === "select" ? (
                <select
                    name={name}
                    id={name}
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : type === "radio" ? (
                <div>
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center">
                            <input
                                type="radio"
                                id={`${name}_${option.value}`}
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={onChange}
                            />
                            <label
                                htmlFor={`${name}_${option.value}`}
                                className="ml-2"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            ) : type === "checkbox" ? (
                <div>
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        checked={value}
                        onChange={onChange}
                    />
                    <label htmlFor={name} className="ml-2">
                        {label}
                    </label>
                </div>
            ) : type === "date" ? (
                <input
                    type="date"
                    id={name}
                    name={name}
                    className="mt-1 block w-full"
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                />
            ) 
            : type === "textarea" ? (
                <textarea
                    type="date"
                    id={name}
                    name={name}
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                    autoComplete={autoComplete}
                    rows={5}
                >{value}</textarea>
            )  : type === "rich_editor" ? ( 
                <RichTextEditor onChange={onChange}  
                name={name} 
                value={value}/> 
            )  : (
                <TextInput
                    name={name}
                    id={name}
                    className="mt-1 block w-full"
                    value={value}
                    onChange={onChange}
                    required
                    autoComplete={autoComplete}
                    type={type}
                />
            )}
            <InputError className="mt-2" message={error} />
        </div>
    );
};

export default FormInput;
