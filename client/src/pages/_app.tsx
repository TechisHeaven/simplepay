import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SessionProviderAuth from "./sessionProvider";
import RootLayout from "./rootlayout";
import { BankProvider } from "./bankSessionProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProviderAuth {...pageProps}>
      <BankProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </BankProvider>
    </SessionProviderAuth>
  );
}
