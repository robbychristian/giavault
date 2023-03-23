import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { JWTParse } from "../../../../lib/jwt";

export default NextAuth({
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async session({ session, token }) {
      //@ts-ignore
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.NEXT_API_URL}/api/login?username=${credentials?.username}&password=${credentials?.password}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let user = await res.json();
        // If no error and we have user data, return it
        if (res.ok && user.token) {
          user = JWTParse(user.token);
          return user;
        }
        // Return null if user data could not be retrieved
        throw new Error("Unauthorized");
        // return null;
      },
    }),
  ],
});
