import { motion } from "framer-motion";
import { useEffect } from "react";

import Card from "~src/components/Card";
import { TournamentTypes } from "~src/constants/tournament/TYPES";
import { useTournamentContext } from "~src/hooks/context/useTournamentContext";
import { styled } from "~src/utils/stringUtils";

export default function NewTournamentTournamentType() {
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
        <span>Select the type of tournament</span>
        <div className="grid grid-cols-2 gap-3">
          {TournamentTypes.map((tm, i) => (
            <button
              className={styled(
                "h-40 rounded",
                tm.active
                  ? newTournament.type === tm.value
                    ? "bg-orange-500"
                    : "bg-neutral-500"
                  : "pointer-events-none bg-neutral-300 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-700",
              )}
              key={`tournament-mode-${i}`}
              onClick={() => {
                if (!tm.active) {
                  return;
                }
                setNewTournament((prev) => ({ ...prev, mode: tm.value }));
              }}
            >
              {tm.label}
            </button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
