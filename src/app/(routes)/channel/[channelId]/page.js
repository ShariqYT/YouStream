import getChannelById from "@/actions/getChannelById";
import getVideosByChannelId from "@/actions/getVideosByChannelId";
import ChannelHeader from "@/components/Channel/ChannelHeader";
import VideoCard from "@/components/VideoCard";

export default async function ChannelPage({ params }) {
    const { channelId } = params

    const channel = await getChannelById({ channelId })
    const videos = await getVideosByChannelId({ channelId })

    return channel ? (
        <div className="flex flex-col">
            <ChannelHeader channel={channel} videoCount={videos.length} />
            <div className="border-b-2 border-b-neutral-400 capitalize">
                <div className="text-center py-2 px-6 border-b-2 border-b-neutral-800 w-24 mx-auto md:mx-32">
                    videos
                </div>
            </div>
            <div className="mx-auto sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {
                    videos.map((video) => (
                        video ? (
                            <VideoCard key={video._id} video={video} />
                        ) : null
                    ))
                }
            </div>
        </div>
    ) : (
        <div>
            Channel not found
        </div>
    )
}