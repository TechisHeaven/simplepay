"use client";
import React, { FormEvent, useState } from "react";
import { BackgroundBeams } from "./background-beams";
import BankService from "@/services/bank.services";
import { useSession } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Loader } from "./Loader";
import { useBank } from "@/pages/bankSessionProvider";
export function BankMain() {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();
  const { updateBankState, bankState } = useBank();
  const mutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => {
      return BankService.createBank({
        id: id,
        name: name,
      });
    },
    onSuccess: (data) => {
      if (data.status === 201) {
        updateBankState(data.result);
      }
    },
  });
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullname = formData.get("name") as string;
    if (fullname.length <= 5) {
      return;
    }
    const id = session?.user?.id;
    await mutation.mutate({ id, name: fullname });
  }

  return (
    <div className="h-screen selection:bg-white selection:text-black w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Create Bank Account
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to SimplePay, your trusted banking solution for hassle-free
          transactions and financial management. With SimplePay, you can
          securely handle all your banking needs, from managing accounts to
          making payments and transfers.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 items-start"
        >
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Full Name..."
            name="name"
            id="name"
            autoComplete="off"
            className="rounded-lg  ring-1 ring-gray-200 px-4 p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
          />

          {mutation.isPending ? (
            <div className="px-4 p-2">
              <Loader />
            </div>
          ) : (
            <button
              type="submit"
              className={`bg-secondary-color ${
                name.length > 5 && name.length < 24
                  ? "opacity-100 cursor-pointer z-10 hover:shadow-md hover:rounded-md"
                  : "opacity-0"
              } p-2 px-4 rounded-sm shadow-sm transition-all`}
            >
              Create Now 🎉
            </button>
          )}

          {mutation.isError && (
            <p className="text-red-500 text-xs">{mutation.error?.message}</p>
          )}
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
