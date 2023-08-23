import { FiChevronRight } from "react-icons/fi";

import { Card } from "@futshi/js_toolbox";

import ActionList from "~src/components/ActionList";
import Calendar from "~src/components/Calendar";

export default function TournamentDashboardHome() {
  return (
    <div className="p-3 flex flex-col gap-3">
      <Card className="overflow-hidden">
        <Calendar />
      </Card>
      <section>
        <p className="text-xl font-semibold pb-2">Latest tournaments</p>
        <ActionList
          items={[
            {
              title: "Tournament 1",
              description: "Intense stuff",
              actionComponent: <FiChevronRight />,
              onClick: () => alert("TODO"),
            },
            {
              title: "Tournament 2",
              description: "Intense stuff",
              actionComponent: <FiChevronRight />,
              onClick: () => alert("TODO"),
            },
            {
              title: "Tournament 3",
              description: "Intense stuff",
              actionComponent: <FiChevronRight />,
              onClick: () => alert("TODO"),
            },
          ]}
        />
      </section>

      <section>
        <p className="text-xl font-semibold pb-2">Latest results</p>
        <ActionList
          items={[
            {
              title: "Tournament 1",
              description: "Match 1: Bob (L) vs. Alice (W)",
              actionComponent: <FiChevronRight />,
              onClick: () => alert("TODO"),
            },
            {
              title: "Tournament 2",
              description: "Match 3: Details changed",
              actionComponent: <FiChevronRight />,
              onClick: () => alert("TODO"),
            },
            {
              title: "Tournament 3",
              description: "Mach 5: Olaf (W) vs. Olaf (L)",
              actionComponent: <FiChevronRight />,
              onClick: () => alert("TODO"),
            },
          ]}
        />
      </section>
    </div>
  );
}
