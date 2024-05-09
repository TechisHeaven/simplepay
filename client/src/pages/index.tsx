import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSideProp } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Page({
  sessionError,
  session,
}: {
  sessionError: any;
  session: any;
}) {
  if (sessionError) {
    console.error("Error fetching session:", sessionError);
  }
  // console.log("user", session?.user);
  return (
    <>
      <main className={`flex h-screen flex-col  p-24 ${inter.className}`}>
        <h1 className="text-center">Simple pay</h1>
        <div>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.email}</p>
          <Image
            width={100}
            height={100}
            fetchPriority="high"
            draggable={false}
            src={session?.user?.image}
            alt={session?.user?.name}
          />
          {session?.user && (
            <button
              onClick={() => signOut()}
              className="p-2 px-4 bg-white hover:bg-white/90 text-black transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );
    // console.log(session);
    return {
      props: {
        session,
      },
    };
  } catch (error: any) {
    return { props: { sessionError: error.message || "Unknown error" } };
  }
}
