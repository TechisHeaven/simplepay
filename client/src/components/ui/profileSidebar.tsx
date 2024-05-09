"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function profile() {
  const { data: session } = useSession();
  return (
    <div className="profile flex flex-col gap-4">
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
      <div>
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center text-center relative bg-secondary-color-background hover:bg-black/20 transition-colors p-2 rounded-xl px-4 w-full"
        >
          <IconArrowRight className="absolute left-2" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
