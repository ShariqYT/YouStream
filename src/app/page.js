import getTrendingVideos from "@/actions/getTrendingVideos";
import VideoCard from "@/components/VideoCard";

export default async function Home() {
  const trendingVideos = await getTrendingVideos();

  return (
    <div className="mx-1 sm:mx-24 pb-24 md:pb-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-2">
      {
        trendingVideos ? trendingVideos.map(trendingVideo => {
          return (<VideoCard key={trendingVideo._id} video={trendingVideo} channel={trendingVideo.channelId} className={"object-cover aspect-square"} width={40} height={40} channelAvatar={true} isOption={true} />)
        }) : "Trending videos not found"
      }
    </div>
  )
}
