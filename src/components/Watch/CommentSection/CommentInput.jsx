"use client"

import Button from "@/components/Button"
import Avatar from "@/components/Navbar/Avatar"
import { CurrentChannelContext } from "@/context/CurrentChannelContext"
import useComment from "@/hooks/useComment"
import { useContext } from "react"

const CommentInput = ({ watchId }) => {
    const currentChannel = useContext(CurrentChannelContext)

    const { comment, setComment, submitComment } = useComment({ videoId: watchId })


    return (
        <div className="flex gap-2 items-start">
            <div className="md:block hidden">
                <Avatar classname={'object-cover aspect-square cursor-pointer'} imageSrc={currentChannel?.imageSrc || null} alt={currentChannel?.name || null} width={60} height={60} />
            </div>
            <div className="block md:hidden">
                <Avatar classname={'object-cover aspect-square cursor-pointer'} imageSrc={currentChannel?.imageSrc || null} alt={currentChannel?.name || null} width={50} height={50} />
            </div>
            <div className="flex flex-col w-full">
                <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment" className="placeholder:text-neutral-600 bg-transparent outline-none border-b border-b-neutral-300 focus:border-b-2 focus:border-b-neutral-600 pb-1" />
                {
                    comment ? (
                        <div className="flex justify-end gap-4 mt-2">
                            <Button onClick={() => setComment('')} type="secondary">Cancel</Button>
                            <Button onClick={submitComment} type="primary">Comment</Button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default CommentInput
