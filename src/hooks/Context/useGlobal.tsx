import { createContext, useContext, useEffect, useState } from "react";
import { NotificationContextProvider } from "./useNotification";
import { ThemeContextProvider } from "./useTheme";
import useAxios from "../useAxios";
import { type Tournament } from "~/components/_development/Tournament/@types";

type TournamentUser = {
  email: string;
  username: string;
  verified: boolean;
};

type TournamentContext = {
  // authenticating: boolean // basically loading flag
  signedIn: boolean;
  tournaments: Tournament[];
  user?: TournamentUser;
};

/* CONTEXT */
type GlobalContextProps = {
  tournament: TournamentContext;
  setTournament: React.Dispatch<React.SetStateAction<TournamentContext>>;
};

const GlobalContext = createContext<GlobalContextProps>({
  tournament: { signedIn: false, tournaments: [] },
  setTournament: () => undefined,
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
  const [tournament, setTournament] = useState<TournamentContext>({
    // authenticating: true
    signedIn: false,
    tournaments: [],
  });

  const { get, loading } = useAxios();

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

    checkUserAlreadyLoggedIn().catch((err) => {});
  }, []);

  return (
    <GlobalContext.Provider value={{ tournament, setTournament }}>
      <ThemeContextProvider>
        <NotificationContextProvider>{children}</NotificationContextProvider>
      </ThemeContextProvider>
    </GlobalContext.Provider>
  );
}
