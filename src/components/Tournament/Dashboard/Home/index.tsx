import { FiChevronRight } from "react-icons/fi";

import { Card } from "@futshi/js_toolbox";

import ActionList from "~src/components/ActionList";

export default function TournamentDashboardHome() {
  return (
    <div className="m-3 flex flex-col gap-3">
      <section>
        <span>Calendar</span>
        <Card>TODO</Card>
      </section>
      <section>
        <span>Latest tournaments</span>
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
        <span>Latest results</span>
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
