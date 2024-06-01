import { useState } from "react";
import SearchPaymentItem from "../ui/SearchPaymentItem";
import UserService from "@/services/user.service";

export default function handleSearchInput() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState("");
  async function onSearch() {
    try {
      const result = await UserService.fetchUser(search);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <label htmlFor="receiver">To</label>
        <input
          type="text"
          onKeyUp={() => onSearch()}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Name, Email, Phone no."
          className="w-full p-2 px-4 outline-none rounded-md bg-secondary-color-background  focus:border-primary-color hover:border-primary-color border border-gray-500 transition-all"
        />
      </div>
      <div className="items p-2 flex-col flex gap-4">
        {userData.length > 0 && <SearchPaymentItem />}
      </div>
    </>
  );
}
