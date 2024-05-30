import { Inter } from "next/font/google";
import BalanceContainer from "@/components/ui/balanceContainer";
import CardContainer from "@/components/ui/cardContainer";
import LastTransaction from "@/components/ui/lastTransaction";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Page({
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Simple Pay</title>
        <meta property="og:title" content="Simple Pay" key="title" />
      </Head>
      <main className={`${inter.className} p-8 w-full`}>
        <BalanceContainer account={account} />
        <div className="flex flex-row gap-4">
          <CardContainer account={account} />
          <LastTransaction />
        </div>
      </main>
    </>
  );
}

type Repo = {
  name: string;
};

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  const session = await getSession(context);

  const id: string | null = session?.user?.id || null;

  // if (!id) {
  //   return {
  //     redirect: {
  //       destination: "/bank", // Redirect to login page if user is not authenticated
  //       permanent: false,
  //     },
  //   };
  // }
  const res = await fetch(`http://localhost:5000/api/bank/${id}`, {
    method: "GET",
    cache: "no-cache",
    priority: "high",
  });
  const data: Repo = await res.json();
  // Pass data to the page via props
  return { props: { account: data?.result || null } };
}) satisfies GetServerSideProps<{ account: Repo }>;
