"use client"

import { LuHome } from "react-icons/lu";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiPlayList2Fill, RiVideoUploadLine } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from "./Avatar";
import Account from "./Account";
import { useContext, useState } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";

const BottomNav = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [acctMenu, setAcctMenu] = useState(false)

    const currentUser = useContext(CurrentUserContext)
    const currentChannel = useContext(CurrentChannelContext)
    const CreateChannelModal = useContext(CreateChannelModalContext)

    const handleUploadClick = () => {
        if (!currentChannel) CreateChannelModal?.onOpen();
        else router.push('/studio/upload')
    }

    return (
        <header className={` ${pathname === '/studio' || pathname === '/studio/upload' ? 'hidden' : ''} drop-shadow-[0_0_10px_rgba(0,0,0,0.1)] z-[1050] fixed transform left-[50%] bottom-0 translate-x-[-50%]`}>
            <div className='w-[100vw] md:w-[32vw] bg-white flex justify-evenly items-center border-b-0 border-2 border-[#35b7ff] rounded-b-none rounded-xl md:py-2'>
                <Link href={'/'}>
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-[10px] md:text-sm ${pathname === '/' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <LuHome className='text-2xl' />Home
                    </button>
                </Link>

                {currentUser &&
                    <button onClick={handleUploadClick} title='Upload' className={`${pathname === '/upload' ? 'bg-[#35b7ff] bg-opacity-75' : ''} md:hidden flex flex-col text-[10px] items-center py-2 px-2 placeholder:text-gray-600 text-black rounded-full outline-none hover:border-[#35b7ff]`}><RiVideoUploadLine className='text-2xl' />Upload</button>
                }

                <Link href={'/subscriptions'}>
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-[10px] md:text-sm ${pathname === '/subscriptions' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <MdOutlineSubscriptions className='text-2xl' />Subscriptions
                    </button>
                </Link>

                <div className='md:hidden flex flex-col items-center text-[10px] '>
                    <Avatar title={'Account'} alt={"avatar"} width={25} height={25} imageSrc={currentUser?.image} classname={'cursor-pointer, aspect-square object-contain'} currentUser={currentUser} onClick={() => setAcctMenu(true)} />
                    You
                    {acctMenu ? <Account currentUser={currentUser} onClose={() => setAcctMenu(false)} /> : null}
                </div>

                <Link href={'/playlists'} className="md:block hidden">
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-sm ${pathname === '/playlists' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <RiPlayList2Fill className='text-2xl' />Playlists
                    </button>
                </Link>

                <Link href={'/watch-later'} className="md:block hidden">
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-sm ${pathname === '/watch-later' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <MdOutlineWatchLater className='text-2xl' />Watch later
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default BottomNav;
