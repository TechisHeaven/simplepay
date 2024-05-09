// import { ClerkProvider } from "@clerk/nextjs";

import { SessionProvider } from "next-auth/react";

export default function SessionProviderAuth({
  children,
  pageProps,
}: {
  children: any;
  pageProps: {
    session: any;
  };
}) {
  return <SessionProvider {...pageProps}>{children}</SessionProvider>;
}
