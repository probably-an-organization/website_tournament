"use client";

import React, { createContext, useContext, useState } from "react";
import { DashboardSection } from "~src/constants/tournament/DASHBOARD";

import { TournamentTypes } from "~src/constants/tournament/TYPES";
import { TournamentView } from "~src/constants/tournament/VIEW";

type GridFilter = {
  string: string;
  types: {
    [key: string]: {
      active: boolean;
      label: string;
    };
  };
};

export const GRID_TYPE_FILTER = Object.values(TournamentTypes).reduce(
  (acc, curr) => ({
    ...acc,
    [curr.databaseType]: {
      active: true,
      label: curr.shortLabel,
    },
  }),
  {},
);

/* CONTEXT */
type DashboardContextProps = {
  gridFilter: GridFilter;
  setGridFilter: React.Dispatch<React.SetStateAction<GridFilter>>;
  section: DashboardSection;
  setSection: React.Dispatch<React.SetStateAction<DashboardSection>>;
  setTournamentsView: React.Dispatch<React.SetStateAction<TournamentView>>;
  tournamentsView: TournamentView;
};

const DashboardContext = createContext<DashboardContextProps>(
  {} as DashboardContextProps,
);

/* HOOK */
export const useDashboardContext = () => useContext(DashboardContext);

export type DashboardContextProviderProps = {
  children: React.ReactNode;
};

/* CONTEXT PROVIDER */
export const DashboardContextProvider = ({
  children,
}: DashboardContextProviderProps) => {
  const [section, setSection] = useState<DashboardSection>(
    DashboardSection.Home,
  );
  const [tournamentsView, setTournamentsView] = useState<TournamentView>(
    TournamentView.Grid,
  );
  const [gridFilter, setGridFilter] = useState<GridFilter>({
    string: "",
    types: GRID_TYPE_FILTER,
  });

  return (
    <DashboardContext.Provider
      value={{
        gridFilter,
        setGridFilter,
        section,
        setSection,
        setTournamentsView,
        tournamentsView,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
