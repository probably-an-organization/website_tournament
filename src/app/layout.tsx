import axios from "axios";
import { Metadata } from "next";

import Providers from "./providers";

import "./layout.css";

export const metadata: Metadata = {
  title: "Tournament Generator",
  description: "Tournament Generator",
};

export type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (typeof error.response === "undefined") {
        console.error(
          "A network error occurred. " +
            "This could be a CORS issue or a dropped internet connection. " +
            "It is not possible for us to know.",
        );
      }
      return Promise.reject(error);
    },
  );

  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <head>
        <script src="/theme.js" type="text/javascript" />
      </head>
      <body className="bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
