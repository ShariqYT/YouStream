"use client"

import { CurrentUserContext } from "@/context/CurrentUserContext"
import { useContext } from "react"
import LikeDislikeButton from "./LikeDislikeButton"
import Link from "next/link"
import Avatar from "@/components/Navbar/Avatar"
import { compactNumberFormat } from "@/utils/numUtils"
import SubscribeButton from "@/components/SubscribeButton"
import Button from "@/components/Button"
import { FaRegShareSquare } from "react-icons/fa";
import toast from "react-hot-toast"

const LikeSubscribeSection = ({ video, channel }) => {
    const currentUser = useContext(CurrentUserContext)

    const manualCopyFallback = (url) => {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        try {
            document.execCommand("copy"); // Fallback to document.execCommand for copying
            toast.success("Link copied to clipboard!", {
                duration: 3000,
                position: "top-center",
                style: {
                    borderRadius: "10px",
                    background: "rgb(26, 26, 26)",
                    color: "#fff",
                },
            });
        } catch (err) {
            toast.error("Failed to copy the link. Please copy manually.", {
                duration: 3000,
                position: "top-center",
                style: {
                    borderRadius: "10px",
                    border: "1px solid red",
                    background: "rgb(255, 0, 0,)",
                    color: "#fff",
                },
            });
            console.error("Manual copy failed:", err);
        }
        document.body.removeChild(input); // Clean up the temporary input
    };


    return (
        <>
            <div className="mx-1 md:mx-0 md:flex items-center justify-between">
                <div className="flex gap-3 justify-between items-center">
                    <div className="flex items-center justify-between gap-4">
                        <Link href={`/channel/${channel?._id}`}>
                            <Avatar width={50} height={50} classname={'cursor-pointer object-cover aspect-square'} imageSrc={channel?.imageSrc} alt={channel?.name} />
                        </Link>
                        <Link href={`/channel/${channel?._id}`}>
                            <h2 className="md:text-lg text-base font-semibold">{channel?.name}</h2>
                            <p className="text-sm text-neutral-600">{compactNumberFormat(channel.subscriberCount || 0)} subscribers</p>
                        </Link>
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
                <div className="hidden md:flex items-center gap-2 w-fit mx-1">
                    <button
                        className="md:flex hidden items-center gap-1 bg-blue-100 px-3 py-2 text-black rounded-md"
                        onClick={async () => {
                            if (navigator.share) {
                                try {
                                    // Web Share API is supported
                                    await navigator.share({
                                        title: video.title,
                                        text: `Check out this video: ${video.title}`,
                                        url: window.location.href,
                                    });
                                    console.log("Shared successfully!");
                                } catch (error) {
                                    // Handle share failure
                                    console.error("Error while sharing:", error);
                                }
                            } else if (navigator.clipboard) {
                                try {
                                    // Use Clipboard API as fallback
                                    await navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied to clipboard!", {
                                        duration: 3000,
                                        position: "bottom-right",
                                        style: {
                                            borderRadius: "10px",
                                            background: "rgba(0, 0, 0, 0.8)",
                                            color: "#fff",
                                        },
                                    });
                                } catch (error) {
                                    // Clipboard copy failed, fallback to manual copy
                                    console.error("Clipboard copy failed:", error);
                                    manualCopyFallback(window.location.href); // Trigger manual copy fallback
                                }
                            } else {
                                // Clipboard API not supported, fallback to manual copy
                                manualCopyFallback(window.location.href);
                            }
                        }}
                    >
                        <FaRegShareSquare className="text-2xl" />
                        Share
                    </button>
                    <LikeDislikeButton video={video} />
                </div>
            </div>
            <div className="md:hidden flex items-center gap-2 w-fit mx-1">
                <LikeDislikeButton video={video} />
                <button
                    className="flex md:hidden items-center gap-1 bg-blue-100 px-3 py-2 text-black rounded-md"
                    onClick={async () => {
                        if (navigator.share) {
                            try {
                                // Web Share API is supported
                                await navigator.share({
                                    title: video.title,
                                    text: `Check out this video: ${video.title}`,
                                    url: window.location.href,
                                });
                                console.log("Shared successfully!");
                            } catch (error) {
                                // Handle share failure
                                console.error("Error while sharing:", error);
                            }
                        } else if (navigator.clipboard) {
                            try {
                                // Use Clipboard API as fallback
                                await navigator.clipboard.writeText(window.location.href);
                                toast.success("Link copied to clipboard!", {
                                    duration: 3000,
                                    position: "bottom-right",
                                    style: {
                                        borderRadius: "10px",
                                        background: "rgba(0, 0, 0, 0.8)",
                                        color: "#fff",
                                    },
                                });
                            } catch (error) {
                                // Clipboard copy failed, fallback to manual copy
                                console.error("Clipboard copy failed:", error);
                                manualCopyFallback(window.location.href); // Trigger manual copy fallback
                            }
                        } else {
                            // Clipboard API not supported, fallback to manual copy
                            manualCopyFallback(window.location.href);
                        }
                    }}
                >
                    <FaRegShareSquare className="text-2xl" />
                    Share
                </button>

            </div>
        </>
    )
}

export default LikeSubscribeSection
