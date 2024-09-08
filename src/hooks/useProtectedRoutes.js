import { CurrentChannelContext } from "@/context/CurrentChannelContext"
import { CurrentUserContext } from "@/context/CurrentUserContext"
import { useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

export const useProtectedRoutes = ( checkChannel=true ) => {
    const currentUser = useContext(CurrentUserContext)
    const currentChannel = useContext(CurrentChannelContext)

    const router = useRouter()

    useEffect(() => {
        if ((!currentChannel && checkChannel) || !currentUser) {
            router.push("/")
        }
    }, [currentUser, currentChannel, router, checkChannel])
}