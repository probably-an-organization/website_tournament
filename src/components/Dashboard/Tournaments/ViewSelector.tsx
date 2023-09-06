import { FiGrid, FiList } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { TournamentView } from "~src/constants/tournament/VIEW";

import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";

export default function TournamentsViewSelector() {
  const { setTournamentsView, tournamentsView } = useDashboardContext();

  return (
    <button
      className="absolute p-1 gap-1 z-10 right-2 top-2 flex rounded bg-orange-500 shadow"
      onClick={() =>
        setTournamentsView((prev) =>
          prev === TournamentView.Table
            ? TournamentView.Grid
            : TournamentView.Table,
        )
      }
    >
      <FiList
        className={twMerge(
          "transition-colorsOpacity",
          tournamentsView === TournamentView.Table
            ? ""
            : "opacity-25 stroke-neutral-900",
        )}
      />
      <FiGrid
        className={twMerge(
          "transition-colorsOpacity",
          tournamentsView === TournamentView.Grid
            ? ""
            : "opacity-25 stroke-neutral-900",
        )}
      />
    </button>
  );
}
