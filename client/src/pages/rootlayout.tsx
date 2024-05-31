import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useBank } from "./bankSessionProvider";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import BankService from "@/services/bank.services";

export default function rootlayout({ children }: any) {
  const router = useRouter();
  const {
    bankState,
    updateBankState,
    bankStateLoading,
    updateBankStateLoading,
  } = useBank();
  const { data: session } = useSession();

  const auth = session?.user;
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!bankState && !router.pathname.startsWith("/bank")) {
        router.push("/bank");
      }
      if (auth) {
        if (
          !bankState &&
          !bankStateLoading &&
          !router.pathname.startsWith("/bank")
        ) {
          return router.push("/bank"); // Redirect to bank page if not account not there
        } else if (bankState && router.pathname.startsWith("/bank")) {
          return router.push("/"); // Redirect to index page
        }
      }

      //fetching bank
      if (auth && !bankState) {
        try {
          updateBankStateLoading(true);
          const result = await BankService.fetchBank(auth.id);
          if (!result) {
            console.log("error", result);
          }
          if (result.status === 200) {
            updateBankState(result.result);
            updateBankStateLoading(false);
          }
          updateBankStateLoading(false);
        } catch (error) {
          console.log(error);
          updateBankStateLoading(false);
        }
      }
    };

    checkAuthentication();
  }, [router, auth, bankState]);
  return (
    <div>
      <Head>
        <title>Simple Pay</title>
      </Head>
      {router.pathname.startsWith("/login") ||
      router.pathname.startsWith("/register") ||
      router.pathname.startsWith("/bank") ? (
        <div className="flex flex-row gap-2 relative">{children}</div>
      ) : (
        <div>
          <Header />
          <div className="flex flex-row gap-2 relative">
            <Sidebar />
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
