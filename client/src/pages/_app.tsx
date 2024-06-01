import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SessionProviderAuth from "./sessionProvider";
import RootLayout from "./rootlayout";
import { BankProvider } from "./bankSessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <SessionProviderAuth {...pageProps}>
      <QueryClientProvider client={queryClient}>
        <BankProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </BankProvider>
      </QueryClientProvider>
    </SessionProviderAuth>
  );
}
