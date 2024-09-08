import MongoDBAdapter from "@/db/MongoDBAdapter";
import client from "@/lib/mongoClient";
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";


export const authOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    adapter: MongoDBAdapter(client),
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
})

export { authOptions as GET, authOptions as POST };