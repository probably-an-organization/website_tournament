import { FiLayout, FiSettings, FiTrello } from "react-icons/fi";

import TournamentDashboardHome from "~src/components/Dashboard/Home";
import TournamentDashboardSettings from "~src/components/Dashboard/Settings";
import TournamentDashboardTournaments from "~src/components/Dashboard/Tournaments";

export enum DashboardSection {
  Home = "DashboardSection.Home",
  Settings = "DashboardSection.Settings",
  Tournaments = "DashboardSection.Tournaments",
}

type DashboardNavigationDetails = {
  label: string;
  icon: React.ReactElement;
  component: React.ReactElement;
};

type DashboardNavigation = {
  [key in DashboardSection]?: DashboardNavigationDetails;
};

export const DASHBOARD_MENU: DashboardNavigation = {
  [DashboardSection.Home]: {
    label: "Home",
    icon: <FiLayout />,
    component: <TournamentDashboardHome />,
  },
  [DashboardSection.Tournaments]: {
    label: "Tournaments",
    icon: <FiTrello />,
    component: <TournamentDashboardTournaments />,
  },
};

export const DASHBOARD_USER_MENU: DashboardNavigation = {
  [DashboardSection.Settings]: {
    label: "Settings",
    icon: <FiSettings />,
    component: <TournamentDashboardSettings />,
  },
};
