import connectDB from "@/db/connectDB";
import Video from "@/models/Video";

export default async function increaseVideoViewCount({ watchId }) {
    try {
        await connectDB();
        const query = {};

        if(watchId) {
            query._id = watchId;
        }

        const video = await Video.findOneAndUpdate(query, {
            $inc: { viewCount: 1 }
        })
        const result = JSON.parse(JSON.stringify(video));
        return result;
    } catch (error) {
        throw new Error(error);
    }
}