import Image from 'next/image';
import React from 'react'
import { RxDotFilled } from "react-icons/rx";
import { CgMoreVertical } from "react-icons/cg";
import ChannelLogo from '@/assets/channellogo.jpg';
import TestThumbnail from '@/assets/test.jpg';
import Link from 'next/link';

const Notifications = ({ notification }) => {
    return (
        <>
            {notification &&
                <div className='w-[500px] h-fit max-h-[500px] absolute right-0 top-14 drop-shadow-[0_0_20px_rgba(0,0,0,0.25)] bg-white text-black border overflow-hidden border-[#35b7ff] rounded-xl'>
                    <h2 className='p-4'>Notifications</h2>
                    <hr />

                    <div className='notifications-container'>

                        <div className='notification p-4 hover:bg-[#35b7ff] hover:bg-opacity-10 flex items-center justify-between gap-4'>
                            <Link href={'/'} className='flex items-center justify-between gap-2'>
                                <RxDotFilled className='text-[#35b7ff] text-4xl' />
                                <>
                                    <Image priority className='rounded-full' src={ChannelLogo} alt="logo" width={40} height={40} />
                                </>
                                <div className='notify_info'>
                                    <p className='text-sm line-clamp-2 font-semibold'>Viper&apos;s Venom: Pro Tips for Dominating with Toxic Screens</p>
                                    <p className='text-[0.8rem] mt-2'>2 hours ago</p>
                                </div>
                                <>
                                    <Image priority className='rounded-lg border' src={TestThumbnail} alt="logo" width={100} height={40} />
                                </>
                            </Link>
                            <CgMoreVertical className='text-4xl' />
                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default Notifications
