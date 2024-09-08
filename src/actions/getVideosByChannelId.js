import connectDB from "@/db/connectDB";
import Video from "@/models/Video";

export default async function getVideosByChannelId(params) {
    try {
        await connectDB();

        const { channelId } = params
        const query = {}

        if (channelId) {
            query.channelId = channelId
        }

        const videos = await Video.find(query)
        const result = JSON.parse(JSON.stringify(videos))
        return result || []

    } catch (error) {
        throw new Error(error);
    }
} 