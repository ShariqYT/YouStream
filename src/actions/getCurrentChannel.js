import connectDB from "@/db/connectDB";
import Channel from "@/models/Channel";
import getCurrentUser from "./getCurrentUser";

export default async function getCurrentChannel() {
    try {
        await connectDB();

        const user = await getCurrentUser();

        const query = {}

        if (user?._id) {
            query.userId = user._id
        } else {
            return null
        }

        const currentChannel = await Channel.findOne(query);
        const convertedCurrentChannel = JSON.parse(JSON.stringify(currentChannel));
        return convertedCurrentChannel

    } catch (error) {
        throw new Error(error);
    }
}