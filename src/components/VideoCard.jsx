"use client"

import Image from "next/image"
import Link from "next/link"
import Avatar from "./Navbar/Avatar"
import { compactNumberFormat } from "@/utils/numUtils"
import dayjs from "@/db/dayjs"
import VideoMoreOptions from "./VideoMoreOptions"
import { useEffect, useRef, useState } from "react"

const VideoCard = ({
    width = 60,
    height = 60,
    className,
    channel,
    channelAvatar = false,
    video,
    includeDescription = false,
    isVertical = true,
    isOption = false,
}) => {

    const [duration, setDuration] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                const videoDuration = videoRef.current.duration;
                setDuration(formatDuration(videoDuration));
            }
        };

        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.preload = "metadata";
            videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
            if (videoElement.readyState >= 1) {
                handleLoadedMetadata();
            }
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            }
        };
    }, []);

    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <>
            <div className={`flex items-start card group rounded-2xl hover:bg-opacity-25 ${isVertical ? 'flex-col' : 'flex-row'} gap-4 cursor-pointer`}>
                <div className={`relative aspect-video ${isVertical ? 'w-full' : 'w-3/5'}`} style={{ minWidth: '192px', minHeight: '108px' }}>
                    <Link href={`/watch/${video._id}`}>
                        <Image
                            className="object-cover rounded-lg"
                            src={video.thumbnailSrc}
                            alt={video.title}
                            fill
                            style={{ minWidth: '100%', minHeight: '100%' }}
                        />
                        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                            {duration}
                        </span>
                    </Link>
                    <video ref={videoRef} src={video.videoSrc} className="hidden" />
                </div>

                <div className={`flex gap-2 items-start ${isVertical ? 'w-full' : 'w-3/5'}`}>
                    {
                        channel && channelAvatar && isVertical ? (
                            <Link href={`/channel/${channel._id}`}>
                                <Avatar classname={`mt-1 ${className}`} width={width} height={height} imageSrc={channel.imageSrc} alt={channel.name} />
                            </Link>
                        ) : null
                    }
                    <div className="flex flex-col">
                        <h3 className={`line-clamp-2 ${isVertical ? 'text-md font-semibold' : 'text-md leading-5'}`}>{video.title}</h3>
                        {
                            channel ? (
                                <Link href={`/channel/${channel._id}`}>
                                    <div className="flex gap-2 items-center">
                                        {
                                            !isVertical && channelAvatar ? (
                                                <Avatar width={width} height={height} classname={`mt-1 ${className}`} imageSrc={channel.imageSrc} alt={channel.name} />

                                            ) : null
                                        }
                                        <p className="text-sm whitespace-nowrap font-semibold text-[#35b7ff]">{channel.name}</p>
                                    </div>
                                </Link>
                            ) : null
                        }
                        <p className="text-neutral-600 text-sm">
                            {compactNumberFormat(video.viewCount)} views • {dayjs(video.createdAt).fromNow()}
                        </p>
                        {
                            includeDescription ? (
                                <div className="whitespace-pre-line line-clamp-2 text-sm text-neutral-600">
                                    {
                                        video.description.split("\n").map((line, index) => {
                                            return line === "" ? (
                                                <br key={index} />
                                            ) : (
                                                <p key={index}>{line}</p>
                                            )
                                        })
                                    }
                                </div>
                            ) : null
                        }
                    </div>

                    <VideoMoreOptions isOption={isOption} />

                </div>
            </div>
        </>
    )
}

export default VideoCard
