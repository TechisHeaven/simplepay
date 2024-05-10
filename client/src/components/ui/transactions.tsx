"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { IconFileDownload, IconX } from "@tabler/icons-react";

export default function Transactions() {
  const [overlayExpended, setOverlayExpended] = useState<boolean>(false);
  return (
    <div className="flex flex-row gap-4 p-4">
      <div className="transactions w-full h-full flex  flex-col gap-2 shadow-md border border-gray-600 rounded-md">
        <Transaction setOverlayExpended={setOverlayExpended} type={"paid"} />
        <Transaction
          setOverlayExpended={setOverlayExpended}
          type={"received"}
        />
        {Array.from({ length: 8 }, (v, i) => {
          return (
            <Transaction
              key={i}
              setOverlayExpended={setOverlayExpended}
              type={"paid"}
            />
          );
        })}
      </div>
      {overlayExpended && (
        <div className="w-full h-full">
          <div className="details shadow-md border border-gray-600 rounded-md  bg-secondary-color-background">
            <div className="header bg-primary-color p-4 relative">
              <button
                onClick={() => setOverlayExpended(false)}
                className="absolute right-2 top-2 cursor-pointer"
              >
                <IconX />
              </button>
              <h1 className="text-2xl">
                ₹500.<span className="text-xs">50</span>{" "}
              </h1>
              <div className="flex items-center flex-row gap-2">
                <p className="text-xs">ID: #232323</p>
                <button className="p-2 text-xs underline flex items-center flex-row gap-2">
                  <IconFileDownload />
                  Download Details
                </button>
              </div>
            </div>
            <div className="flex flex-col p-4">
              <div className="from flex items-center gap-4 p-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className={`bg-primary-color`}>
                    CN
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h6 className="text-xs text-primary-color">From</h6>
                  <h4 className="text-sm font-semibold">Aman verma</h4>
                  <h6 className="capitalize text-gray-400 text-xs">
                    sent, july 28 at 4:50pm
                  </h6>
                </div>
              </div>
              <hr className="h-10 w-[1px] ml-6 border-0 bg-gray-600" />
              <div className="to flex items-center gap-4 p-2">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className={`bg-primary-color`}>
                    HV
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h6 className="text-xs text-primary-color">To</h6>
                  <h4 className="text-sm font-semibold">Himanshu verma</h4>
                  <h6 className="capitalize text-gray-400 text-xs">
                    received, july 28 at 4:50pm
                  </h6>
                </div>
              </div>
              <div className="notes py-4">
                <label htmlFor="notes" className="text-gray-400 text-xs">
                  Notes
                </label>
                <div className="container my-2 p-4 text-sm text-gray-200 border border-gray-600 rounded-sm">
                  Hello brop
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const Transaction = ({
  type,
  setOverlayExpended,
}: {
  type: "paid" | "received" | "failed";
  setOverlayExpended: any;
}) => {
  return (
    <div
      onClick={() => setOverlayExpended(true)}
      className={`transaction hover:bg-secondary-color-background transition-colors flex select-none cursor-pointer items-center gap-2 p-2 px-4 ${
        type === "failed" && "text-gray-600"
      }`}
    >
      <h4>03/01/2024</h4>
      <div className="flex-1 flex gap-4 flex-row">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback
            className={` ${
              type === "failed" ? "bg-gray-600" : "bg-primary-color"
            }`}
          >
            CN
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-sm w-full truncate">Noan Henson</h4>
          <p className="text-xs text-gray-500">maintanence</p>
        </div>
        {type === "failed" && (
          <div className="border border-gray-600 rounded-md px-4 p-2 text-xs h-full">
            Failed
          </div>
        )}
      </div>
      {type === "paid" && <h4 className="font-semibold text-white">- ₹500</h4>}
      {type === "received" && (
        <h4 className="font-semibold text-green-600">+ ₹500</h4>
      )}
      {type === "failed" && (
        <h4 className="font-semibold text-gray-600"> ₹500</h4>
      )}
    </div>
  );
};
