import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    // signIn: "/login",
    // signUp: "/register",
    // error: "/",
    // signOut: "/",
    // verifyRequest: "/", // (used for check email message)
    // newUser: "/",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const { email, password } = credentials as {
          email?: string;
          password?: string;
        };

        console.log(email, password);
        return {
          name: "Himanshu user",
          image:
            "https://lh3.googleusercontent.com/a/ACg8ocIXH1OzdIK01CcjMDfzvlhE-LPnbaeCUG5RLgnXP0puXt80bqNX=s96-c",
          email: email,
        };
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  // callback: {
  //   // async jwt({ token, user, session, trigger }: any) {
  //   //   // console.log(
  //   //   //   `token -------token ${token} - token , user ${user} , session ${session}`
  //   //   // );

  //   //   return token;
  //   // },
  //   // async session({ session, token, user }: any) {
  //   //   // console.log(
  //   //   //   `session -------token ${token} - token , user ${user} , session ${session}`
  //   //   // );
  //   // },
  // },
  secret: process.env.NEXTAUTH_SECRET!,
};

// export default NextAuth(authOptions);
const handler = NextAuth(authOptions);
export default handler;
export { handler as GET, handler as POST };
