"use client"

import { useMemo } from "react"

const Button = ({ onClick, children, type, className }) => {
    const typeClassName = useMemo(() => {
        switch (type) {
            case "primary":
                return "text-blue-400 font-medium uppercase text-sm"
            case "secondary":
                return "text-neutral-400 font-medium uppercase text-sm"
            case "box":
                return "text-neutral-900 uppercase font-medium bg-sky-500 rounded-sm px-4 py-2"
            case "rounded":
                return "text-stone-950 font-medium bg-zinc-300 rounded-full px-3 py-2"
            case "rounded-dark":
                return "text-white font-medium bg-neutral-800 rounded-full px-3 py-2"
            default:
                return ""
        }
    }, [type])
    return (
        <button onClick={onClick} type={type} className={`${typeClassName} ${className}`}>
            {children}
        </button>
    )
}

export default Button
