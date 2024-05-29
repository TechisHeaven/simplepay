import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useBank } from "./bankSessionProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

export default function rootlayout({ children }: any) {
  const router = useRouter();
  const { bankState } = useBank();
  useEffect(() => {
    const checkAuthentication = async () => {
      if (!bankState && !router.pathname.startsWith("/bank")) {
        router.push("/bank"); // Redirect to bank page if not account not there
      }
    };

    checkAuthentication();
  }, [router]);
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
        <>
          <Header />
          <div className="flex flex-row gap-2 relative">
            <Sidebar />
            {children}
          </div>
        </>
      )}
    </div>
  );
}
