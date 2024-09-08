import getCurrentChannel from "@/actions/getCurrentChannel";
import connectDB from "@/db/connectDB";
import Channel from "@/models/Channel";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const search_query = request.nextUrl.searchParams.get("search_query");

        if (!search_query) {
            return NextResponse.json({ error: "Search query is missing" }, { status: 400 });
        }

        await connectDB();

        const videos = await Video.aggregate([
            {
                $search: {
                    index: "default", // Specify the index you're using, if any
                    text: {
                        query: search_query,
                        path: ["title", "description", "tags"], // Specify the fields to search in
                    },
                },
            },
            {
                $lookup: {
                    from: "channels", // The collection name should be the plural form
                    localField: "channelId",
                    foreignField: "_id",
                    as: "channel",
                },
            },
            {
                $unwind: "$channel", // Flatten the channel array to a single object
            },
            {
                $project: {
                    id: { $toString: "$_id" },
                    title: 1,
                    description: 1,
                    tags: 1,
                    createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    channelId: 1,
                    thumbnailSrc: 1,
                    viewCount: 1,
                    videoSrc: 1,
                    "channel.name": 1, // Only project the required fields from the channel
                    "channel.imageSrc": 1,
                    "channel._id": 1,
                },
            },
        ]);

        return NextResponse.json(videos);
    } catch (error) {
        console.error("GET Error: ", error);
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();

        const currentChannel = await getCurrentChannel();

        if (!currentChannel) {
            return NextResponse.json({ error: "Channel not found" }, { status: 404 });
        }

        const { id, videoSrc, title, description, tags, thumbnailSrc } = await request.json();

        const video = await Video.create({
            id,
            title,
            description,
            tags,
            videoSrc,
            thumbnailSrc,
            channelId: currentChannel._id,
        });

        await Channel.updateOne(
            { _id: currentChannel._id },
            { $push: { videos: video._id } }
        );

        return NextResponse.json(video);
    } catch (error) {
        console.error("POST Error: ", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
}
