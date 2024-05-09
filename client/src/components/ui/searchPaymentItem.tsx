import Image from "next/image";
import React from "react";

export default function SearchPaymentItem() {
  return (
    <div className="item p-2 px-4 flex items-center gap-2 flex-row hover:bg-secondary-color-background rounded-md transition-colors cursor-pointer">
      <Image
        className="rounded-xl"
        src={
          "https://lh3.googleusercontent.com/a/ACg8ocIXH1OzdIK01CcjMDfzvlhE-LPnbaeCUG5RLgnXP0puXt80bqNX=s96-c"
        }
        alt=""
        width={40}
        height={40}
      />
      <div className="text-xs">
        <h6>Himanshu</h6>
        <p className="text-gray-400">3232********9232</p>
      </div>
    </div>
  );
}
