import { Card } from "@futshi/js_toolbox";

export default function TournamentDashboardHome() {
  return (
    <div className="m-3 flex flex-col gap-3">
      <Card className="h-80">upcoming tournament</Card>
      <Card className="h-80">latest results</Card>
      <Card className="h-80">calendar</Card>
    </div>
  );
}
