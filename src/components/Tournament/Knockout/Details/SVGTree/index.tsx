import {
  AiOutlineVerticalAlignMiddle,
  AiOutlineVerticalAlignTop,
} from "react-icons/ai";
import { FiAward } from "react-icons/fi";

import { useKnockoutTournamentContext } from "~src/hooks/context/tournament/useKnockoutTournamentContext";
import KnockoutSVGTreeCentered from "./Centered";
import KnockoutSVGTreeTop from "./Top";
import useFullscreen from "~src/hooks/useFullscreen";
import { styled } from "~src/utils/stringUtils";
import { KnockoutMatch, KnockoutTournament } from "~src/types/tournament";
import Modal from "~src/components/Modal";
import { getStageLabel } from "~src/utils/tournamentUtils";
import { Button } from "@futshi/js_toolbox";
import useAxios from "~src/hooks/useAxios";
import {
  NotificationType,
  useNotificationContext,
} from "~src/hooks/context/useNotificationContext";
import Input from "~src/components/Input";
import NationalityBadge from "../../../NationalityBadge";
import { handleAxiosError } from "~src/utils/axiosUtils";

export enum TreeStyles {
  Top = "TreeStyles.Top",
  Centered = "TreeStyles.Centered",
}

export const TREE_STYLES = [
  { value: TreeStyles.Top, label: "Top", icon: <AiOutlineVerticalAlignTop /> },
  {
    value: TreeStyles.Centered,
    label: "Centered",
    icon: <AiOutlineVerticalAlignMiddle />,
  },
];

export const BORDER_RADIUS = 5;

export const TILE_WIDTH = 220;
export const TILE_HEIGHT = 120;
export const TILE_GAP = 10;
export const TILE_STAGE_WIDTH_GAP = 300; // greater than TILE_WIDTH

export const CONNECTION_GAP_FACTOR = 0.275; // 0.5 - 1, TreeStyles.Centered

export const TILE_INFO_SIZE = 20;
export const PLAYER_MARGIN = 10;
export const PLAYER_GAP = 10;

type KnockoutSVGTreeProps = {
  treeStyle: TreeStyles;
};

export default function KnockoutSVGTree({
  treeStyle = TreeStyles.Top,
}: KnockoutSVGTreeProps) {
  const {
    editKnockoutMatch,
    knockoutTournament,
    participantsCount,
    participantsLookup,
    setEditKnockoutMatch,
    setKnockoutTournament,
  } = useKnockoutTournamentContext();

  if (knockoutTournament === null) {
    throw Error("Knockout tournament is null");
  }

  const isFullscreen = useFullscreen();
  const notification = useNotificationContext();
  const { get, put } = useAxios();

  const firstStageTiles = knockoutTournament.sortedMatches[0]?.length;
  if (!firstStageTiles) {
    throw Error("???");
  }

  const handleEditKnockoutMatchSubmit = async () => {
    if (!editKnockoutMatch) {
      throw Error("???");
    }

    try {
      const result = await put(
        `knockout-edit-match/${editKnockoutMatch._id}`,
        {
          ...editKnockoutMatch,
        },
        { withCredentials: true },
      );

      setKnockoutTournament((prev) => {
        const newKnockoutTournament = { ...prev };
        newKnockoutTournament.sortedMatches!.forEach((stage, sIndex) =>
          stage.forEach((match, mIndex) => {
            const newMatch = (result.data as KnockoutMatch[]).find(
              (newMatch) => newMatch._id === match._id,
            );
            if (newMatch) {
              newKnockoutTournament.sortedMatches![sIndex]![mIndex] = newMatch;
            }
          }),
        );
        return newKnockoutTournament as KnockoutTournament;
      });
      setEditKnockoutMatch(null);
      notification({
        title: "Success",
        description: "Match successfully changed",
        type: NotificationType.Success,
      });
    } catch (err) {
      handleAxiosError(err, {
        409: () =>
          notification({
            title: "Error",
            description: "Match not up-to-date, please refresh page",
            type: NotificationType.Error,
          }),
        default: () =>
          notification({
            title: "Error",
            description: "Match could not be changed",
            type: NotificationType.Error,
          }),
      });
    }
  };

  const handleEditKnockoutMatchBroadcast = async () => {
    if (!editKnockoutMatch) {
      throw Error("???");
    }

    try {
      const result = await get(
        `/knockout-tournament/${knockoutTournament!._id}/broadcast/${
          editKnockoutMatch.stage_number
        }/${editKnockoutMatch.match_number}`,
        { withCredentials: true },
      );
      notification({
        title: "Success",
        description: "Match successfully broadcasted",
        type: NotificationType.Success,
      });
    } catch (err) {
      notification({
        title: "Error",
        description: err as string,
        type: NotificationType.Error,
      });
    }
  };

  return (
    <>
      <div
        className={
          isFullscreen
            ? "pointer-events-none fixed inset-0 z-[100] bg-neutral-900 p-3"
            : undefined
        }
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="sticky top-3 z-10 flex flex-row rounded">
            {Array.from({
              length: knockoutTournament.sortedMatches.length,
            }).map((_, i) => {
              const participantCount =
                knockoutTournament.sortedMatches[i]!.length * 2;
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
                <div
                  className="text-center text-xs"
                  style={{
                    width:
                      i < knockoutTournament.sortedMatches.length - 1
                        ? TILE_STAGE_WIDTH_GAP
                        : TILE_STAGE_WIDTH_GAP -
                          (TILE_STAGE_WIDTH_GAP - TILE_WIDTH),
                    paddingRight:
                      i < knockoutTournament.sortedMatches.length - 1
                        ? TILE_STAGE_WIDTH_GAP - TILE_WIDTH
                        : 0,
                  }}
                  key={`stage-label-${i}`}
                >
                  <button
                    className="rounded bg-neutral-900 px-3 py-1 shadow transition-colors hover:bg-neutral-800"
                    onClick={() =>
                      alert(
                        "TODO start rendering from here (cut everything off from the left)",
                      )
                    }
                  >
                    {label}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="pt-3">
            {/* TODO motion.div or smth */}
            {treeStyle === TreeStyles.Centered && <KnockoutSVGTreeCentered />}
            {treeStyle === TreeStyles.Top && <KnockoutSVGTreeTop />}
          </div>
        </div>
      </div>

      <Modal show={!!editKnockoutMatch}>
        {editKnockoutMatch && (
          <div className="flex flex-col gap-3 p-3">
            <div>
              {getStageLabel(editKnockoutMatch.stage_number, participantsCount)}
            </div>
            <div>
              <label>Select winner</label>
              <div className="flex flex-col gap-3">
                {editKnockoutMatch &&
                  [
                    editKnockoutMatch.participant_1_id,
                    editKnockoutMatch.participant_2_id,
                  ].map((p, i) => {
                    const participant = participantsLookup[p!];
                    const winner = Number(editKnockoutMatch.winner);
                    const playerIndex = i + 1;
                    return (
                      <button
                        className={styled(
                          "flex items-center justify-between rounded p-3 transition-colors",
                          !winner
                            ? "[not:disabled]:hover:bg-neutral-400 bg-neutral-500 disabled:bg-neutral-700"
                            : winner === playerIndex
                            ? "bg-orange-500"
                            : "[not:disabled]:hover:bg-neutral-700 bg-neutral-800",
                        )}
                        disabled={!participant}
                        key={`player-selector-${playerIndex}`}
                        onClick={() =>
                          setEditKnockoutMatch(
                            (prev) =>
                              ({
                                ...prev,
                                winner:
                                  winner === playerIndex ? 0 : playerIndex,
                              }) as KnockoutMatch,
                          )
                        }
                      >
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex flex-col items-start">
                            <div className="flex items-center gap-1 font-bold">
                              <span>{participant?.name ?? "TBD"}</span>
                              {winner === playerIndex ? <FiAward /> : ""}
                            </div>
                            <span className="text-xs">
                              {participant?.team ?? "-"}
                            </span>
                          </div>
                          <div className="h-8 w-10">
                            <NationalityBadge
                              country={participant?.country_id}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
            <div>
              <label>Information</label>
              <Input
                className="w-full"
                onChange={(e) =>
                  setEditKnockoutMatch(
                    (prev) =>
                      ({
                        ...prev,
                        information: e.target.value,
                      }) as KnockoutMatch,
                  )
                }
                value={editKnockoutMatch.information || ""}
              />
            </div>
            <div className="flex justify-between gap-3">
              <div className="flex gap-3">
                <Button onClick={() => setEditKnockoutMatch(null)}>
                  Cancel
                </Button>
                <Button onClick={handleEditKnockoutMatchSubmit}>Submit</Button>
              </div>
              <Button onClick={handleEditKnockoutMatchBroadcast}>
                Broadcast
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
