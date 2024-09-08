import connectDB from "@/db/connectDB";
import Channel from "@/models/Channel";
import Comment from "@/models/Comment";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    await connectDB();

    const { watchId } = params;
    const { comment, channelId, email } = await request.json();

    if (!comment || !channelId || !watchId || !email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const createComment = await Comment.create({
            text: comment,
            channelId,
            videoId: watchId,
            email
        });

        const channelUpdate = await Channel.updateOne(
            { _id: channelId },
            { $push: { comments: createComment._id } }
        );

        const videoUpdate = await Video.updateOne(
            { _id: watchId },
            { $push: { comments: createComment._id } }
        );

        if (!channelUpdate.nModified || !videoUpdate.nModified) {
            return NextResponse.json({ error: "Failed to update channel or video comments" }, { status: 500 });
        }

        return NextResponse.json({ createComment });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
