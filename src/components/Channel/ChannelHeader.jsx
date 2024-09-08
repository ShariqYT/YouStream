"use client"

import { CurrentUserContext } from "@/context/CurrentUserContext"
import { useContext } from "react"
import Avatar from "../Navbar/Avatar"
import { compactNumberFormat } from "@/utils/numUtils"
import Link from "next/link"
import Button from "../Button"
import SubscribeButton from "../SubscribeButton"

const ChannelHeader = ({ channel, videoCount }) => {

    const currentUser = useContext(CurrentUserContext)

    return (
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 px-24 py-6 justify-between items-center">
            <div className="flex flex-col md:flex-row gap-0  md:gap-6 items-center md:items-start">
                <Avatar imageSrc={channel.imageSrc} alt={channel.name} width={150} height={150} classname={'object-cover aspect-square'} />
                <div className="flex flex-col pt-4 gap-4 md:gap-0">
                    <h1 className="text-4xl text-center md:text-start font-bold">{channel.name}</h1>
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-stone-400">
                        <p className="font-medium text-sm">{`@${channel.handle}`}</p>
                        <p className="text-sm">•</p>
                        <p>{`${compactNumberFormat(channel.subscriberCount)} subscribers`}</p>
                        <p className="text-sm">•</p>
                        <p>{`${compactNumberFormat(videoCount)} videos`}</p>
                    </div>
                    {/* <p className="text-sm">{channel.description}</p> */}
                </div>
            </div>
            {
                channel.userId === currentUser?._id ? (
                    <Link href={'/studio'}>
                        <Button type="rounded-dark">Manage Videos</Button>
                    </Link>
                ) : (
                    <SubscribeButton channelId={channel._id} />
                )
            }
        </div>
    )
}

export default ChannelHeader
