"use client"

import {useState} from "react"

const TextArea = ({ id, label, limit, disabled, required, register, errors, changeValue, className }) => {
    const [textLength, setTextLength] = useState(0)

    const handleInput = (e) => {
        let currentText = e.target.innerText || "";
        if (currentText.length > limit) {
            currentText = currentText.substring(0, limit); // Trim text if it exceeds the limit
            e.target.innerText = currentText; // Update the text in the contentEditable div
        }
        setTextLength(currentText.length);
        changeValue?.(id, currentText);
    };

    return (
        <div className="relative">
            <div
                contentEditable={true}
                onInput={handleInput}
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "
                className={`${className} peer w-full px-4 pt-8 pb-2 min-h-[90px] rounded-md outline-none border-[1px] bg-white transition ease-linear ${errors[id] ? 'border-red-500 focus:border-red-500' : 'border-zinc-300 focus:border-2 focus:border-blue-400'} disabled:opacity-70 disabled:cursor-not-allowed`}
            />
            <label htmlFor={id} className={`absolute bg-white px-1 top-2 left-4 z-[1] ${errors[id] ? 'text-red-500' : 'text-zinc-500' }`}>{label}</label>
            <label htmlFor={id} className={`absolute text-xs bg-white px-1 bottom-2 right-4 z-[1] ${errors[id] ? 'text-red-500' : 'text-zinc-500' }`}>{textLength}/{limit}</label>
        </div>
    )
}

export default TextArea
