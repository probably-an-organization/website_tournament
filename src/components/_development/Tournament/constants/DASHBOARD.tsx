import { FiSettings, FiTrello } from "react-icons/fi";

type DashboardNavigation = {
  label: string;
  icon: React.ReactElement;
};

export const DASHBOARD_NAVIGATION: DashboardNavigation[] = [
  { label: "Tournaments", icon: <FiTrello /> },
  { label: "Settings", icon: <FiSettings /> },
];
