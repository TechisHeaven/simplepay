import { IconDots, IconPlus } from "@tabler/icons-react";

import AccountCard from "./accountCard";

export default function CardContainer() {
  return (
    <div className="w-[320px]">
      <div className=" text-sm flex items-center flex-row justify-between py-4 my-2">
        <h6>My credit cards</h6>
        <button className="bg-secondary-color-background p-2 rounded-md text-white">
          <IconDots className="w-4 h-4" />
        </button>
      </div>
      <div className="cards flex flex-col gap-2">
        <AccountCard />
      </div>
      <button className="outline-dashed gap-2 outline-gray-600 flex items-center rounded-full w-full p-2 px-4 text-center">
        <p className="flex-1">New Card?</p>
        <div className="bg-primary-color hover:bg-primary-color/50 transition-colors p-2 rounded-md">
          <IconPlus className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}
