"use client";

import { useEffect } from "react";

import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import useAxios from "~src/hooks/useAxios";
import { Tournament } from "~src/types/tournament";
import DashboardMenu from "./Menu";
import {
  DashboardContextProvider,
  useDashboardContext,
} from "~src/hooks/context/tournament/useDashboardContext";
import { handleAxiosError } from "~src/utils/axiosUtils";
import {
  DASHBOARD_MENU,
  DASHBOARD_USER_MENU,
} from "~src/constants/tournament/DASHBOARD";

export default function Dashboard() {
  return (
    <DashboardContextProvider>
      <DashboardComponent />
    </DashboardContextProvider>
  );
}

function DashboardComponent() {
  const { redirect, setTournament, tournament } = useGlobalContext();
  const { section } = useDashboardContext();
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
          <div className="flex justify-center">
            <div className="max-w-5xl w-full">
              {
                { ...DASHBOARD_MENU, ...DASHBOARD_USER_MENU }[section]!
                  .component
              }
            </div>
          </div>
        </>
      )}
    </>
  );
}
