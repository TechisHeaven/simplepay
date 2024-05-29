"use client";
import React, { useState } from "react";
import { BackgroundBeams } from "./background-beams";

export function BankMain() {
  const [name, setName] = useState<string>("");
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
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
        <div className="flex flex-col gap-3 items-start">
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Full Name..."
            name="name"
            id="name"
            autoComplete="off"
            className="rounded-lg border px-4 p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
          />

          <button
            type="submit"
            className={`bg-secondary-color ${
              name.length > 5 && name.length < 24
                ? "opacity-100 cursor-pointer z-10"
                : "opacity-0"
            } p-2 px-4 rounded-sm shadow-sm transition-opacity`}
          >
            Create 🎉
          </button>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
