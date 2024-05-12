import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export function SelectScrollable() {
  return (
    <Select defaultValue="HDFCxx0123">
      <SelectTrigger className="w-[280px] h-full border-0 shadow-sm hover:shadow-md focus:ring-primary-color bg-secondary-color-background rounded-xl">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent className="bg-secondary-color-background text-white border-0">
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          <SelectItem value="HDFCxx0123">
            <div className="flex items-center flex-row gap-2">
              <Avatar>
                <AvatarImage
                  className="rounded-xl object-cover object-center bg-white"
                  width={30}
                  height={30}
                  src={"/hdfc.png"}
                  alt="receiver-image"
                />
                <AvatarFallback className="bg-primary-color">
                  HDFC
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-start">
                <h6>HDFC xx0123</h6>
                <button className="text-primar">Check Balance</button>
              </div>
            </div>
          </SelectItem>
          <SelectItem value="sbixx0223">
            <div className="flex items-center flex-row gap-2">
              <Avatar>
                <AvatarImage
                  className="rounded-xl object-cover object-center bg-white"
                  width={30}
                  height={30}
                  src={"/sbi.webp"}
                  alt="receiver-image"
                />
                <AvatarFallback className="bg-primary-color">
                  SBI
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-start">
                <h6>SBI xx0223</h6>
                <button className="text-primar">Check Balance</button>
              </div>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
