import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@futshi/js_toolbox";

import { type Tournament } from "~src/types/tournament";
import { handleAxiosError } from "~src/utils/axiosUtils";

import useAxios from "../useAxios";
import { NotificationContextProvider } from "./_global/useNotificationContext";
import { ThemeContextProvider } from "./_global/useThemeContext";

type RedirectOptions = {
  withLoading?: boolean;
};

type UserData = {
  email: string;
  username: string;
  verified: boolean;
};

type UserContext = {
  // authenticating: boolean // basically loading flag
  signedIn?: boolean;
  tournaments: Tournament[];
  data?: UserData;
};

/* CONTEXT */
type GlobalContextProps = {
  loading: boolean;
  redirect(path: string, options?: RedirectOptions): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserContext>>;
  user: UserContext;
};

const GlobalContext = createContext<GlobalContextProps>({
  loading: false,
  redirect: () => undefined,
  setLoading: () => undefined,
  setUser: () => undefined,
  user: { signedIn: undefined, tournaments: [] },
});

/* HOOK */
export const useGlobalContext = () => useContext(GlobalContext);

/* CONTEXT PROVIDER */
type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export default function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
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
        user: data,
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
      setLoading(false);
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
