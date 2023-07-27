import { useState } from "react";

const PARTICIPANT_COUNT_STEPS = [8, 16, 32, 64];
const GROUP_COUNT_STEPS = [1, 2, 4, 6, 8];

export default function NewTournamentTypeGroup() {
  const [participantCountIndex, setParticipantCountIndex] = useState<number>(0);
  const [groupCountIndex, setGroupCountIndex] = useState<number>(0);

  return (
    <div>
      <div>Participants: {PARTICIPANT_COUNT_STEPS[participantCountIndex]!}</div>
      <input
        type="range"
        min={0}
        max={PARTICIPANT_COUNT_STEPS.length - 1}
        value={participantCountIndex}
        onInput={(e) => setParticipantCountIndex(Number(e.currentTarget.value))}
        className="w-full"
        step={1}
        list="player-range-list"
      />
      <datalist id="player-range-list">
        {PARTICIPANT_COUNT_STEPS.map((_, i) => (
          <option key={`step-${i}`}>{i}</option>
        ))}
      </datalist>

      <div>Groups: {GROUP_COUNT_STEPS[groupCountIndex]!}</div>
      <input
        type="range"
        min={0}
        max={GROUP_COUNT_STEPS.length - 1}
        value={groupCountIndex}
        onInput={(e) => setGroupCountIndex(Number(e.currentTarget.value))}
        className="w-full"
        step={1}
      />
      <div className="flex w-full justify-between px-[6px] text-xs">
        {GROUP_COUNT_STEPS.map((_, i) => (
          <span key={`step-${i}`}>|</span>
        ))}
      </div>
      <div>(automatic) player / group</div>
    </div>
  );
}
