import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useContext, useMemo } from "react";
import { toast } from "react-hot-toast";

const useSubscribe = ({ channelId }) => {
    const currentUser = useContext(CurrentUserContext);
    const router = useRouter();

    const hasSubscribed = useMemo(() => {
        if (!currentUser) {
            return false;
        }

        const subscriptions = currentUser.subscribedChannelIds || [];

        return subscriptions.includes(channelId);

    }, [currentUser, channelId]);

    const toggleSubscribe = useCallback(async () => {
        if (!currentUser) {
            toast.error('Please sign in to subscribe', {
                position: 'bottom-right',
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    border: '1px solid red',
                    background: 'rgba(255,0,0,0.5)',
                    color: '#fff',
                },
            });
            return;
        }

        try {
            if (hasSubscribed) {
                await fetch(`/api/users/subscriptions`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ channelId }),
                });
            } else {
                await fetch(`/api/users/subscriptions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ channelId }),
                });
            }
            
            router.refresh();

            toast.success(hasSubscribed ? 'Unsubscribed' : 'Subscribed', {
                position: 'bottom-right',
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    border: '1px solid green',
                    background: 'rgba(22,163,74,1)',
                    color: '#fff',
                },
            })
        } catch (error) {
            toast.error(hasSubscribed ? 'Failed to unsubscribe' : 'Failed to subscribe', {
                position: 'bottom-right',
                duration: 5000,
                style: {
                    borderRadius: '10px',
                    border: '1px solid red',
                    background: 'rgba(255,0,0,0.5)',
                    color: '#fff',
                },
            })
        }
    }, [currentUser, hasSubscribed, channelId, router])

    return { hasSubscribed, toggleSubscribe }
}

export default useSubscribe