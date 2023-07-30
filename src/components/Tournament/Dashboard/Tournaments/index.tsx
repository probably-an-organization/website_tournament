import { FiGrid, FiList } from "react-icons/fi";

import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import TournamentsTableView from "./TableView";
import TournamentsGridView from "./GridView";

export default function TournamentDashboardTournaments() {
  const { setView, view } = useDashboardContext();
  const { tournament } = useGlobalContext();

  return (
    <div className="relative flex-1">
      {/* GRID / TABLE VIEW, TODO SEPARATE COMPONENT */}
      <div className="absolute right-2 top-2 flex rounded bg-neutral-900 shadow">
        <button
          className="group"
          disabled={view === "table"}
          onClick={() => setView("table")}
        >
          <FiList className="m-1 group-disabled:stroke-orange-500" />
        </button>
        <button
          className="group"
          disabled={view === "grid"}
          onClick={() => setView("grid")}
        >
          <FiGrid className="m-1 group-disabled:stroke-orange-500" />
        </button>
      </div>
      {view === "grid" && <TournamentsGridView className="p-3" />}
      {view === "table" && <TournamentsTableView className="p-3" />}
    </div>
  );
}
