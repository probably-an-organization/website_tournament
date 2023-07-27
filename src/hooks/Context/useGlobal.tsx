import { createContext, useContext, useEffect, useState } from "react";
import { NotificationContextProvider } from "./useNotification";
import { ThemeContextProvider } from "./useTheme";
import useAxios from "../useAxios";
import { type Tournament } from "~/components/_development/Tournament/@types";
import { useRouter } from "next/router";
import axios from "axios";
import { handleAxiosError } from "~/utils/axiosUtils";

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
  redirect(path: string, withLoading?: boolean): void;
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
export const useGlobal = () => useContext(GlobalContext);

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

  const redirect = async (path: string, withLoading?: boolean) => {
    if (withLoading) {
      setLoading(true);
    }
    await router.push(path);
    if (withLoading) {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{ loading, redirect, setLoading, setTournament, tournament }}
    >
      <ThemeContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </ThemeContextProvider>
    </GlobalContext.Provider>
  );
}
