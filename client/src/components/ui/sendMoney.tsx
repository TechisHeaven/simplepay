"use client";

import { IconChevronDown } from "@tabler/icons-react";
import CustomModal from "./customModal";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SendMoney() {
  const [recipient, setRecipient] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add logic to send money
    console.log("Sending money to:", recipient);
    console.log("Amount:", amount);
    // Reset form fields
    setRecipient("");
    setAmount("");
  };

  return (
    <>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <motion.form
          className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Send Money</h2>
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-gray-700">
              Recipient (Mobile or Email)
            </label>
            <input
              type="text"
              id="recipient"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter mobile number or email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Money
          </button>
        </motion.form>
      </CustomModal>
    </>
  );
}
