import { useEffect, useState } from "react";

import type {
  NewKnockoutMatch,
  NewParticipant,
} from "~/components/_development/Tournament/@types";
import { useTournamentContext } from "~/components/_development/Tournament/hooks/useTournamentContext";
import { styled } from "~/utils/stringUtils";
import KnockoutTournamentMatch from "./Match";
import Card from "~/components/Card";
import { FiCheck } from "react-icons/fi";
import useAxios from "~/hooks/useAxios";
import {
  NotificationType,
  useNotification,
} from "~/hooks/Context/useNotification";
import type { AxiosError } from "axios";
import { handleAxiosError } from "~/utils/axiosUtils";
import { useGlobal } from "~/hooks/Context/useGlobal";

export const BRANCH_WIDTH = "w-52";

export default function KnockoutTournament() {
  const [lineups, setLineups] = useState<[number | null, number | null][][]>([
    [],
  ]);
  const { newTournament } = useTournamentContext();

  const { post } = useAxios();
  const notification = useNotification();
  const { redirect } = useGlobal();

  useEffect(() => {
    const participants = newTournament.participants.list.slice(
      0,
      newTournament.participants.show,
    );
    let stageMatchCount = Math.ceil(participants.length / 2);
    const newLineups = [];
    newLineups.push(
      Array.from({ length: stageMatchCount }, (_, i) => [i * 2, i * 2 + 1]),
    );
    while (stageMatchCount !== 1) {
      stageMatchCount /= 2;
      newLineups.push(
        Array.from({ length: stageMatchCount }, (_, i) => [null, null]),
      );
    }
    setLineups(newLineups as [number | null, number | null][][]);
  }, []);

  const getLineupMatch = (
    lineup: [number | null, number | null],
  ): NewKnockoutMatch => {
    const p1: NewParticipant | null =
      lineup[0] === null ? null : newTournament.participants.list[lineup[0]]!;
    const p2: NewParticipant | null =
      lineup[1] === null ? null : newTournament.participants.list[lineup[1]]!;
    return {
      participants: [p1, p2],
    };
  };

  const handleSubmitTournament = async () => {
    try {
      await post(
        "/knockout-create",
        {
          ...newTournament,
          participants: newTournament.participants.list.slice(
            0,
            newTournament.participants.show,
          ),
          lineups: lineups[0],
        },
        { withCredentials: true },
      );
      notification({
        title: "ASDF",
        description: "OLAF",
        type: NotificationType.Success,
      });
      redirect("/dashboard", { withLoading: true });
    } catch (err) {
      handleAxiosError(err, {
        default: () =>
          notification({
            title: "Error",
            description: (err as AxiosError).message,
            type: NotificationType.Error,
          }),
      });
    }
  };

  return (
    <div className="mx-auto flex h-full w-fit">
      <Card className="h-fit w-fit p-3">
        <div className="sticky top-3 z-10 flex flex-row justify-between rounded">
          {Array.from({ length: lineups.length }).map((_, i) => {
            const participantCount = lineups[i]!.length * 2;
            let label = "???";
            switch (participantCount) {
              case 8:
                label = "Quarterfinal";
                break;
              case 4:
                label = "Semifinal";
                break;
              case 2:
                label = "Final";
                break;
              default:
                label = `Top ${participantCount}`;
                break;
            }
            return (
              <span
                className={styled(
                  "mx-3 flex-shrink-0 flex-grow text-center text-xs",
                  BRANCH_WIDTH,
                )}
                key={`stage-label-${i}`}
              >
                {label}
              </span>
            );
          })}
        </div>

        <div className="mt-5 flex flex-row justify-between">
          {lineups.map((l, i) => (
            <div
              className={styled(
                "flex flex-shrink-0 flex-grow flex-col items-center gap-3 px-3",
                i === 0
                  ? ""
                  : "justify-around border-l dark:border-l-neutral-800",
              )}
              key={`knockout-stage-${i}`}
            >
              {l.map((ll, ii) => (
                <KnockoutTournamentMatch
                  key={`knockout-stage-${i}-match-${ii}`}
                  match={getLineupMatch(ll)}
                  onChange={() => alert("TODO")}
                />
              ))}
            </div>
          ))}
        </div>
      </Card>

      <div className="fixed bottom-2 left-0 right-0 flex justify-center">
        <button
          onClick={handleSubmitTournament}
          className="flex items-center gap-2 rounded bg-green-500 p-2"
        >
          <FiCheck /> Create Tournament
        </button>
      </div>
      <div className="h-3" />
    </div>
  );
}
