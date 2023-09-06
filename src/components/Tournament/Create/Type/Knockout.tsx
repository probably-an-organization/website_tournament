import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNewTournamentContext } from "~src/hooks/context/tournament/useNewTournamentContext";
import InputSlider from "~src/components/InputSlider";

const PARTICIPANT_COUNT_STEPS = [8, 16, 32, 64];

export default function NewTournamentTypeKnockout() {
  const [participantsSlideIndex, setParticipantsSlideIndex] =
    useState<number>(-1);

  const { setNewTournament, newTournament } = useNewTournamentContext();

  useEffect(() => {
    let newParticipantSlideIndex = 0;
    for (let i = PARTICIPANT_COUNT_STEPS.length - 1; i >= 0; i--) {
      if (newTournament.participants.show <= PARTICIPANT_COUNT_STEPS[i]!) {
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
        min: undefined,
        show: PARTICIPANT_COUNT_STEPS[participantsSlideIndex]!,
      },
    }));
  }, [participantsSlideIndex]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      key="knockout"
    >
      <div>
        Participants: {PARTICIPANT_COUNT_STEPS[participantsSlideIndex]!}
      </div>
      <InputSlider
        steps={PARTICIPANT_COUNT_STEPS}
        value={participantsSlideIndex}
        onChange={(e) => setParticipantsSlideIndex(Number(e.target.value))}
      />
    </motion.div>
  );
}
