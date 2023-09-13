"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@futshi/js_toolbox";

import useAxios from "~src/hooks/useAxios";
import { NotificationContextProvider } from "~src/hooks/context/providers/useNotificationContext";
import { ThemeContextProvider } from "~src/hooks/context/providers/useThemeContext";
import { handleAxiosError } from "~src/utils/axiosUtils";
import {
  GlobalContext,
  RedirectOptions,
  UserContext,
  UserData,
} from "~src/hooks/context/providers/useGlobalContext";

export type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserContext>({
    // authenticating: true
    signedIn: undefined,
    tournaments: [],
  });

  const { get } = useAxios();
  const router = useRouter();

  useEffect(() => {
    const checkUserAlreadyLoggedIn = async () => {
      const { data, status } = await get<UserData>("/login-verification", {
        withCredentials: true,
      });
      setUser((prev) => ({
        ...prev,
        signedIn: true,
        data: data,
      }));
    };

    checkUserAlreadyLoggedIn().catch((err) =>
      handleAxiosError(err, {
        401: () => setUser((prev) => ({ ...prev, signedIn: false })),
        default: () => console.error(err),
      }),
    );
  }, []);

  const redirect = async (path: string, options: RedirectOptions) => {
    if (options.withLoading) {
      setLoading(true);
    }
    await router.push(path);
    if (options.withLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        loading,
        redirect,
        setLoading,
        setUser,
        user,
      }}
    >
      <ThemeContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </ThemeContextProvider>

      <AnimatePresence>
        {loading && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 text-white"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <Spinner />
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalContext.Provider>
  );
}
