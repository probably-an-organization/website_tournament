import { useMemo } from "react";
import {
  DEFAULT_GRID_FILTER,
  useDashboardContext,
} from "../../../hooks/useDashboardContext";
import { useGlobal } from "~/hooks/Context/useGlobal";
import { FiGrid, FiInfo, FiList, FiUsers } from "react-icons/fi";
import Card from "~/components/Card";
import { styled } from "~/utils/stringUtils";
import { AnimatePresence, motion } from "framer-motion";
import DashboardTournamentButton from "./TournamentButton";
import { TbTournament } from "react-icons/tb";
import { Hover, HoverContent, HoverTrigger } from "~/components/Hover";
import formatRelative from "date-fns/formatRelative";
import parseISO from "date-fns/parseISO";
import TournamentTable from "./TournamentTable";

export default function TournamentDashboardTournaments() {
  const { gridFilter, setGridFilter, setView, view } = useDashboardContext();
  const { tournament } = useGlobal();

  const gridFilterTournaments = useMemo(
    () => tournament.tournaments.filter((t) => gridFilter[t.type]?.active),
    [gridFilter, tournament.tournaments]
  );

  const handleGridFilter = async (
    key: string,
    value: { active: boolean; label: string }
  ) => {
    setGridFilter((prev) => {
      const newGridFilter = {
        ...prev,
        [key]: {
          ...value,
          active: !value.active,
        },
      };

      const active = Object.entries(newGridFilter).reduce(
        (acc, [_, value]) => acc + (value.active ? 1 : 0),
        0
      );

      return active < 1 ? DEFAULT_GRID_FILTER : newGridFilter;
    });
  };

  return (
    <div className="relative flex-1">
      {/* GRID / TABLE VIEW, TODO SEPARATE COMPONENT */}
      <div className="absolute right-2 top-2 flex rounded bg-neutral-900 shadow">
        <button
          className="group"
          disabled={view === "table"}
          onClick={() => setView("table")}
        >
          <FiList className="m-1 group-disabled:stroke-orange-500" />
        </button>
        <button
          className="group"
          disabled={view === "grid"}
          onClick={() => setView("grid")}
        >
          <FiGrid className="m-1 group-disabled:stroke-orange-500" />
        </button>
      </div>

      {view === "grid" /* grid view */ && (
        <div className="flex flex-col items-center pt-3">
          <Card className="flex flex-wrap gap-3 rounded bg-neutral-700 p-3">
            {Object.entries(gridFilter).map(([key, value], i) => (
              <button
                key={`tournament-type-${i}`}
                onClick={() => handleGridFilter(key, value)}
                className={styled(
                  "w-20 rounded p-2 transition-colors",
                  value.active ? "bg-orange-500" : "bg-neutral-700"
                )}
              >
                {value.label}
              </button>
            ))}
          </Card>

          <ul className="grid w-full grid-cols-[repeat(auto-fit,_minmax(10rem,_max-content))] justify-center gap-3 p-3">
            <AnimatePresence mode="popLayout">
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <DashboardTournamentButton
                  className="flex flex-col items-center justify-center gap-1 border border-neutral-100 font-semibold text-neutral-100 hover:bg-neutral-900"
                  href="/tournament/new"
                >
                  <TbTournament />
                  New tournament
                </DashboardTournamentButton>
              </motion.li>
              {gridFilterTournaments.map((t, i) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={`tournament-${i}`}
                >
                  <DashboardTournamentButton
                    className="relative flex flex-col items-center bg-neutral-900 hover:bg-neutral-800"
                    href={`/tournament/knockout/${t._id}`}
                  >
                    <span className="font-semibold">{t.name}</span>
                    <span
                      className={styled(
                        "flex flex-1 items-center break-all py-2 text-xs",
                        t.description
                          ? "text-neutral-400"
                          : "italic text-neutral-600"
                      )}
                    >
                      {t.description || "No description"}
                    </span>
                    <div className="flex w-full items-end justify-between">
                      <div className="flex flex-1 flex-wrap items-center gap-1 text-xs">
                        {/* tournament type */}
                        <div className="rounded bg-neutral-200 px-1 py-0.5 text-neutral-900">
                          {t.type}
                        </div>
                        {/* participants count */}
                        <div className="flex items-center gap-1 rounded bg-neutral-200 px-1 py-0.5 text-neutral-900">
                          <FiUsers />
                          <span>{t.participants}</span>
                        </div>
                      </div>
                      <Hover>
                        <HoverTrigger>
                          <FiInfo />
                        </HoverTrigger>
                        <HoverContent className="rounded bg-black bg-opacity-75 p-3 text-xs backdrop-blur">
                          <div>
                            created:{" "}
                            {formatRelative(parseISO(t.created), Date.now())}
                          </div>
                          <div>
                            updated:{" "}
                            {formatRelative(parseISO(t.updated), Date.now())}
                          </div>
                        </HoverContent>
                      </Hover>
                    </div>
                  </DashboardTournamentButton>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}

      {view === "table" && /* table view */ <TournamentTable className="p-3" />}
    </div>
  );
}
