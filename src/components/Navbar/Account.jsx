"use client"

import { signOut } from "next-auth/react";
import AccountInfo from "./AccountInfo"
import { PiPlayDuotone, PiMonitorPlayDuotone } from "react-icons/pi";
import { VscSignOut } from "react-icons/vsc";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { useContext } from "react";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useRouter } from "nextjs-toploader/app";

const Account = ({ currentUser, onClose }) => {
    const createChannelModal = useContext(CreateChannelModalContext);
    const currentChannel = useContext(CurrentChannelContext);

    const router = useRouter()

    return (
        <>
            <div onClick={onClose} className="absolute top-0 left-0 w-screen h-screen" />
            <div className='w-[330px] h-fit max-h-[500px] absolute right-24 top-20 drop-shadow-[0_0_20px_rgba(0,0,0,0.25)] bg-white text-black border overflow-hidden border-[#35b7ff] rounded-xl' >

                <AccountInfo currentUser={currentUser} />
                <hr />

                <div className="flex flex-col">
                    <p onClick={() => {
                        if (!currentChannel) {
                            createChannelModal?.onOpen();
                        } else {
                            router.push(`/channel/${currentChannel._id}`)
                        }
                        onClose()
                    }} className="hover:bg-[#35b7ff] hover:bg-opacity-25 p-4 cursor-pointer flex items-center gap-4"><PiMonitorPlayDuotone className="text-2xl" /> Your channel</p>
                    <p onClick={() => {
                        if(!currentChannel) {
                            createChannelModal?.onOpen();
                        } else {
                            router.push(`/studio`)
                        }
                        onClose()
                    }} className="hover:bg-[#35b7ff] hover:bg-opacity-25 p-4 cursor-pointer flex items-center gap-4"><PiPlayDuotone className="text-2xl" /> YouStream Studio</p>
                    <button onClick={() => { signOut(), onClose() }} className="hover:bg-[#35b7ff] hover:bg-opacity-25 p-4 cursor-pointer flex items-center gap-4"><VscSignOut className="text-2xl" /> Sign out</button>
                </div>

            </div>
        </>

    )
}

export default Account
