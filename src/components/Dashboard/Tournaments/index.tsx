import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";

import TournamentsTableView from "./TableView";
import TournamentsGridView from "./GridView";
import TournamentsViewSelector from "./ViewSelector";

export default function TournamentDashboardTournaments() {
  const { tournamentsView } = useDashboardContext();

  return (
    <div className="relative flex-1">
      <TournamentsViewSelector />
      {tournamentsView === "grid" && <TournamentsGridView className="p-3" />}
      {tournamentsView === "table" && <TournamentsTableView className="p-3" />}
    </div>
  );
}
