"use client";

import React, { createContext, useContext, useState } from "react";

import { TournamentTypes } from "~src/constants/tournament/TYPES";

type GridFilter = {
  [key: string]: {
    active: boolean;
    label: string;
  };
};

export const DEFAULT_GRID_FILTER = Object.values(TournamentTypes).reduce(
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
  setTab: React.Dispatch<React.SetStateAction<number>>;
  setView: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  tab: number;
  view: "grid" | "table";
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
  const [tab, setTab] = useState<number>(0);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [gridFilter, setGridFilter] = useState<GridFilter>(DEFAULT_GRID_FILTER);

  return (
    <DashboardContext.Provider
      value={{ gridFilter, setGridFilter, setTab, setView, tab, view }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
