import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import Head from "next/head";
import { useRouter } from "next/router";

export default function rootlayout({ children }: any) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Simple Pay</title>
      </Head>
      {router.pathname.startsWith("/login") ||
      router.pathname.startsWith("/register") ? (
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
