import { Metadata } from "next";

import Dashboard from "~src/components/Dashboard";

export const metadata: Metadata = {
  title: "Tournament Generator: Dashboard",
  description: "Dashboard",
};

export default function TournamentDashboardPage() {
  return <Dashboard />;
}
