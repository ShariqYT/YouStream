"use client"

import { signIn, signOut } from "next-auth/react";
import AccountInfo from "./AccountInfo"
import { PiPlayDuotone, PiMonitorPlayDuotone } from "react-icons/pi";
import { VscSignOut } from "react-icons/vsc";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { useContext } from "react";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Account = ({ currentUser, onClose }) => {
    const createChannelModal = useContext(CreateChannelModalContext);
    const currentChannel = useContext(CurrentChannelContext);

    const router = useRouter()

    return (
        <>
            <div onClick={onClose} className="absolute top-0 left-0 w-screen h-screen" />
            <div className='md:w-[330px] w-[350px] h-fit max-h-[500px] absolute md:right-16 bottom-20 right-3 md:top-16 drop-shadow-[0_0_20px_rgba(0,0,0,0.25)] bg-white text-black border overflow-hidden border-[#35b7ff] rounded-xl' >
                {
                    currentUser ? (
                        <>
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
                                }} className="hover:bg-[#35b7ff] w-full hover:bg-opacity-25 p-4 cursor-pointer text-base flex items-center gap-4"><PiMonitorPlayDuotone className="text-2xl" /> Your channel</p>
                                <p onClick={() => {
                                    if (!currentChannel) {
                                        createChannelModal?.onOpen();
                                    } else {
                                        router.push(`/studio`)
                                    }
                                    onClose()
                                }} className="hover:bg-[#35b7ff] w-full hover:bg-opacity-25 p-4 cursor-pointer flex text-base items-center gap-4"><PiPlayDuotone className="text-2xl" /> YouStream Studio</p>
                                <hr />

                                <Link href={'/playlists'} onClick={onClose} className="block md:hidden">
                                    <button
                                        className={`hover:bg-[#35b7ff] hover:bg-opacity-25 w-full p-4 cursor-pointer flex text-base items-center gap-4`}

                                    >
                                        <RiPlayList2Fill className='text-2xl' />Playlists
                                    </button>
                                </Link>

                                <Link href={'/watch-later'} onClick={onClose} className="block md:hidden">
                                    <button
                                        className={`hover:bg-[#35b7ff] hover:bg-opacity-25 w-full p-4 cursor-pointer flex text-base items-center gap-4`}

                                    >
                                        <MdOutlineWatchLater className='text-2xl' />Watch later
                                    </button>
                                </Link>

                                <hr />
                                <button onClick={() => { signOut(), onClose() }} className="hover:bg-[#35b7ff] w-full text-base hover:bg-opacity-25 p-4 cursor-pointer flex items-center gap-4"><VscSignOut className="text-2xl" /> Sign out</button>
                            </div>
                        </>
                    ) : (<button onClick={() => signIn('google')} title='Account' className='hover:bg-[#35b7ff] w-full text-base hover:bg-opacity-25 p-4 cursor-pointer flex items-center gap-4'><CgProfile className='text-2xl' /> Sign in</button>)
                }

            </div>
        </>

    )
}

export default Account
