"use client"

import { useState } from "react"
import Button from "../Button"
import AllSubscriptions from "./AllSubscriptions"

const SubscriptionHeader = ({ currentUser, subscriptions }) => {
    const [open, setOpen] = useState(false)

    return currentUser ? (
        <div className="flex items-center mr-1 md:mr-0 z-[1020] gap-4">
            <Button type={"box"} className={'rounded-lg'} onClick={() => setOpen(true)} >{subscriptions.length} Subscriptions</Button>
            {open && <AllSubscriptions subscriptions={subscriptions} setOpen={setOpen} />}
        </div>
    ) : null
}

export default SubscriptionHeader
