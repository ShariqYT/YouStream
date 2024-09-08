'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dayjs from '@/db/dayjs'
import { compactNumberFormat } from "@/utils/numUtils"
import { MdDelete } from "react-icons/md";
import { useCallback } from "react"
import toast from "react-hot-toast"

const VideoDetailsCard = ({ video }) => {
    const router = useRouter()

    const likeFraction = video.likeCount / (video.likeCount + video.dislikeCount)

    const handleDeleteVideo = useCallback(async () => {
        if (confirm("Are you sure you want to delete this video?")) {
            await fetch(`/api/watch/${video._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                toast.success("Video deleted", {
                    position: "bottom-right",
                    duration: 5000,
                    style: {
                        borderRadius: "10px",
                        border: "1px solid green",
                        background: "rgba(22,163,74,1)",
                        color: "#fff",
                    },
                })

                router.refresh()
            }).catch((error) => {
                toast.error("Video could not be deleted", {
                    position: "bottom-right",
                    duration: 5000,
                    style: {
                        borderRadius: "10px",
                        border: "1px solid red",
                        background: "rgba(220,38,38,1)",
                        color: "#fff",
                    },
                })
            })
        }
    }, [video.id])

    return <div key={video._id} className="flex gap-6 justify-between items-center bg-blue-100 p-4 rounded-lg">
        <Link href={`/watch/${video._id}`} onClick={() => router.refresh()}><Image src={video.thumbnailSrc} alt={video.title} width={160} height={90} className="cursor-pointer object-cover aspect-video rounded-lg" /></Link>

        <div className="w-2/5">
            <h3>{video.title}</h3>
            <p className="text-sm text-neutral-400 line-clamp-2">{video.description}</p>
        </div>

        <div className="flex flex-col">
            <p>{dayjs(video.createdAt).format('MMM D, YYYY')}</p>
            <p className="text-sm text-neutral-400">Published</p>
        </div>

        <div className="flex flex-col">
            <p>{compactNumberFormat(video.viewCount)}</p>
            <p className="text-sm text-neutral-400">Views</p>
        </div>

        <div className="flex flex-col">
            <p>{likeFraction ? `${likeFraction * 100}%` : "-"}</p>
            <p className="text-sm text-neutral-400">{video.likeCount} Likes</p>
        </div>

        <MdDelete className="h-6 w-6 cursor-pointer hover:fill-red-600" onClick={handleDeleteVideo} />

    </div>
}

export default VideoDetailsCard
