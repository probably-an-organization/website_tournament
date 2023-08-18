"use client";

import { motion } from "framer-motion";
import { Card } from "@futshi/js_toolbox";

import { useTournamentContext } from "~src/hooks/context/tournament/useTournamentContext";
import { TournamentTypes } from "~src/constants/tournament/TYPES";

export default function NewTournamentTournamentSettings() {
  const { newTournament } = useTournamentContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <Card className="p-3">
        {TournamentTypes.find((tm) => newTournament.type === tm.value)!
          .components.tournament || (
          <div>No tournament component found for {newTournament.type}</div>
        )}
      </Card>
    </motion.div>
  );
}
