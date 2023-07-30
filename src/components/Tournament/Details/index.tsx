import TournamentKnockout from "../Knockout";

type TournamentDetailsProps = {
  type: "knockout" | "group" | "swiss" | "pre";
};

export default function TournamentDetails({ type }: TournamentDetailsProps) {
  return <>{type === "knockout" && <TournamentKnockout />}</>;
}
