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
        <>
            <div className="flex flex-row gap-6 mx-1 md:gap-0 md:px-24 md:py-6 justify-between items-center">
                <div className="flex flex-row gap-2 md:gap-6 items-center md:items-start">
                    <div className="md:block hidden">
                        <Avatar imageSrc={channel.imageSrc} alt={channel.name} width={150} height={150} classname={'object-cover aspect-square'} />
                    </div>
                    <div className="block md:hidden">
                        <Avatar imageSrc={channel.imageSrc} alt={channel.name} width={90} height={90} classname={'object-cover aspect-square'} />
                    </div>
                    <div className="flex flex-col pt-4 gap-0">
                        <h1 className="md:text-4xl text-xl font-bold">{channel.name}</h1>
                        <div className="flex flex-col gap-1 md:gap-2">
                            <p className="font-semibold text-xs md:text-sm">{`@${channel.handle}`}</p>
                            <div className="flex items-center gap-2 text-sm md:text-base text-stone-500">
                                <p>{`${compactNumberFormat(channel.subscriberCount)} subscribers`}</p>
                                <p className="text-sm">•</p>
                                <p>{`${compactNumberFormat(videoCount)} videos`}</p>
                            </div>
                        </div>
                        {/* <p className="text-sm">{channel.description}</p> */}
                    </div>
                </div>
            </div>
            <div className="md:px-64 md:pb-10 md:py-0 py-6 md:text-left text-center">
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
        </>
    )
}

export default ChannelHeader
