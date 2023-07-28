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
                "aspect-square rounded disabled:border disabled:border-neutral-800 disabled:bg-inherit disabled:italic disabled:text-neutral-700",
                newTournament.type === tm.value
                  ? "pointer-events-none bg-orange-500 shadow"
                  : "bg-neutral-500",
              )}
              disabled={!tm.active}
              key={`tournament-mode-${i}`}
              onClick={() =>
                setNewTournament((prev) => ({ ...prev, mode: tm.value }))
              }
            >
              {tm.label}
            </button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
