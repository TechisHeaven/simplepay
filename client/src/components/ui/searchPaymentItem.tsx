import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function SearchPaymentItem() {
  return (
    <div className="item p-2 px-4 flex items-center gap-2 flex-row hover:bg-secondary-color-background rounded-md transition-colors cursor-pointer">
      <Avatar>
        <AvatarImage
          className="rounded-xl"
          width={40}
          height={40}
          src={
            "https://lh3.googleusercontent.com/a/ACg8ocIXH1OzdIK01CcjMDfzvlhE-LPnbaeCUG5RLgnXP0puXt80bqNX=s96-c"
          }
          alt=""
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="text-xs">
        <h6>Himanshu</h6>
        <p className="text-gray-400">3232********9232</p>
      </div>
    </div>
  );
}
