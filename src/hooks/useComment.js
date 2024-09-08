import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";


const useComment = ({ videoId }) => {
    const currentUser = useContext(CurrentUserContext)
    const currentChannel = useContext(CurrentChannelContext)
    const createChannelModal = useContext(CreateChannelModalContext)

    const router = useRouter()

    const [comment, setComment] = useState("")

    const submitComment = useCallback(async () => {
        if (!currentUser) {
            toast.error("Please sign in to comment", {
                position: "bottom-right",
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    border: "1px solid red",
                    background: "rgba(255, 0, 0, 0.5)",
                    color: "#fff",
                },
            })
            return
        }
        if (!currentChannel) {
            createChannelModal?.onOpen()
            return
        }
        if (!videoId) {
            return
        }

        const data = {
            videoId,
            comment,
            channelId: currentChannel._id,
            email: currentUser.email,
            channel: currentChannel
        }

        try {
            if (comment.trim()) {
                await fetch(`/api/comments/${videoId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then(() => {
                    setComment("")
                    toast.success("Comment added", {
                        position: "bottom-right",
                        duration: 5000,
                        style: {
                            borderRadius: "10px",
                            border: "1px solid green",
                            background: "rgba(22, 163, 74, 0.5)",
                            color: "#fff",
                        },
                    })
                })
            }
            router.refresh()

        } catch (error) {
            toast.error("Could not add comment", {
                position: "bottom-right",
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    border: "1px solid red",
                    background: "rgba(255, 0, 0, 0.5)",
                    color: "#fff",
                },
            })
        }

    }, [createChannelModal, comment, setComment, currentChannel, currentUser, videoId, router])

    return { comment, setComment, submitComment }

}

export default useComment