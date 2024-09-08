"use client";

import { useProtectedRoutes } from "@/hooks/useProtectedRoutes";
import VideoCard from "../VideoCard";

const SubscriptionList = ({ videos }) => {
    useProtectedRoutes({ checkChannel: false });

    return (
        <div className="mx-12 sm:mx-24 py-8 scale-[1.1] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.map(video => (
                <VideoCard
                    key={video._id}
                    video={video}
                    channel={video.channelId} // Updated to use populated channel data
                    channelAvatar={true}
                    width={40}
                    height={40}
                    className={"object-cover aspect-square"}
                />
            ))}
        </div>
    );
};

export default SubscriptionList;
