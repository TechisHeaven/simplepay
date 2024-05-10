import { Inter } from "next/font/google";
import BalanceContainer from "@/components/ui/balanceContainer";
import CardContainer from "@/components/ui/cardContainer";
import LastTransaction from "@/components/ui/lastTransaction";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return (
    <>
      <Head>
        <title>Simple Pay</title>
        <meta property="og:title" content="Simple Pay" key="title" />
      </Head>
      <main className={`${inter.className} p-8 w-full`}>
        <BalanceContainer />
        <div className="flex flex-row gap-4">
          <CardContainer />
          <LastTransaction />
        </div>
      </main>
    </>
  );
}
