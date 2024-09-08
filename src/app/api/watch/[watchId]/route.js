import getCurrentChannel from "@/actions/getCurrentChannel";
import connectDB from "@/db/connectDB";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
    await connectDB();
    const currentChannel = await getCurrentChannel();

    if (!currentChannel) {
        return NextResponse.error();
    }

    const video = await Video.deleteOne({ _id: params.watchId }).lean();

    return NextResponse.json(video);
}

