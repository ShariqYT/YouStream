import getCurrentChannel from "@/actions/getCurrentChannel";
import getVideosByChannelId from "@/actions/getVideosByChannelId";
import AnalyticsSummary from "@/components/Studio/AnalyticsSummary";
import VideoDetailsCard from "@/components/Studio/VideoDetailsCard";

export default async function StudioPage() {
    const currentChannel = await getCurrentChannel();
    const videos = await getVideosByChannelId({ channelId: currentChannel?._id });

    if (!currentChannel) {
        return (
            <div className="absolute text-2xl transform translate-x-1/2 translate-y-1/2 right-[50%] m-auto">
                Channel not found
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full h-full p-8">
            <AnalyticsSummary videos={videos} />
            <div className="flex flex-col gap-4 mt-8">
                <h2 className="text-2xl">Videos</h2>
                {
                    videos?.length ? videos.map((video) => {
                        return <VideoDetailsCard key={video._id} video={video} />
                    }) : "No videos yet"
                }
            </div>
        </div>
    )
}