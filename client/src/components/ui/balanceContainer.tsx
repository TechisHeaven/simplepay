import {
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconDots,
} from "@tabler/icons-react";
import Link from "next/link";
import SendMoney from "./sendMoney";
import { formatMoney } from "@/utils/formatNumber";
import { BankDataInterface } from "@/types/types.main";
import { useBank } from "@/pages/bankSessionProvider";
import { Loader } from "./Loader";
import { useState } from "react";

export default function balanceContainer({
  account,
}: {
  account: BankDataInterface;
}) {
  const { bankStateLoading } = useBank();

  const {
    balance,
    cards,
    name,
    customer_name,
    account: account_number,
  }: BankDataInterface = account || {};

  //
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // copy to clipboard function
  async function copyToClipboard<T>(text: T) {
    await navigator.clipboard.writeText(text as string);
    setIsCopied(true);
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }

  return (
    <div className="border-white border-4 flex gap-2 rounded-[30px] bg-secondary-color max-w-[650px]">
      <div className="bg-white left-container text-black p-10 rounded-3xl font-semibold flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center justify-between">
          <h6 className="capitalize text-xs">My Balance</h6>
          <button className="bg-secondary-color-light-background p-2 rounded-md text-black">
            <IconDots className="w-4 h-4" />
          </button>
        </div>
        <div>
          {bankStateLoading ? (
            <Loader />
          ) : (
            <h1 className="text-3xl font-bold">
              ₹ {formatMoney(account?.balance)}{" "}
              <span className="text-primary-color text-xs">Rs</span>
            </h1>
          )}
        </div>
        <div className="account-copy border border-primary-color/90 p-1 px-2 rounded-md flex flex-row items-center gap-2">
          <button
            onClick={(e) => {
              copyToClipboard<typeof account_number>(account_number);
            }}
            className="hover:bg-secondary-color-light-background aspect-square p-1 rounded-sm"
          >
            {isCopied ? (
              <IconCheck className="w-4 h-4 text-green-500" />
            ) : (
              <IconCopy className="w-4 h-4" />
            )}
          </button>
          <span className="text-xs text-gray-400  tracking-widest">
            {account_number}
          </span>
        </div>
        <div className="buttons flex flex-row items-center gap-2  text-xs font-medium">
          <Link
            href="/payment"
            className="bg-primary-color rounded-xl text-white px-8 p-3 flex items-center flex-row  gap-2"
          >
            <p className="flex-1">Send</p>
            <span className="bg-white text-primary-color  rounded-full">
              <IconChevronDown className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href={"/transaction"}
            className="bg-black rounded-xl text-white px-8 p-3"
          >
            History
          </Link>
        </div>
      </div>
      <div className="p-10 font-medium text-start">
        <div className="p-4 pl-0">
          <h6 className="text-xs text-white capitalize">
            Income / <span className="text-gray-600">month</span>
          </h6>
          <h4 className="text-lg p-1">₹3323.23</h4>
        </div>
        <hr className="w-full h-[1px] border-0 block bg-gray-600" />
        <div className="p-4 pl-0">
          <h6 className="text-xs text-white capitalize">
            Spedings / <span className="text-gray-600">month</span>
          </h6>
          <h4 className="text-lg p-1">₹1323.93</h4>
        </div>
      </div>
    </div>
  );
}
