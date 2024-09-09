"use client";

import { useProtectedRoutes } from "@/hooks/useProtectedRoutes";
import VideoCard from "../VideoCard";

const SubscriptionList = ({ videos }) => {
    useProtectedRoutes({ checkChannel: false });

    return (
        <div className="mx-1 pb-24 md:pb-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-2">
            {videos.map(video => (
                <VideoCard
                    key={video._id}
                    video={video}
                    channel={video.channelId} // Updated to use populated channel data
                    channelAvatar={true}
                    width={40}
                    height={40}
                    className={"object-cover aspect-square"}
                    isOption
                />
            ))}
        </div>
    );
};

export default SubscriptionList;
