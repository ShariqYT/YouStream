"use client"

import { createContext, useState } from "react"

export const UploadVideoModalContext = createContext(null)

const UploadVideoModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <UploadVideoModalContext.Provider value={{ isOpen, onOpen : () => setIsOpen(true), onClose : () => setIsOpen(false) }}>
            {children}
        </UploadVideoModalContext.Provider>
    )
}

export default UploadVideoModalProvider