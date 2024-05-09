"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function profile() {
  const { data: session } = useSession();
  return (
    <div className="profile">
      <Link href="/profile">
        <Image
          fetchPriority="high"
          alt="profile-image"
          src={session?.user?.image || ""}
          width={60}
          height={60}
        />
      </Link>
      <div>
        <button
          onClick={() => signOut()}
          className="flex items-center bg-gray-600 p-2 rounded-md px-4 w-full"
        >
          Sign Out
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
