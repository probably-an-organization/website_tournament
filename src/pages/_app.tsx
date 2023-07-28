import { AppProps, type AppType } from "next/app";
import { appWithTranslation } from "next-i18next";
import nextI18nextConfig from "next-i18next.config";
import axios from "axios";

// import Sidebar from "~src/components/Sidebar";
import GlobalContextProvider from "~src/hooks/context/useGlobalContext";

import "~src/styles/globals.css";

type PageProps = {};

const App: AppType = ({ Component, pageProps }: AppProps<PageProps>) => {
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
    <GlobalContextProvider>
      <Component {...pageProps} />
      {/* <Sidebar /> */}
    </GlobalContextProvider>
  );
};

export default appWithTranslation(App, nextI18nextConfig);
