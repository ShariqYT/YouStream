"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/db/connectDB";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return null
        }
        const currentUser = await User.findOne({ email: session.user.email });
        const convertedUser = JSON.parse(JSON.stringify(currentUser))
        return convertedUser
    } catch (error) {
        return null
    }
}