"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgMoreVertical } from "react-icons/cg";
import { LiaDownloadSolid } from "react-icons/lia";
import { MdOutlineWatchLater } from "react-icons/md";
import { PiBookmark, PiShareFatLight } from "react-icons/pi";
import ChannelLogo from '@/assets/channellogo.jpg';
import TestThumbnail from '@/assets/test.jpg';

const HomePage = () => {
    const [showOptions, setShowOptions] = useState(null); // Track which card's options are open

    // Instead of generating the cardId inside the component, generate it for each card in the array
    const cards = [
        {
            id: 1, // Unique ID for each card
            thumbnail: TestThumbnail,
            duration: '12:34',
            title: "Venom Masterclass: How to Maximize Viper's Impact in Every Round",
            channelName: "Venom",
            views: "1.5M views",
            date: "2 weeks ago",
            channelLogo: ChannelLogo,
        },
        {
            id: 2, // Unique ID for each card
            thumbnail: TestThumbnail,
            duration: '20:04',
            title: "Viper Unleashed: Controlling the Battlefield with Toxic Precision",
            channelName: "Venom",
            views: "2.5M views",
            date: "1 month ago",
            channelLogo: ChannelLogo,
        },
        {
            id: 3, // Unique ID for each card
            thumbnail: TestThumbnail,
            duration: '6:46',
            title: "Dominate with Poison: Viper's Essential Tips & Tricks!",
            channelName: "Venom",
            views: "5M views",
            date: "4 weeks ago",
            channelLogo: ChannelLogo,
        },
        {
            id: 4, // Unique ID for each card
            thumbnail: TestThumbnail,
            duration: '09:21',
            title: "Viper's Pit: The Ultimate Guide to Winning Clutch Rounds",
            channelName: "Venom",
            views: "100K views",
            date: "1 day ago",
            channelLogo: ChannelLogo,
        },
        {
            id: 5, // Unique ID for each card
            thumbnail: TestThumbnail,
            duration: '21:53',
            title: "Toxic Tactics: Mastering Viper's Deadly Lineups!",
            channelName: "Venom",
            views: "10M views",
            date: "3 months ago",
            channelLogo: ChannelLogo,
        },
        {
            id: 6, // Unique ID for each card
            thumbnail: TestThumbnail,
            duration: '16:27',
            title: "Viper's Venom: Pro Tips for Dominating with Toxic Screens",
            channelName: "Venom",
            views: "235K views",
            date: "6 days ago",
            channelLogo: ChannelLogo,
        },
    ];

    const handleOptionsToggle = (id) => {
        setShowOptions((prevState) => (prevState === id ? null : id));
    };
    

    return (
        <section>
            <div className='card-container flex items-center gap-2 flex-wrap'>
                {cards.map((card) => (
                    <div key={card.id} className="card flex group flex-col items-center rounded-2xl p-4 max-w-[330px] max-h-[390px] hover:bg-[#35b7ff] hover:bg-opacity-25">

                        <Link href={'/'}>
                            <div className='thumbnail relative group-hover:scale-[1.02] transition-transform duration-200 ease-linear'>
                                <Image priority className='rounded-xl border' src={card.thumbnail} unoptimized alt="thumbnail" width={350} height={350} />
                                <p className='text-sm absolute bottom-2 left-2 duration bg-[rgba(0,0,0,0.7)] w-fit px-2 py-[0.2rem] rounded-md text-white'>{card.duration}</p>
                            </div>
                        </Link>

                        <div className='flex'>

                            <div className='content flex gap-2 mt-2'>
                                <Link href={'/'}>
                                    <div className="channel_logo">
                                        <Image priority className='rounded-full' src={card.channelLogo} unoptimized alt="channel logo" width={40} height={40} />
                                    </div>
                                </Link>
                                <div className="video_info">
                                    <Link href={'/'}>
                                        <div className="video_title overflow-hidden w-52">
                                            <p className='text-[1rem] font-semibold line-clamp-2'>{card.title}</p>
                                        </div>
                                    </Link>
                                    <Link href={'/'}>
                                        <div className="channel_name mt-1" title={card.channelName}>
                                            <span className='text-[0.9rem] font-semibold text-[#35b7ff]'>{card.channelName}</span>
                                        </div>
                                    </Link>
                                    <Link href={'/'}>
                                        <div className="views_and_date mt-1">
                                            <span className='text-[0.8rem] font-medium'>{card.views} • {card.date}</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className='options z-[1000] mt-5 relative'>
                                <button
                                    onClick={() => handleOptionsToggle(card.id)}
                                    onBlur={() => setShowOptions(null)}
                                    className='flex items-center py-2 px-2 placeholder:text-gray-600 text-gray-600 rounded-full outline-none hover:border-[#35b7ff] hover:bg-[#35b7ff] hover:bg-opacity-50'
                                >
                                    <CgMoreVertical className='text-xl' />
                                </button>
                                {showOptions === card.id && (
                                    <div className='bg-white border border-[#35b7ff] overflow-hidden w-fit whitespace-nowrap absolute top-10 rounded-2xl drop-shadow-[0_0px_20px_rgba(0,0,0,0.2)] flex flex-col'>
                                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><MdOutlineWatchLater className='text-2xl' /> Save to Watch later</div>
                                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><PiBookmark className='text-2xl' /> Save to playlist</div>
                                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><LiaDownloadSolid className='text-2xl' />Download</div>
                                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><PiShareFatLight className='text-2xl' />Share</div>
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default HomePage;
