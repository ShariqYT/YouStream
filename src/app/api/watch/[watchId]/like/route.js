import getCurrentUser from "@/actions/getCurrentUser";
import User from "@/models/User";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const currentUser = await getCurrentUser();
    const { watchId } = params;

    if (!currentUser || !watchId) {
        return NextResponse.error();
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: currentUser.email },
            { $addToSet: { likedVideoIds: watchId } },
            { new: true }
        ).lean();

        const video = await Video.findOneAndUpdate(
            { _id: watchId },
            { $inc: { likeCount: 1 } }
        ).lean();

        if (!updatedUser || !video) {
            return NextResponse.error();
        }

        return NextResponse.json({ updatedUser, video });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function DELETE(request, { params }) {
    const currentUser = await getCurrentUser();
    const { watchId } = params;

    if (!currentUser || !watchId) {
        return NextResponse.error();
    }

    try {
        const updatedUser = await User.updateOne(
            { email: currentUser.email },
            { $pull: { likedVideoIds: watchId } }
        ).lean();

        const video = await Video.findOneAndUpdate(
            { _id: watchId },
            { $inc: { likeCount: -1 } }
        ).lean();

        if (!updatedUser || !video) {
            return NextResponse.error();
        }

        return NextResponse.json({ updatedUser, video });
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
