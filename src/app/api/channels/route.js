import getCurrentUser from "@/actions/getCurrentUser";
import connectDB from "@/db/connectDB";
import Channel from "@/models/Channel";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { name, handle, imageSrc } = await request.json();

    const channel = await Channel.create({
        name,
        handle,
        imageSrc,
        userId: currentUser._id,
        email: currentUser.email
    });

    return NextResponse.json(channel);
}