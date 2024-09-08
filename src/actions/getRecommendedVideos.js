import connectDB from "@/db/connectDB";
import Video from "@/models/Video";
import Channel from "@/models/Channel";

export async function getRecommendedVideos({ video }) {
    try {
        await connectDB();

        const videos = await Video.aggregate([
            {
                $search: {
                    index: "default",
                    moreLikeThis: {
                        like: [
                            {
                                description: video?.description,
                                title: video?.title,
                            },
                        ],
                    },
                },
            },
            { $limit: 10 },
            {
                $lookup: {
                    from: "channels", // The collection name should be the plural form
                    localField: "channelId",
                    foreignField: "_id",
                    as: "channel",
                },
            },
            {
                $project: {
                    _id: 0,
                    _id: { $toString: "$_id" },
                    title: 1,
                    description: 1,
                    createdAt: 1,
                    thumbnailSrc: 1,
                    viewCount: 1,
                    videoSrc: 1,
                    channel: { $arrayElemAt: ["$channel", 0] },
                },
            },
        ]);

        const final = videos.filter((vid) => vid._id !== video?._id)
        const convert = JSON.parse(JSON.stringify(final))
        
        return convert

    } catch (error) {
        throw new Error(error.message);
    }
}
