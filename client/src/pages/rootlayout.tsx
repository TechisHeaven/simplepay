import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { getSession } from "next-auth/react";

export default function rootlayout({ children }: any) {
  return (
    <div>
      <Header />
      <div className="flex flex-row gap-2 relative">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
