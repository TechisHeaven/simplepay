"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function profile() {
  const { data: session, status } = useSession();
  return (
    <div className="profile flex flex-col gap-4">
      {status === "loading" ? (
        <div className="skeleton p-4 border rounded-3xl flex flex-row gap-2">
          <div className="rounded-xl block w-12 h-10 bg-gray-400 animate-pulse" />
          <div className="h-full w-full">
            <h6 className="mt-1 h-2 w-full bg-gray-400 animate-pulse"></h6>
            <p className=" h-4 mt-2 w-full bg-gray-400 animate-pulse block relative"></p>
          </div>
        </div>
      ) : (
        <Link
          href="/profile"
          className="p-4 border rounded-3xl flex flex-row gap-2"
        >
          <Image
            fetchPriority="high"
            alt="profile-image"
            src={session?.user?.image || ""}
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="text-sm">
            <h6 className="text-gray-400">welcome back</h6>
            <p>{session?.user?.name}</p>
          </div>
        </Link>
      )}

      <div>
        {status === "loading" ? (
          <button className="flex items-center justify-center text-center relative bg-secondary-color-background hover:bg-black/20 transition-colors p-2 rounded-xl px-4 w-full">
            <div className="w-full h-full grid place-items-center">
              <span className="border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-primary-color"></span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="flex items-center justify-center text-center relative bg-secondary-color-background hover:bg-black/20 transition-colors p-2 rounded-xl px-4 w-full"
          >
            <IconArrowRight className="absolute left-2" />
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
