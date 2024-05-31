import QrContainer from "@/components/ui/qrContainer";
import HandleSearchInput from "@/components/handleSearchInput/handleSearchInput";

import { getSession } from "next-auth/react";
import Head from "next/head";

export const getServerSideProps = async (context: any) => {
  // Fetch data from external API
  const res = await getSession(context);
  const session = res?.user;
  // Pass data to the page via props
  if (session) {
    return { props: { session } };
  }
  return { props: { session: null } };
};

export default function Page({
  session,
}: {
  session: {
    name: string;
    email: string;
    image: string;
  };
}) {
  return (
    <div className="p-8 w-full flex-row flex gap-4">
      <Head>
        <title>Payment</title>
        <meta property="og:title" content="Payment" key="title" />
      </Head>
      <div className="w-full max-w-[420px] p-4">
        <h1 className="font-semibold text-3xl py-4">Send Money</h1>
        <HandleSearchInput />
      </div>
      <div className="receive w-full p-4 max-w-[420px]">
        <h1 className="text-3xl font-semibold py-4">Receive</h1>
        {session && <QrContainer session={session} />}

        <h1 className="py-2 font-semibold">
          Scan the QR code to instantly receive payments or credit your account.
        </h1>
      </div>
    </div>
  );
}
