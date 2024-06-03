import { UserInterface } from "@/types/types.main";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";

export default function SearchPaymentItem({
  users,
}: {
  users: UserInterface[];
}) {
  return users.map((user) => {
    return (
      user !== null && (
        <Link
          href={`/gateway/${user?.id}`}
          className="item p-2 px-4 flex items-center gap-2 flex-row hover:bg-secondary-color-background rounded-md transition-colors cursor-pointer"
        >
          <Avatar>
            <AvatarImage
              className="rounded-xl"
              width={40}
              height={40}
              src={user?.image || ""}
              alt=""
            />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <h6>{user?.name}</h6>
            <p className="text-gray-400">3232********9232</p>
          </div>
        </Link>
      )
    );
  });
}
