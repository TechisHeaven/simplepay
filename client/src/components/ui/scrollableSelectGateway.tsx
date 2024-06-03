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
import { CardInterface } from "@/types/types.main";
import { Dispatch, useEffect } from "react";

export function SelectScrollable({
  cards,
  setSelected,
}: {
  cards: CardInterface[];
  setSelected: any;
}) {
  useEffect(() => {
    setSelected(cards[0].id.toString());
  }, []);

  return cards ? (
    <Select
      onValueChange={(value) => setSelected(value)}
      defaultValue={cards[0].id.toString()}
    >
      <SelectTrigger className="w-[280px] h-full border-0 shadow-sm hover:shadow-md focus:ring-primary-color bg-secondary-color-background rounded-xl">
        <SelectValue placeholder="Select Card" />
      </SelectTrigger>
      <SelectContent className="bg-secondary-color-background text-white border-0">
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          {cards?.map((card) => {
            return (
              <SelectItem value={card?.id.toString()}>
                <div className="flex items-center flex-row gap-2">
                  <Avatar>
                    <AvatarImage
                      className="rounded-xl object-cover object-center bg-white"
                      width={30}
                      height={30}
                      alt="receiver-image"
                    />
                    <AvatarFallback className="bg-primary-color">
                      {card?.bankName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-start">
                    <h6>
                      {card?.bankName}-{" "}
                      {card?.cardNumber.toString().slice(0, 6)}
                    </h6>
                    <button className="text-primar">Check Balance</button>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <div className="px-4 p-2 text-sm">Card Not Exists - Not Allowed</div>
  );
}
