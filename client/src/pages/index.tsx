import { Inter } from "next/font/google";
import BalanceContainer from "@/components/ui/balanceContainer";
import CardContainer from "@/components/ui/cardContainer";
import LastTransaction from "@/components/ui/lastTransaction";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return (
    <>
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
