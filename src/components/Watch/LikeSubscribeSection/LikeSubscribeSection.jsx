"use client"

import { CurrentUserContext } from "@/context/CurrentUserContext"
import { useContext } from "react"
import LikeDislikeButton from "./LikeDislikeButton"
import Link from "next/link"
import Avatar from "@/components/Navbar/Avatar"
import { compactNumberFormat } from "@/utils/numUtils"
import SubscribeButton from "@/components/SubscribeButton"
import Button from "@/components/Button"

const LikeSubscribeSection = ({ video, channel }) => {
    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <Link href={`/channel/${channel?._id}`}>
                    <Avatar width={50} height={50} classname={'cursor-pointer object-cover aspect-square'} imageSrc={channel?.imageSrc} alt={channel?.name} />
                </Link>
                <div className="flex flex-col justify-between mr-2">
                    <Link href={`/channel/${channel?._id}`}>
                        <h2 className="text-lg font-semibold">{channel?.name}</h2>
                    </Link>
                    <p className="text-sm text-neutral-600">{compactNumberFormat(channel.subscriberCount || 0)} subscribers</p>
                </div>
                {
                    channel.userId === currentUser?._id ? (
                        <Link href={'/studio'}>
                            <Button type={'rounded-dark'}>Manage videos</Button>
                        </Link>
                    ) : (
                        <SubscribeButton className={'text-[16px] font-semibold ml-6'} channelId={channel._id} />
                    )
                }
            </div>
            <LikeDislikeButton video={video} />
        </div>
    )
}

export default LikeSubscribeSection
