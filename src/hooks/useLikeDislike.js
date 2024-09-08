import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useCallback } from "react";
import toast from "react-hot-toast";


const useLikeDislike = ({ videoId }) => {
    const currentUser = useContext(CurrentUserContext)

    const router = useRouter();

    const likeDislikeStatus = useMemo(() => {
        if (!currentUser || !videoId) {
            return false
        }

        const likeVideoIds = currentUser.likedVideoIds || []
        const dislikedVideoIds = currentUser.dislikedVideoIds || []

        if (likeVideoIds.includes(videoId)) {
            return true
        } else if (dislikedVideoIds.includes(videoId)) {
            return false
        } else {
            return null
        }
    }, [currentUser, videoId])

    const toggleLikeDislike = useCallback(async (action) => {
        if (!currentUser) {
            toast.error("Please sign in to like/dislike", {
                position: "bottom-right",
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    border: "1px solid red",
                    background: "rgba(255,0,0,0.5)",
                    color: "#fff",
                },
            })
            return
        } else if (!videoId) {
            return
        }

        try {
            if (action === "like") {
                switch (likeDislikeStatus) {
                    case true:
                        await fetch(`/api/watch/${videoId}/like`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        break
                    case false:
                        await fetch(`/api/watch/${videoId}/dislike`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }).then(() => fetch(`/api/watch/${videoId}/like`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }))
                        break
                    default:
                        await fetch(`/api/watch/${videoId}/like`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        break
                }
            } else if (action === "dislike") {
                switch (likeDislikeStatus) {
                    case true:
                        await fetch(`/api/watch/${videoId}/like`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }).then(() => fetch(`/api/watch/${videoId}/dislike`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }))
                        break
                    case false:
                        await fetch(`/api/watch/${videoId}/dislike`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        break
                    default:
                        await fetch(`/api/watch/${videoId}/dislike`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        break
                }
            }

            router.refresh()

            toast.success("Success", {
                position: "bottom-right",
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    border: "1px solid green",
                    background: "rgba(22,163,74,1)",
                    color: "#fff",
                },
            })
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                duration: 5000,
                style: {
                    borderRadius: "10px",
                    border: "1px solid red",
                    background: "rgba(255,0,0,0.5)",
                    color: "#fff",
                },
            })
            return
        }
    }, [currentUser, likeDislikeStatus, videoId, router])

    return { likeDislikeStatus, toggleLikeDislike }
}

export default useLikeDislike