import Channel from "@/models/Channel";
import getCurrentUser from "./getCurrentUser";
import connectDB from "@/db/connectDB";

export default async function getCurrentSubscriptions() {
    try {
        await connectDB();

        const user = await getCurrentUser();

        if (!user) {
            return []
        }

        const subscriptions = await Channel.find({ _id: { $in: user.subscribedChannelIds } });

        const result = JSON.parse(JSON.stringify(subscriptions));

        return result || [];

    } catch (error) {
        throw new Error(error);
    }
}