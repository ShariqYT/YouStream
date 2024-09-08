import getCurrentUser from "@/actions/getCurrentUser";
import Channel from "@/models/Channel";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }

    const { channelId } = await request.json();

    await Channel.updateOne(
        { _id: channelId },
        { $inc: { subscriberCount: 1 } }
    );

    if (!currentUser.subscribedChannelIds) {
        currentUser.subscribedChannelIds = [];
    }

    const updatedUser = await User.findOneAndUpdate(
        { email: currentUser.email },
        { $addToSet: { subscribedChannelIds: channelId } },
        { new: true }
    ).lean();

    if (!updatedUser) {
        return NextResponse.error({ status: 500, body: 'Failed to update user' });
    }

    return NextResponse.json(updatedUser);
}

export async function DELETE(request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { channelId } = await request.json();

    // Decrease the subscriber count for the channel
    await Channel.updateOne(
        { _id: channelId },
        { $inc: { subscriberCount: -1 } }
    );

    // Remove channelId from the user's subscribedChannelIds
    const updatedUser = await User.updateOne(
        { email: currentUser.email },
        { $pull: { subscribedChannelIds: channelId } }
    );

    return NextResponse.json(updatedUser);
}