import {
  IconCreditCard,
  IconHelp,
  IconHome,
  IconTransactionRupee,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileSidebar from "./profileSidebar";

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="flex flex-col justify-between p-4 max-w-60 w-full border-r-[1px] border-gray-600 h-[calc(102.50dvh-120px)] sticky top-0">
      <div>
        <Link className={"flex items-center flex-row p-4 gap-4"} href="/">
          <div
            className={
              router.pathname == "/"
                ? "active bg-primary-color rounded-md p-2"
                : "rounded-sm p-2 transition-all"
            }
          >
            <IconHome />
          </div>
          Dashboard
        </Link>
        <Link
          className={"flex items-center flex-row p-4 gap-4"}
          href="/payment"
        >
          <div
            className={
              router.pathname.startsWith("/payment") ||
              router.pathname.startsWith("/gateway")
                ? "active bg-primary-color rounded-md p-2"
                : "rounded-sm p-2 transition-all"
            }
          >
            <IconCreditCard />
          </div>
          Payment
        </Link>
        <Link
          href="/transaction"
          className="flex items-center flex-row p-4 gap-4"
        >
          <div
            className={
              router.pathname == "/transaction"
                ? "active bg-primary-color rounded-md p-2"
                : "rounded-sm p-2 transition-all"
            }
          >
            <IconTransactionRupee />
          </div>
          Transaction
        </Link>
        <Link href="/help" className="flex items-center flex-row p-4 gap-4">
          <div
            className={
              router.pathname == "/help"
                ? "active bg-indigo-500 rounded-md p-2"
                : "rounded-sm p-2 transition-all"
            }
          >
            <IconHelp />
          </div>
          help
        </Link>
      </div>
      <div className="pb-10">
        <ProfileSidebar />
      </div>
    </aside>
  );
}
