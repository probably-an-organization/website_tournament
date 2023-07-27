import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html className="scroll-smooth">
      <Head />
      <body className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-200">
        <Main />
        <NextScript />
        <Script src="/theme.js" strategy="beforeInteractive" />
      </body>
    </Html>
  );
}
