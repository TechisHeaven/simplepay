import { IconDots, IconPlus } from "@tabler/icons-react";

import AccountCard from "./accountCard";
import { BankDataInterface, CardInterface } from "@/types/types.main";
import CustomModal from "./customModal";
import { FormEvent, useState } from "react";
import { Input } from "./input";
import { useBank } from "@/pages/bankSessionProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BankService from "@/services/bank.services";
import { useSession } from "next-auth/react";

export default function CardContainer() {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { bankState } = useBank();
  // const { cards } = account;
  // console.log(account);
  const cards = bankState?.cards;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => {
      return BankService.createCard({
        id: id,
        name: name,
      });
    },
    onSuccess: async (data: any) => {
      if (data.status === 201) {
        await queryClient.refetchQueries({
          queryKey: ["bank"],
        });
        bankState?.cards.push(data.result);
        setIsOpen(false);
      }
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
    },
  });
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullname = formData.get("name") as string;
    if (fullname?.length <= 5) {
      return;
    }
    const id = session?.user?.id;
    await mutation.mutate({ id, name: fullname });
  }
  return (
    <>
      <div className="w-[320px]">
        <div className=" text-sm flex items-center flex-row justify-between py-4 my-2">
          <h6>My credit cards</h6>
          <button className="bg-secondary-color-background p-2 rounded-md text-white">
            <IconDots className="w-4 h-4" />
          </button>
        </div>
        <div className="cards flex flex-col gap-2">
          {cards?.map((card, index) => {
            return <AccountCard card={card} />;
          })}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="outline-dashed hover:outline-primary-color transition-all mt-4 gap-2 outline-gray-600 flex items-center rounded-full w-full p-2 px-4 text-center"
        >
          <p className="flex-1">New Card?</p>
          <div className="bg-primary-color hover:bg-primary-color/50 transition-colors p-2 rounded-md">
            <IconPlus className="w-4 h-4" />
          </div>
        </button>
      </div>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <form
          onSubmit={handleSubmit}
          className="text-white w-full flex flex-col gap-4 max-w-[500px] bg-secondary-color p-4 shadow-xl rounded-2xl"
        >
          <h1 className="text-2xl">Create Card</h1>
          <Input
            className="bg-secondary-color text-white"
            placeholder="Enter your Name"
            name="name"
          />
          <button className="bg-primary-color p-2 px-4 rounded-md">
            Create Card
          </button>
        </form>
      </CustomModal>
    </>
  );
}
