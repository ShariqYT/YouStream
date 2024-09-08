import Video from "@/models/Video";
import Channel from "@/models/Channel";
import getCurrentUser from "./getCurrentUser";
import connectDB from "@/db/connectDB";

export default async function getSubscriptionVideo() {
    await connectDB();
    const currentUser = await getCurrentUser();

    try {
        const videos = await Video.find({
            channelId: {
                $in: currentUser?.subscribedChannelIds
            }
        })
        .sort({ createdAt: -1 })
        .populate('channelId', 'name handle imageSrc'); // Populating the channel details

        return JSON.parse(JSON.stringify(videos));

    } catch (error) {
        throw new Error(error);
    }
}
