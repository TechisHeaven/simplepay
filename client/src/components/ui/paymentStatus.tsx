import { formatMoney } from "@/utils/formatNumber";
import { IconFileDownload } from "@tabler/icons-react";
import { Check, Home, Repeat } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

export default function PaymentStatus() {
  const router = useRouter();
  return (
    <div className="p-8 w-full">
      <div className="bg-secondary-color-background p-4 rounded-xl shadow-sm hover:shadow-md max-w-[420px] w-full">
        <div className="header font-semibold">Money Sent</div>
        <div className="flex flex-row justify-between items-center w-full py-4">
          <div className="flex flex-col gap-2 text-gray-400">
            <h1 className="font-semibold text-5xl text-white">
              ₹{formatMoney(18000)}
            </h1>
            <p className="text-xs">Rupees Eight Thousand Seven Hundred Only</p>
            <p className="text-xs">02 Aug 2024</p>
          </div>
          <div className="bg-green-600 p-1 rounded-full items">
            <Check />
          </div>
        </div>
        <hr className="border-0 h-[1px] bg-gray-400" />
        <div className="to py-4">
          <h6 className="text-gray-400 text-xs">To</h6>
          <h4 className="text-lg font-semibold">Mohit kumar</h4>
          <p className="text-sm">A/C No. XXXX XXXX 0043</p>
        </div>
        <hr className="border-0 h-[1px] bg-gray-400" />
        <div className="from py-4">
          <h6 className="text-gray-400 text-xs">To</h6>
          <h4 className="text-lg font-semibold">Himanshu Verma</h4>
          <p className="text-sm">A/C No. XXXX XXXX 0032</p>
        </div>
        <div className="inline-flex gap-2 my-2">
          <button
            onClick={() => router.push("/")}
            className="border-white border p-2 px-4 rounded-sm hover:rounded-md shadow-sm hover:shadow-md flex items-center flex-row gap-2"
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button
            onClick={() => router.push("/payment")}
            className="bg-primary-color p-2 px-4 rounded-sm hover:rounded-md shadow-sm hover:shadow-md flex items-center flex-row gap-2"
          >
            <Repeat className="w-4 h-4" /> Repeat
          </button>
        </div>
      </div>
    </div>
  );
}
