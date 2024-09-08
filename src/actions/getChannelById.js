import connectDB from "@/db/connectDB";
import Channel from "@/models/Channel";

export default async function getChannelById(params) {
    try {
        await connectDB();

        const { channelId } = params
        const query = {}

        if (channelId) {
            query._id = channelId
        }

        const channel = await Channel.findOne(query)
        const data = JSON.parse(JSON.stringify(channel))
        return data

    } catch (error) {
        throw new Error(error);
    }
}