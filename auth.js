import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import authConfig from "./auth.config";
import User from "./models/User";
import { connectDB } from "./lib/mongodb";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  //   adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  providers: [GitHub],
  callbacks: {
    async session({ session, token }) {
      session.user = { ...session.user, ...token };

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async signIn({ user, profile }) {
      const { email, name } = user;
      await connectDB();
      try {
        // Check if the user exists in the database
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          // If user doesn't exist, create a new user
          const newUser = new User({
            email,
            name,
          });
          await newUser.save();
        }

        // Allow sign-in
        user.id = existingUser._id;
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        // Deny sign-in if there's an error
        return false;
      }
    },
  },
});
