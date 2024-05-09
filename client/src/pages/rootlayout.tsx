import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function rootlayout({ children }: any) {
  const router = useRouter();

  return (
    <div>
      {router.pathname.startsWith("/login") ||
      router.pathname.startsWith("/register") ? (
        <div className="flex flex-row gap-2 relative">{children}</div>
      ) : (
        <>
          {" "}
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
