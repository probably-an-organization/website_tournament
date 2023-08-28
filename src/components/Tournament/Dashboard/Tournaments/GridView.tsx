import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import formatRelative from "date-fns/formatRelative";
import parseISO from "date-fns/parseISO";
import { TbTournament } from "react-icons/tb";
import { FiFilter, FiInfo, FiUsers } from "react-icons/fi";

import {
  DEFAULT_GRID_FILTER,
  useDashboardContext,
} from "~src/hooks/context/tournament/useDashboardContext";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import { twMerge } from "tailwind-merge";
import { Hover, HoverContent, HoverTrigger } from "~src/components/Hover";
import TournamentsGridViewButton from "./GridViewButton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~src/components/Popover";
import { Button, Card } from "@futshi/js_toolbox";
import DebouncedInput from "~src/components/DebouncedInput";

type TournamentsGridViewProps = {
  className?: string;
};

export default function TournamentsGridView({
  className,
}: TournamentsGridViewProps) {
  const [filterMenu, setFilterMenu] = useState<boolean>(false);

  const { gridFilter, setGridFilter } = useDashboardContext();
  const { tournament } = useGlobalContext();

  const gridFilterTournaments = useMemo(
    () => tournament.tournaments.filter((t) => gridFilter[t.type]?.active),
    [gridFilter, tournament.tournaments],
  );

  const handleGridFilter = async (
    key: string,
    value: { active: boolean; label: string },
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
        0,
      );

      return active < 1 ? DEFAULT_GRID_FILTER : newGridFilter;
    });
  };
  return (
    <div className={className}>
      <Card className="w-full p-3 flex flex-col gap-5 overflow-auto">
        <div className="flex gap-3">
          <DebouncedInput className="flex-1" onChange={() => {}} value="TODO" />
          <Popover open={filterMenu} onOpenChange={setFilterMenu}>
            <PopoverTrigger
              className="flex-shrink-0"
              onClick={() => setFilterMenu((prev) => !prev)}
            >
              <Button>
                <FiFilter />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-3 rounded shadow dark:bg-neutral-900 flex flex-wrap gap-3">
              {Object.entries(gridFilter).map(([key, value], i) => (
                <button
                  key={`tournament-type-${i}`}
                  onClick={() => handleGridFilter(key, value)}
                  className={twMerge(
                    "w-20 rounded p-2 transition-colors",
                    value.active
                      ? "bg-orange-500 hover:bg-orange-400"
                      : "bg-neutral-800 hover:bg-neutral-800",
                  )}
                >
                  {value.label}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        <ul className="grid w-full grid-cols-[repeat(auto-fit,_minmax(10rem,_max-content))] justify-center gap-3">
          <AnimatePresence mode="popLayout">
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              layout
            >
              <TournamentsGridViewButton
                className="flex flex-col items-center justify-center gap-1 border border-neutral-100 font-thin text-neutral-100"
                href="/tournament/new"
              >
                <TbTournament />
                <span>New tournament</span>
              </TournamentsGridViewButton>
            </motion.li>
            {gridFilterTournaments.map((t, i) => (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={`tournament-${i}`}
              >
                <TournamentsGridViewButton
                  className="relative shadow flex flex-col items-center dark:bg-neutral-800 dark:hover:bg-neutral-700"
                  href={`/tournament/knockout/${t._id}`}
                >
                  <span className="font-semibold">{t.name}</span>
                  <span
                    className={twMerge(
                      "flex flex-1 items-center font-thin break-all py-2 text-xs",
                      t.description
                        ? "text-neutral-300"
                        : "italic text-neutral-500",
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
                </TournamentsGridViewButton>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </Card>
    </div>
  );
}
