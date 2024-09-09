"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MdOutlineContentCopy } from "react-icons/md"
import toast from "react-hot-toast"

const VideoPreview = ({ videoSrc, videoId }) => {
  const [videoLink, setVideoLink] = useState("")

  useEffect(() => {
    setVideoLink(`${window.location.host}/watch/${videoId}`)
  }, [videoId])

  const copyLink = () => {
    navigator.clipboard.writeText(videoLink).then(() => {
      toast.success('Link copied to clipboard', {
        position: 'bottom-right',
        duration: 5000,
        style: {
          borderRadius: '10px',
          border: '1px solid green',
          background: 'rgba(22,163,74,1)',
          color: '#fff',
        },
      })
    })
  }

  return (
    <div className="w-full md:w-2/5 flex flex-col gap-8 md:overflow-hidden rounded-md">
      <iframe src={videoSrc} className="aspect-video w-[21.5rem] md:w-96 h-fit drop-shadow-[0_0_20px_rgba(0,0,0,0.25)] mx-auto rounded-md" />

      <div className="bg-blue-100 p-4 flex flex-col gap-4 rounded-md">

        <div className="flex justify-between">
          <div className="w-4/5 truncate">
            <div className="text-sm text-zinc-500">
              Video link
            </div>
            <Link href={videoSrc} className="text-sky-600">
              {videoLink}</Link>
          </div>
          <button onClick={copyLink}>
            <MdOutlineContentCopy className="cursor-pointer" />
          </button>
        </div>

      </div>
    </div>
  )
}

export default VideoPreview
