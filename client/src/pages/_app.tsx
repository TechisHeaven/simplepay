import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SessionProviderAuth from "./sessionProvider";
import RootLayout from "./rootlayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProviderAuth {...pageProps}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProviderAuth>
  );
}
