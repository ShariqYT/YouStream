"use client"

import { GoHome } from "react-icons/go";
import { MdOutlineSubscriptions } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav = () => {
    const pathname = usePathname();

    return (
        <header className={` ${pathname === '/studio' || pathname === '/studio/upload' ? 'hidden' : ''} z-[999] fixed transform left-[50%] bottom-2 translate-x-[-50%]`}>
            <div className='w-[32vw] bg-white flex justify-evenly items-center border-2 border-[#35b7ff] rounded-full py-2'>
                <Link href={'/'}>
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-sm ${pathname === '/' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <GoHome className='text-2xl' />Home
                    </button>
                </Link>
                <Link href={'/subscriptions'}>
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-sm ${pathname === '/subscriptions' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <MdOutlineSubscriptions className='text-2xl' />Subscriptions
                    </button>
                </Link>
                <Link href={'/playlists'}>
                    <button
                        className={`rounded-full px-2 flex flex-col items-center text-sm ${pathname === '/playlists' ? 'bg-cyan-400 bg-opacity-50' : 'hover:bg-cyan-400 hover:bg-opacity-50'}`}

                    >
                        <RiPlayList2Fill className='text-2xl' />Playlists
                    </button>
                </Link>
                <Link href={'/watch-later'}>
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
