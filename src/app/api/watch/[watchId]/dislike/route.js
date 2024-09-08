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
        // Check if the user has already disliked the video
        const user = await User.findOne({ email: currentUser.email }).lean();
        const hasDisliked = user.dislikedVideoIds.includes(watchId);

        if (hasDisliked) {
            // If already disliked, remove the dislike
            const updatedUser = await User.findOneAndUpdate(
                { email: currentUser.email },
                { $pull: { dislikedVideoIds: watchId } },
                { new: true }
            ).lean();

            const video = await Video.findOneAndUpdate(
                { _id: watchId },
                { $inc: { dislikeCount: -1 } }
            ).lean();

            if (!updatedUser || !video) {
                return NextResponse.error();
            }

            return NextResponse.json({ updatedUser, video });
        } else {
            // If not disliked, add the dislike
            const updatedUser = await User.findOneAndUpdate(
                { email: currentUser.email },
                { $addToSet: { dislikedVideoIds: watchId } },
                { new: true }
            ).lean();

            const video = await Video.findOneAndUpdate(
                { _id: watchId },
                { $inc: { dislikeCount: 1 } }
            ).lean();

            if (!updatedUser || !video) {
                return NextResponse.error();
            }

            return NextResponse.json({ updatedUser, video });
        }
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
            { $pull: { dislikedVideoIds: watchId } }
        ).lean();

        const video = await Video.findOneAndUpdate(
            { _id: watchId },
            { $inc: { dislikeCount: -1 } }
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
