"use client"

import { createContext } from "react"
export const CurrentChannelContext = createContext(null)

const CurrentChannelProvider = ({ channel, children }) => {
    return (
        <CurrentChannelContext.Provider value={channel}>
            {children}
        </CurrentChannelContext.Provider>
    )
}

export default CurrentChannelProvider