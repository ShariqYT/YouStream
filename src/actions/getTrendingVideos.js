import connectDB from "@/db/connectDB";
import Channel from "@/models/Channel";
import Video from "@/models/Video";

export default async function getTrendingVideos() {
    try {
        await connectDB();

        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)

        const videos = await Video.find({
            createdAt: {
                $gte: startDate
            }
        }).sort({ viewCount: -1 }).limit(50).populate('channelId', 'name handle imageSrc');

        return JSON.parse(JSON.stringify(videos));

    } catch (error) {
        throw new Error(error);
    }
}