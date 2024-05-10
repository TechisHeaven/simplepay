import Transactions from "@/components/ui/transactions";
import { IconDownload, IconSearch } from "@tabler/icons-react";
import Head from "next/head";

export default function transaction() {
  return (
    <div className="p-8 w-full max-w-[900px]">
      <Head>
        <title>Transaction</title>
        <meta property="og:title" content="Transaction" key="title" />
      </Head>
      <div className="pb-4">
        <h1 className="text-3xl font-semibold">Transactions</h1>
        <p className="text-gray-400 text-sm">
          Monitor every activity of your account.
        </p>
      </div>
      <div className="table w-full">
        <div className="table-header flex items-center flex-row gap-2">
          <div className="flex items-center flex-row gap-2 rounded-md flex-1  w-full p-2 px-4 outline-none  bg-secondary-color-background  focus:border-primary-color hover:border-primary-color border border-gray-500 transition-all">
            <IconSearch className="w-4 h-4" />
            <input
              className="bg-transparent outline-none w-full"
              type="text"
              placeholder="Search by id, name or others..."
            />
          </div>
          <button className="flex items-center gap-2 flex-row bg-secondary-color-background p-2 px-4 rounded-md hover:border-primary-color active:border-primary-color border border-transparent transition-colors">
            <IconDownload className="w-4 h-4" />
            Download
          </button>
        </div>
        <Transactions />
      </div>
    </div>
  );
}
