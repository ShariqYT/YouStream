"use client"

import { createContext } from "react"
export const CurrentUserContext = createContext(null)

const CurrentUserProvider = ({ user, children }) => {
    return (
        <CurrentUserContext.Provider value={user}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export default CurrentUserProvider