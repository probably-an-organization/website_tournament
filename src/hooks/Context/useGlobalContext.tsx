import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { NotificationContextProvider } from "./useNotificationContext";
import { ThemeContextProvider } from "./useThemeContext";
import useAxios from "../useAxios";
import { type Tournament } from "~src/types/tournament";
import { useRouter } from "next/router";
import { handleAxiosError } from "~src/utils/axiosUtils";
import Spinner from "~src/components/Spinner";

type RedirectOptions = {
  withLoading?: boolean;
};

type TournamentUser = {
  email: string;
  username: string;
  verified: boolean;
};

type TournamentContext = {
  // authenticating: boolean // basically loading flag
  signedIn?: boolean;
  tournaments: Tournament[];
  user?: TournamentUser;
};

/* CONTEXT */
type GlobalContextProps = {
  loading: boolean;
  redirect(path: string, options?: RedirectOptions): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTournament: React.Dispatch<React.SetStateAction<TournamentContext>>;
  tournament: TournamentContext;
};

const GlobalContext = createContext<GlobalContextProps>({
  loading: false,
  redirect: () => undefined,
  setLoading: () => undefined,
  setTournament: () => undefined,
  tournament: { signedIn: undefined, tournaments: [] },
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
  const [tournament, setTournament] = useState<TournamentContext>({
    // authenticating: true
    signedIn: undefined,
    tournaments: [],
  });

  const { get } = useAxios();
  const router = useRouter();

  useEffect(() => {
    const checkUserAlreadyLoggedIn = async () => {
      const { data, status } = await get<TournamentUser>(
        "/login-verification",
        {
          withCredentials: true,
        },
      );
      setTournament((prev) => ({
        ...prev,
        signedIn: true,
        user: data,
      }));
    };

    checkUserAlreadyLoggedIn().catch((err) =>
      handleAxiosError(err, {
        401: () => setTournament((prev) => ({ ...prev, signedIn: false })),
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
      value={{ loading, redirect, setLoading, setTournament, tournament }}
    >
      <GlobalContextComponent>
        <ThemeContextProvider>
          <NotificationContextProvider>{children}</NotificationContextProvider>
        </ThemeContextProvider>
      </GlobalContextComponent>
    </GlobalContext.Provider>
  );
}

type GlobalContextComponent = {
  children: React.ReactNode;
};

function GlobalContextComponent({ children }: GlobalContextComponent) {
  const { loading } = useGlobalContext();

  return (
    <>
      {children}

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
    </>
  );
}
