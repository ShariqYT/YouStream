import getTrendingVideos from "@/actions/getTrendingVideos";
import HomePage from "@/components/HomePage";
import VideoCard from "@/components/VideoCard";

export default async function Home() {
  const trendingVideos = await getTrendingVideos();

  return (
    <div className="mx-12 sm:mx-24 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
      {
        trendingVideos ? trendingVideos.map(trendingVideo => {
          return (<VideoCard key={trendingVideo._id} video={trendingVideo} channel={trendingVideo.channelId} className={"object-cover aspect-square"} width={40} height={40} channelAvatar={true} isOption={true} />)
        }) : "Trending videos not found"
      }
    </div>
  )
}
