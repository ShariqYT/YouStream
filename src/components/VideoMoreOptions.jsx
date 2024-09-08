"use client"

import { CgMoreVertical } from "react-icons/cg"
import { MdOutlineWatchLater } from "react-icons/md"
import { PiBookmark, PiShareFatLight } from "react-icons/pi"
import { LiaDownloadSolid } from "react-icons/lia"
import { useState } from "react"

const VideoMoreOptions = ({isOption}) => {
    const [showOption, setShowOption] = useState(false);

    return (
        <>
            <div className='options relative z-[1010]'>
                <button
                    onClick={() => setShowOption(!showOption)}
                    onBlur={() => setShowOption(false)}
                    className={`${isOption ? 'flex' : 'hidden'} items-center py-2 px-2 placeholder:text-gray-600 text-gray-600 rounded-full outline-none hover:border-[#35b7ff] hover:bg-[#35b7ff] hover:bg-opacity-50`}
                >
                    <CgMoreVertical className='text-xl' />
                </button>
                {showOption && (
                    <div className='bg-white border border-[#35b7ff] overflow-hidden w-fit whitespace-nowrap absolute top-10 rounded-2xl drop-shadow-[0_0px_20px_rgba(0,0,0,0.2)] flex flex-col'>
                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><MdOutlineWatchLater className='text-2xl' /> Save to Watch later</div>
                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><PiBookmark className='text-2xl' /> Save to playlist</div>
                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><LiaDownloadSolid className='text-2xl' />Download</div>
                        <div className='flex items-center gap-4 p-4 text-sm cursor-pointer hover:bg-[#35b7ff] hover:bg-opacity-25'><PiShareFatLight className='text-2xl' />Share</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default VideoMoreOptions
