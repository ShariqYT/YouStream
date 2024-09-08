"use client"

import { createContext, useState } from "react"

export const CreateChannelModalContext = createContext(null)

const CreateChannelModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <CreateChannelModalContext.Provider value={{ isOpen, onOpen : () => setIsOpen(true), onClose : () => setIsOpen(false) }}>
            {children}
        </CreateChannelModalContext.Provider>
    )
}

export default CreateChannelModalProvider