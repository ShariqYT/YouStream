import getChannelById from "@/actions/getChannelById";
import getCommentsByWatchId from "@/actions/getCommentsByWatchId";
import { getRecommendedVideos } from "@/actions/getRecommendedVideos";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import VideoCard from "@/components/VideoCard";
import CommentSection from "@/components/Watch/CommentSection/CommentSection";
import Description from "@/components/Watch/Description";
import LikeSubscribeSection from "@/components/Watch/LikeSubscribeSection/LikeSubscribeSection";
import VideoPlayer from "@/components/Watch/VideoPlayer";

export default async function WatchPage({ params }) {

    const { watchId } = params;
    const video = await increaseVideoViewCount({ watchId })
    const channel = await getChannelById({ channelId: video?.channelId })
    const comments = await getCommentsByWatchId({ watchId })
    const recommendedVideos = await getRecommendedVideos({ video })

    return video && channel && comments ? (
        <>
            <div className="flex flex-col lg:flex-row md:mx-32 mt-2 gap-4">
                <div className="w-full lg:w-3/4 flex flex-col gap-4">
                    <VideoPlayer videoSrc={video.videoSrc} />
                    <h1 className="mx-1 md:mx-0 text-xl md:text-2xl font-semibold break-all">
                        {video.title}
                    </h1>
                    <LikeSubscribeSection video={video} channel={channel} />
                    <Description video={video} />
                    <CommentSection comments={comments} watchId={video._id} />
                </div>
                <div className="mx-1 md:mx-0 md:w-full w-[22.9rem] lg:w-1/4 flex flex-col gap-4 pb-24 md:pb-4">
                    {
                        recommendedVideos?.length ? recommendedVideos.map((recommendVideo, index) => <div key={index}>
                            <div className="md:block hidden">
                                <VideoCard isOption isVertical={false} channel={recommendVideo.channel} channelAvatar={true} video={recommendVideo} className={'object-cover aspect-square'} width={35} height={35} />
                            </div>
                            <div className="md:hidden block">
                                <VideoCard isOption isVertical={true} channel={recommendVideo.channel} channelAvatar={true} video={recommendVideo} className={'object-cover aspect-square'} width={35} height={35} />
                            </div>
                        </div>
                        ) : "No recommended videos yet"
                    }
                </div>
            </div>
        </>
    ) : (
        <div>
            Video not found
        </div>
    )
}