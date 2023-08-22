import { FiLayout, FiSettings, FiTrello } from "react-icons/fi";

import TournamentDashboardHome from "~src/components/Tournament/Dashboard/Home";
import TournamentDashboardSettings from "~src/components/Tournament/Dashboard/Settings";
import TournamentDashboardTournaments from "~src/components/Tournament/Dashboard/Tournaments";

type DashboardNavigation = {
  label: string;
  icon: React.ReactElement;
  component: React.ReactElement;
};

export const DASHBOARD_NAVIGATION: DashboardNavigation[] = [
  { label: "Home", icon: <FiLayout />, component: <TournamentDashboardHome /> },
  {
    label: "Tournaments",
    icon: <FiTrello />,
    component: <TournamentDashboardTournaments />,
  },
  {
    label: "Settings",
    icon: <FiSettings />,
    component: <TournamentDashboardSettings />,
  },
];
