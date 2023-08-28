import { FiGrid, FiList } from "react-icons/fi";

import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";
import TournamentsTableView from "./TableView";
import TournamentsGridView from "./GridView";

export default function TournamentDashboardTournaments() {
  const { setTournamentsView, tournamentsView } = useDashboardContext();

  return (
    <div className="relative flex-1">
      {/* GRID / TABLE VIEW, TODO SEPARATE COMPONENT */}
      <div className="absolute z-10 right-2 top-2 flex rounded bg-neutral-900 shadow">
        <button
          className="group"
          disabled={tournamentsView === "table"}
          onClick={() => setTournamentsView("table")}
        >
          <FiList className="m-1 group-disabled:stroke-orange-500" />
        </button>
        <button
          className="group"
          disabled={tournamentsView === "grid"}
          onClick={() => setTournamentsView("grid")}
        >
          <FiGrid className="m-1 group-disabled:stroke-orange-500" />
        </button>
      </div>
      {tournamentsView === "grid" && <TournamentsGridView className="p-3" />}
      {tournamentsView === "table" && <TournamentsTableView className="p-3" />}
    </div>
  );
}
