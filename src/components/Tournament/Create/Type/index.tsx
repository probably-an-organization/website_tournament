import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Card } from "@futshi/js_toolbox";
import {
  TournamentType,
  TournamentTypes,
} from "~src/constants/tournament/TYPES";
import { useTournamentContext } from "~src/hooks/context/tournament/useTournamentContext";
import { twMerge } from "tailwind-merge";
import { FiInfo } from "react-icons/fi";
export default function NewTournamentTournamentType() {
  const [helpModal, setHelpModal] = useState<TournamentType | null>(null);
  const { newTournament, setNewTournament } = useTournamentContext();

  useEffect(() => {
    setNewTournament((prev) => ({
      ...prev,
      type: TournamentTypes.find((t) => t.active)!.value,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <Card className="flex flex-col gap-3 p-3">
        <span>Select the tournament type</span>
        <div className="flex flex-col gap-3">
          {TournamentTypes.map((tm, i) => (
            <div className="flex gap-3 items-center">
              <button
                className={twMerge(
                  "h-12 p-3 w-full rounded border disabled:border-neutral-800 disabled:bg-inherit disabled:text-neutral-700 disabled:bg-neutral-800",
                  newTournament.type === tm.value
                    ? "border-transparent bg-orange-500 shadow"
                    : "bg-neutral-500 font-thin",
                )}
                disabled={!tm.active}
                key={`tournament-mode-${i}`}
                onClick={() =>
                  setNewTournament((prev) => ({ ...prev, mode: tm.value }))
                }
              >
                {tm.label}
              </button>
              <button
                className="p-1 hover:scale-125 transition-transform"
                onClick={() => setHelpModal(tm.value)}
              >
                <FiInfo size={20} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
