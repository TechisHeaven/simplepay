// pages/profile.js

import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

const Profile = ({ session }: { session: Session }) => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>My Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
        <div className="bg-secondary-color-background p-6 rounded-lg shadow">
          <img
            src={session?.image}
            alt="Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{session?.name}</h2>
          <p className="text-gray-400">Software Engineer</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;

type Session = {
  name: string;
  email: string;
  image: string;
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // Pass data to the page via props
  return { props: { session: session?.user } };
}
