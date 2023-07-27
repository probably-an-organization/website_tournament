"use client";

import { useKnockoutTournamentContext } from "../../../../hooks/useKnockoutTournamentContext";
import NationalityBadge from "../../../NationalityBadge";
import { getStageLabel } from "../../../../utils/stageUtils";
import { styled } from "~/utils/stringUtils";
import useFullscreen from "~/hooks/useFullScreen";
import { useEffect, useState } from "react";
import { Participant } from "../../../../@types";

export default function KnockoutMatchInfo() {
  const [matchInfo, setMatchInfo] = useState<{
    p1?: Participant;
    p2?: Participant;
    stageLabel?: string;
  }>();

  const { knockoutMatch, participantsCount, participantsLookup } =
    useKnockoutTournamentContext();

  const isFullscreen = useFullscreen();

  useEffect(() => {
    if (knockoutMatch !== null) {
      setMatchInfo({
        p1: participantsLookup[knockoutMatch.participant_1_id],
        p2: participantsLookup[knockoutMatch.participant_2_id],
        stageLabel: getStageLabel(
          knockoutMatch.stage_number,
          participantsCount
        ),
      });
    }
  }, [knockoutMatch]);

  return (
    <div
      className={
        isFullscreen
          ? "pointer-events-none fixed inset-0 z-[100] bg-neutral-900 p-3"
          : ""
      }
    >
      {knockoutMatch && (
        <div className="relative flex h-full w-full flex-col gap-3">
          <div className="text-center text-3xl font-medium">
            {matchInfo?.stageLabel}
          </div>
          <div className="flex w-full flex-1 items-center gap-3">
            {[matchInfo?.p1, matchInfo?.p2].map((p, i) => (
              <div className="h-full w-1/2" key={`player-${i + 1}`}>
                <div
                  className={styled(
                    "h-full min-w-48 rounded p-3",
                    knockoutMatch.winner === 0
                      ? "bg-neutral-600"
                      : knockoutMatch.winner === i + 1
                      ? "bg-orange-500"
                      : "opacity-50"
                  )}
                >
                  <div className="flex h-full flex-col items-center justify-center">
                    <div className="mx-auto h-16 w-24">
                      <NationalityBadge country={p?.country_id} />
                    </div>
                    <div className="flex flex-col items-center pt-3">
                      <span
                        className={styled(
                          "text-2xl",
                          p?.name ? "font-medium" : "italic"
                        )}
                      >
                        {p?.name ?? "TBD"}
                      </span>
                      <span className="text-lg">{p?.team ?? "-"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {knockoutMatch.information && (
            <div className="mx-auto line-clamp-4 h-32 max-w-xs overflow-hidden text-clip leading-7">
              {knockoutMatch.information}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
