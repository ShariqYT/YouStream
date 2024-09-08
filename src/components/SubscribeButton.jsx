"use client"

import useSubscribe from "@/hooks/useSubscribe"
import Button from "./Button"

const SubscribeButton = ({ channelId, className }) => {
    const { hasSubscribed, toggleSubscribe } = useSubscribe({ channelId })

    return (
        <Button className={className} type={hasSubscribed ? "rounded-dark" : "rounded"} onClick={toggleSubscribe}>{hasSubscribed ? "Subscribed" : "Subscribe"}</Button>
    )
}

export default SubscribeButton
