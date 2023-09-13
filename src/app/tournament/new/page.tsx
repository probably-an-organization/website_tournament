import { Metadata } from "next";

import TournamentCreate from "~src/components/Tournament/Create";

export const metadata: Metadata = {
  title: "Tournament Generator: Create",
  description: "Create new tournament",
};

export default function TournamentNewPage() {
  return <TournamentCreate />;
}
