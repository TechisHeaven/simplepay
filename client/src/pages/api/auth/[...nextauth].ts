import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import sanitizedConfig from "@/utils/env.config";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/",
    signOut: "/",
    verifyRequest: "/", // (used for check email message)
    newUser: "/",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "signIn",
      name: "signIn",
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email?: string;
          password?: string;
        };
        const url = sanitizedConfig.BACKEND_URL;
        const resu = await fetch(`${url}api/auth/login`, {
          body: JSON.stringify({ email, password }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await resu.json();
        if (result.status === 200) {
          return result.result;
        } else {
          if (result.error) {
            throw new Error(result.error);
          } else {
            throw new Error(result.message);
          }
        }
      },
    }),
    CredentialsProvider({
      type: "credentials",
      id: "signUp",
      name: "signUp",
      credentials: {
        name: {
          label: "name",
          type: "name",
          placeholder: "Himanshu",
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const { name, email, password } = credentials as {
          email: string;
          password: string;
          name: string;
        };
        const url = sanitizedConfig.BACKEND_URL;
        const resu = await fetch(`${url}api/auth/register`, {
          body: JSON.stringify({ name, email, password }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await resu.json();
        console.log(result);

        if (result.status === 201) {
          // Any object returned will be saved in `user` property of the JWT
          return result.result;
        } else {
          if (result.error) {
            throw new Error(result.error);
          } else {
            throw new Error(result.message);
          }
        }
        return {
          name: "Himanshu user",
          image:
            "https://lh3.googleusercontent.com/a/ACg8ocIXH1OzdIK01CcjMDfzvlhE-LPnbaeCUG5RLgnXP0puXt80bqNX=s96-c",
          email: result.email,
        };
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
