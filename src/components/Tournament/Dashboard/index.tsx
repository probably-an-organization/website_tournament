"use client";

import { useEffect } from "react";

import TournamentDashboardSettings from "~src/components/Tournament/Dashboard/Settings";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import useAxios from "~src/hooks/useAxios";
import { Tournament } from "~src/types/tournament";
import DashboardMenu from "./Menu";
import {
  DashboardContextProvider,
  useDashboardContext,
} from "~src/hooks/context/useDashboardContext";
import TournamentDashboardTournaments from "./Tournaments";
import { handleAxiosError } from "~src/utils/axiosUtils";

export default function Dashboard() {
  return (
    <DashboardContextProvider>
      <DashboardComponent />
    </DashboardContextProvider>
  );
}

function DashboardComponent() {
  const { redirect, setTournament, tournament } = useGlobalContext();
  const { tab } = useDashboardContext();
  const { get } = useAxios();

  useEffect(() => {
    if (!tournament.signedIn) {
      redirect("/", { withLoading: true });
      return;
    }

    const fetchTournaments = async () => {
      const { data } = await get<Tournament[]>("/tournaments-user", {
        withCredentials: true,
      });
      setTournament((prev) => ({
        ...prev,
        tournaments: data as Tournament[],
      }));
    };

    fetchTournaments().catch((err) =>
      handleAxiosError(err, {
        401: () => setTournament((prev) => ({ ...prev, signedIn: false })),
        429: () => alert("TOO MANY REQUESTS TODO"),
      }),
    );
  }, [tournament.signedIn]);

  return (
    <>
      {tournament.signedIn && (
        <>
          <DashboardMenu />

          {tab === 0 && <TournamentDashboardTournaments />}
          {tab === 1 && <TournamentDashboardSettings className="p-3" />}
        </>
      )}
    </>
  );
}
