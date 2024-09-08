import connectDB from "@/db/connectDB";
import Comment from "@/models/Comment"
import Channel from "@/models/Channel";

export default async function getCommentsByWatchId(params) {
    try {
        await connectDB();

        const {watchId} = params

        const query = {}

        if(watchId) {
            query.videoId = watchId
        }

        const comments = await Comment.find(query).sort({createdAt: -1})

        const channelIds = comments.map(comment => comment.channelId);

        const channels = await Channel.find({ _id: { $in: channelIds } });

        const commentsWithChannel = comments.map(comment => {
            const channel = channels.find(channel => channel._id.toString() === comment.channelId);
            return { ...comment.toObject(), channel: channel || {} };
        });

        const result = JSON.parse(JSON.stringify(commentsWithChannel))
        return result
    } catch (error) {
        throw new Error(error);
    }
}