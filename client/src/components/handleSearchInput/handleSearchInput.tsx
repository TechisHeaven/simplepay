import { useState } from "react";
import SearchPaymentItem from "../ui/SearchPaymentItem";
import UserService from "@/services/user.service";
import { useSession } from "next-auth/react";
import { UserInterface } from "@/types/types.main";

export default function handleSearchInput() {
  const [userData, setUserData] = useState<UserInterface[]>([]);
  const { data: session } = useSession();

  async function onSearch(value: string) {
    try {
      if (value.length <= 0) {
        return setUserData([]);
      }
      const params = {
        id: session?.user?.id,
        search: value,
      };
      const result = await UserService.fetchUser(params);

      if (result) {
        setUserData(result.result!);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 w-full">
        <label htmlFor="receiver">To</label>
        <input
          type="text"
          onKeyUp={(e: any) => onSearch(e.target.value)}
          placeholder="Name, Email, Phone no."
          className="w-full p-2 px-4 outline-none rounded-md bg-secondary-color-background  focus:border-primary-color hover:border-primary-color border border-gray-500 transition-all"
        />
      </div>
      <div className="items p-2 flex-col flex gap-4">
        {userData.length > 0 && <SearchPaymentItem users={userData} />}
      </div>
    </>
  );
}
