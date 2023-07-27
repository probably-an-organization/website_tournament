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
  const { get, loading } = useAxios();

  useEffect(() => {
    if (!tournament.signedIn) {
      redirect("/");
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
    fetchTournaments().catch((err) => {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 401:
            setTournament((prev) => ({ ...prev, signedIn: false }));
            break;
          case 429:
            alert("TOO MANY REQUESTS TODO");
            break;
          default:
            console.error(err);
            break;
        }
      }
    });
  }, [tournament.signedIn]);

  return (
    <>
      {tournament.signedIn && (
        <>
          <DashboardMenu />

          {tab === 0 && <TournamentDashboardTournaments />}
          {tab === 1 && <TournamentDashboardSettings className="p-3" />}

          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Spinner />
            </div>
          )}
        </>
      )}
    </>
  );
}
