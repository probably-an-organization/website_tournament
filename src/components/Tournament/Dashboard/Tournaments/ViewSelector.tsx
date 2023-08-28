import { FiGrid, FiList } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";

export default function TournamentsViewSelector() {
  const { setTournamentsView, tournamentsView } = useDashboardContext();

  return (
    <button
      className="absolute p-1 gap-1 z-10 right-2 top-2 flex rounded bg-orange-500 shadow"
      onClick={() =>
        setTournamentsView((prev) => (prev === "table" ? "grid" : "table"))
      }
    >
      <FiList
        className={twMerge(
          "transition-colorsOpacity",
          tournamentsView === "table" ? "" : "opacity-25 stroke-neutral-900",
        )}
      />
      <FiGrid
        className={twMerge(
          "transition-colorsOpacity",
          tournamentsView === "grid" ? "" : "opacity-25 stroke-neutral-900",
        )}
      />
    </button>
  );
}
