"use client"

import { compactNumberFormat } from "@/utils/numUtils"
import { useState } from "react"
import dayjs from '@/db/dayjs'

const Description = ({ video }) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className={`mx-1 md:mx-0 bg-blue-100 text-[1rem] rounded-xl p-3 overflow-hidden ${isExpanded ? 'h-fit' : 'max-h-[7rem]'}`}>
            <div className="flex gap-2 text-neutral-700 font-semibold">
                <p>{compactNumberFormat(video.viewCount)} views</p>
                <p className="text-neutral-700">•</p>
                <p>{!isExpanded ? dayjs(video.createdAt).fromNow() : dayjs(video.createdAt).format('MMMM D, YYYY')}</p>
            </div>
            <div className={isExpanded ? '' : 'line-clamp-fallback'}>
                <div className="whitespace-pre-line text-neutral-700">
                    {
                        video.description.split('\n').map((line, index) => {
                            return line === "" ? <br key={index} /> : <p key={index}>{line}</p>
                        })
                    }
                </div>
            </div>
            <p onClick={() => {
                setIsExpanded(!isExpanded)
            }} className={`cursor-pointer ${isExpanded ? 'mt-2' : ''}`}>
                {isExpanded ? 'Show less' : '...more'}
            </p>
        </div>
    )
}

export default Description
