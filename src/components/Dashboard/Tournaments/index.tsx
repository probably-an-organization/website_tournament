import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";
import { TournamentView } from "~src/constants/tournament/VIEW";

import TournamentsTableView from "./TableView";
import TournamentsGridView from "./GridView";
import TournamentsViewSelector from "./ViewSelector";

export default function TournamentDashboardTournaments() {
  const { tournamentsView } = useDashboardContext();

  return (
    <div className="relative flex-1">
      <TournamentsViewSelector />
      {tournamentsView === TournamentView.Grid && (
        <TournamentsGridView className="p-3" />
      )}
      {tournamentsView === TournamentView.Table && (
        <TournamentsTableView className="p-3" />
      )}
    </div>
  );
}
