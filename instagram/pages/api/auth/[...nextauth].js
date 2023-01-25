import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({

            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // hd: "http://localhost:3000/"
        }),
        // ...add more providers here
    ],
    pages: {
        signIn: "/auth/signin"
    },



})
