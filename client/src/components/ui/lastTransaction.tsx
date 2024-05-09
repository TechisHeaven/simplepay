import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import TransactionItem from "./transactionItem";
import Link from "next/link";

export default function LastTransaction() {
  return (
    <div className=" max-w-[320px] w-full">
      <div className=" text-sm flex items-center flex-row justify-between py-4 my-2">
        <h6>Last transactions</h6>
        <Link
          href="/transaction"
          className="bg-secondary-color-background p-2 rounded-md text-white"
        >
          <IconArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="transactions flex flex-col gap-4">
        <TransactionItem />
        <TransactionItem />
        <TransactionItem />
      </div>
    </div>
  );
}
