import { Inter } from "next/font/google";
import BalanceContainer from "@/components/ui/balanceContainer";
import CardContainer from "@/components/ui/cardContainer";
import LastTransaction from "@/components/ui/lastTransaction";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useBank } from "./bankSessionProvider";
import { Loader } from "@/components/ui/Loader";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Page({
  account,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = account.queries[0]?.state.data?.result;
  const { bankStateLoading } = useBank();
  return bankStateLoading ? (
    <div className="w-full">
      <Loader center />
    </div>
  ) : (
    <>
      <Head>
        <title>Simple Pay</title>
        <meta property="og:title" content="Simple Pay" key="title" />
      </Head>
      <main className={`${inter.className} p-8 w-full`}>
        <BalanceContainer account={data} />
        <div className="flex flex-row gap-4">
          <CardContainer />
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

  if (!id) {
    return {
      redirect: {
        destination: "/bank", // Redirect to login page if user is not authenticated
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["bank"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/bank/${id}`, {
        method: "GET",
        cache: "no-cache",
        priority: "high",
      });
      const result = await res.json();
      return result;
    },
  });

  // Pass data to the page via props
  return { props: { account: dehydrate(queryClient) || {} } };
}) satisfies GetServerSideProps<{ account: Repo }>;
