import { Metadata } from "next";

import Tournament from "~src/components/Tournament";

export type TournamentPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const id = params.id;

  return {
    title: `Tournament Generator: ${id}`,
    description: "Tournament details",
  };
}

export default function TournamentPage({ params }: TournamentPageProps) {
  return <Tournament id={params.id as string} />;
}
