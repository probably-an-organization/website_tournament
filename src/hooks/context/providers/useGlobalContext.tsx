import { createContext, useContext } from "react";

import { type Tournament } from "~src/types/tournament";

export type RedirectOptions = {
  withLoading?: boolean;
};

export type UserData = {
  email: string;
  username: string;
  verified: boolean;
};

export type UserContext = {
  // authenticating: boolean // basically loading flag
  signedIn?: boolean;
  tournaments: Tournament[];
  data?: UserData;
};

/* CONTEXT */
export type GlobalContextProps = {
  loading: boolean;
  redirect(path: string, options?: RedirectOptions): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserContext>>;
  user: UserContext;
};

export const GlobalContext = createContext<GlobalContextProps>({
  loading: false,
  redirect: () => undefined,
  setLoading: () => undefined,
  setUser: () => undefined,
  user: { signedIn: undefined, tournaments: [] },
});

/* HOOK */
export const useGlobalContext = () => useContext(GlobalContext);
