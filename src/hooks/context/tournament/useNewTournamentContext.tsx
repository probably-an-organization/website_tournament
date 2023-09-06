"use client";

import React, { createContext, useContext, useState } from "react";

import type { NewTournament } from "~src/types/tournament";
import { PARTICIPANTS_LIMIT } from "~src/constants/tournament/PARTICIPANTS";
import { Country } from "~src/constants/tournament/COUNTRIES";
import { getRandom } from "~src/utils/arrayUtils";
import { NAME_LIST } from "~src/constants/DUMMY_DATA";

/* CONTEXT */
export type NewTournamentContextProps = {
  setNewTournament: React.Dispatch<React.SetStateAction<NewTournament>>;
  newTournament: NewTournament;
};

const NewTournamentContext = createContext<NewTournamentContextProps>(
  {} as NewTournamentContextProps,
);

/* HOOK */
export const useNewTournamentContext = () => useContext(NewTournamentContext);

/* CONTEXT PROVIDER */
export type NewTournamentContextProviderProps = {
  children: React.ReactNode;
};

export const NewTournamentContextProvider = ({
  children,
}: NewTournamentContextProviderProps) => {
  const [newTournament, setNewTournament] = useState<NewTournament>({
    active: false,
    name: "Tournament",
    description: "",
    logo: undefined,
    participants: {
      list: Array.from({ length: PARTICIPANTS_LIMIT }).map((_) => ({
        name: getRandom(NAME_LIST),
        team: (Math.random() + 1).toString(36).substring(7),
        country_id: Country.Austria,
      })),
      max: PARTICIPANTS_LIMIT,
      show: 0,
    },
    type: undefined,
  });

  return (
    <NewTournamentContext.Provider
      value={{
        newTournament,
        setNewTournament,
      }}
    >
      {children}
    </NewTournamentContext.Provider>
  );
};
