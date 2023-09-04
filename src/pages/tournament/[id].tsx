import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import TournamentDetails from "~src/components/Tournament/Details";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import {
  KnockoutTournamentContextProvider,
  useKnockoutTournamentContext,
} from "~src/hooks/context/tournament/useKnockoutTournamentContext";
import { handleAxiosError } from "~src/utils/axiosUtils";
import Tournament from "~src/components/Tournament";

export default function KnockoutPage() {
  return (
    <KnockoutTournamentContextProvider>
      <KnockoutComponent />
    </KnockoutTournamentContextProvider>
  );
}

function KnockoutComponent() {
  const router = useRouter();
  const { redirect } = useGlobalContext();
  const { fetchKnockout, knockoutTournament, knockoutEditPermission } =
    useKnockoutTournamentContext();

  useEffect(() => {
    if (router.query.id) {
      fetchKnockout(Number(router.query.id)).catch((err) =>
        handleAxiosError(err, {
          default: () => redirect("/tournament", { withLoading: true }),
        }),
      );
    }
  }, [router.query.id]);

  return (
    <>
      <Head>{/* TODO */}</Head>
      {knockoutTournament && (
        <>
          {knockoutEditPermission ? (
            <Tournament />
          ) : (
            <div className="p-3">
              <TournamentDetails />
            </div>
          )}
        </>
      )}
    </>
  );
}
