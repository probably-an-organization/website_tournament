import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTournamentContext } from "~/components/_development/Tournament/hooks/useTournamentContext";

const PARTICIPANT_PROCEED_COUNT_STEPS = [8, 16, 32, 64];

export default function NewTournamentTypePreselection() {
  const [participantsSlideIndex, setParticipantsSlideIndex] =
    useState<number>(-1);

  const { setNewTournament, newTournament } = useTournamentContext();

  useEffect(() => {
    let newParticipantSlideIndex = 0;
    for (let i = PARTICIPANT_PROCEED_COUNT_STEPS.length - 1; i >= 0; i--) {
      if (
        newTournament.participants.show <= PARTICIPANT_PROCEED_COUNT_STEPS[i]!
      ) {
        newParticipantSlideIndex = Number(i);
      } else {
        break;
      }
    }
    setParticipantsSlideIndex(newParticipantSlideIndex);
  }, []);

  useEffect(() => {
    if (participantsSlideIndex < 0) {
      return;
    }

    setNewTournament((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        min: PARTICIPANT_PROCEED_COUNT_STEPS[participantsSlideIndex]!,
        show: PARTICIPANT_PROCEED_COUNT_STEPS[participantsSlideIndex]!,
      },
    }));
  }, [participantsSlideIndex]);

  return (
    <motion.div // TODO buggy (.find @ index.tsx?)
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="preselection"
    >
      <div>
        Participants proceed:{" "}
        {PARTICIPANT_PROCEED_COUNT_STEPS[participantsSlideIndex]!}
      </div>
      <input
        type="range"
        min={0}
        max={PARTICIPANT_PROCEED_COUNT_STEPS.length - 1}
        value={participantsSlideIndex}
        onInput={(e) =>
          setParticipantsSlideIndex(Number(e.currentTarget.value))
        }
        className="w-full"
        step={1}
      />
      <div className="flex w-full justify-between px-[6px] text-xs">
        {PARTICIPANT_PROCEED_COUNT_STEPS.map((_, i) => (
          <span key={`step-${i}`}>|</span>
        ))}
      </div>
    </motion.div>
  );
}
