"use client";

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Spinner from "~/components/Spinner";
import TournamentDashboardSettings from "~/components/_development/Tournament/components/Dashboard/Settings";
import { useGlobal } from "~/hooks/Context/useGlobal";

import useAxios from "~/hooks/useAxios";
import { Tournament } from "../../@types";
import DashboardMenu from "./Menu";
import {
  DashboardContextProvider,
  useDashboardContext,
} from "../../hooks/useDashboardContext";
import TournamentDashboardTournaments from "./Tournaments";
import { handleAxiosError } from "~/utils/axiosUtils";

export default function Dashboard() {
  return (
    <DashboardContextProvider>
      <DashboardComponent />
    </DashboardContextProvider>
  );
}

function DashboardComponent() {
  const { redirect, setTournament, tournament } = useGlobal();
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
