"use client"

import useLikeDislike from "@/hooks/useLikeDislike"
import { compactNumberFormat } from "@/utils/numUtils";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";

const LikeDislikeButton = ({ video }) => {
  const {likeDislikeStatus, toggleLikeDislike} = useLikeDislike({ videoId: video._id })

  return (
    <div className="flex items-center gap-1 bg-blue-100 px-3 py-2 text-black rounded-md">
      <button className="pr-3 border-r-2 border-blue-200 flex items-center gap-3" onClick={() => toggleLikeDislike("like")}>
        {likeDislikeStatus === true ? <BiSolidLike size={25} /> : <BiLike size={25} />}
        <p className="text-base">{compactNumberFormat(video.likeCount)}</p>
      </button>
      <button className="pl-3 flex items-center gap-3" onClick={() => toggleLikeDislike("dislike")}>
        {likeDislikeStatus === false ? <BiSolidDislike size={25} /> : <BiDislike size={25} />}
        <p className="text-base">{compactNumberFormat(video.dislikeCount)}</p>
      </button>
    </div>
  )
}

export default LikeDislikeButton
