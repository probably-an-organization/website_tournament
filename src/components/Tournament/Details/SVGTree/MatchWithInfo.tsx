import {
  flip,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiInfo } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { useKnockoutTournamentContext } from "~src/hooks/context/tournament/useKnockoutTournamentContext";
import type { KnockoutMatch, Participant } from "~src/types/tournament";
import useFullscreen from "~src/hooks/useFullscreen";

import {
  BORDER_RADIUS,
  PLAYER_GAP,
  PLAYER_MARGIN,
  TILE_HEIGHT,
  TILE_INFO_SIZE,
  TILE_WIDTH,
} from ".";

const MATCH_RECT_CLASS = {
  default: "dark:fill-neutral-700",
  finished: "dark:fill-neutral-950",
};

const PLAYER_RECT_CLASS = {
  default: "dark:fill-neutral-500 dark:hover:fill-neutral-400",
  empty: "dark:fill-neutral-800 hover:dark-fill-neutral-700",
  winner: "dark:fill-orange-500",
  loser: "dark:fill-neutral-900",
};

const PLAYER_TEXT_CLASS = {
  default: "fill-neutral-50 transition-colors peer-hover:fill-neutral-950",
  empty: "fill-neutral-500 italic",
  winner: "dark:fill-neutral-50 font-medium",
  loser: "dark:fill-neutral-400",
};

type KnockoutSVGTreeMatchProps = {
  match: KnockoutMatch;
  x: number;
  y: number;
};

export default function KnockoutSVGTreeMatchWithInfo({
  match,
  x,
  y,
}: KnockoutSVGTreeMatchProps) {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [participants, setParticipants] = useState<
    [Participant | null, Participant | null]
  >([null, null]);

  const { knockoutEditPermission, participantsLookup, setEditKnockoutMatch } =
    useKnockoutTournamentContext();

  const isFullscreen = useFullscreen();

  const { refs, floatingStyles, context } = useFloating({
    middleware: [offset(5), flip(), shift()],
    open: showInfo,
    onOpenChange: setShowInfo,
  });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  useEffect(() => {
    if (Object.keys(participantsLookup).length < 1) {
      return;
    }
    const p1 = participantsLookup[match.participant_1_id] as Participant;
    const p2 = participantsLookup[match.participant_2_id] as Participant;
    setParticipants([p1 ?? null, p2 ?? null]);
  }, [match, participantsLookup]);

  return (
    <>
      <g
        id={`stage-${match.stage_number}-match-${match.match_number}`}
        className={knockoutEditPermission ? "cursor-pointer" : "cursor-default"}
        onClick={
          knockoutEditPermission ? () => setEditKnockoutMatch(match) : undefined
        }
      >
        <rect
          className={
            Number(match.winner) === 0
              ? MATCH_RECT_CLASS.default
              : MATCH_RECT_CLASS.finished
          }
          x={x}
          y={y}
          width={TILE_WIDTH}
          height={TILE_HEIGHT}
          rx={BORDER_RADIUS}
        />

        <g id={`stage-${match.stage_number}-match-${match.match_number}-p1`}>
          <rect
            className={twMerge(
              "peer transition-colors",
              match.participant_1_id
                ? Number(match.winner) === 0
                  ? PLAYER_RECT_CLASS.default
                  : Number(match.winner) === 1
                  ? PLAYER_RECT_CLASS.winner
                  : PLAYER_RECT_CLASS.loser
                : PLAYER_RECT_CLASS.empty,
            )}
            x={x + PLAYER_MARGIN}
            y={y + PLAYER_MARGIN}
            width={
              TILE_WIDTH -
              2 * PLAYER_MARGIN -
              (isFullscreen ? 0 : PLAYER_MARGIN + TILE_INFO_SIZE)
            }
            height={(TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2}
            rx={BORDER_RADIUS}
          />
          {participants[0] ? (
            <>
              <text
                className={twMerge(
                  "pointer-events-none font-medium",
                  match.participant_1_id
                    ? Number(match.winner) === 0
                      ? PLAYER_TEXT_CLASS.default
                      : Number(match.winner) === 1
                      ? PLAYER_TEXT_CLASS.winner
                      : PLAYER_TEXT_CLASS.loser
                    : PLAYER_TEXT_CLASS.empty,
                )}
                x={x + PLAYER_MARGIN + 10 /* PADDING */}
                y={
                  y +
                  PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 2 -
                  10
                }
                // textAnchor="middle"
                dominantBaseline="central"
              >
                {participants[0]?.name ?? "TBD"}
              </text>
              <text
                className={twMerge(
                  "pointer-events-none text-xs",
                  match.participant_1_id
                    ? Number(match.winner) === 0
                      ? PLAYER_TEXT_CLASS.default
                      : Number(match.winner) === 1
                      ? PLAYER_TEXT_CLASS.winner
                      : PLAYER_TEXT_CLASS.loser
                    : PLAYER_TEXT_CLASS.empty,
                )}
                x={x + PLAYER_MARGIN + 10 /* PADDING */}
                y={
                  y +
                  PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 2 +
                  10
                }
                // textAnchor="middle"
                dominantBaseline="central"
              >
                {participants[0]?.team ?? "-"}
              </text>
              <foreignObject
                className="pointer-events-none"
                x={
                  x +
                  TILE_WIDTH -
                  40 -
                  PLAYER_MARGIN -
                  (isFullscreen ? 0 : PLAYER_MARGIN + TILE_INFO_SIZE) -
                  5 /* ??? */
                }
                y={
                  y +
                  PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 4
                }
                width={35}
                height={25}
              >
                <img
                  className="h-full w-full rounded object-cover"
                  src={`/tournamentGenerator/countries/${participants[0]?.country_id}.svg`}
                />
              </foreignObject>
              {/* <image
                href={`/tournamentGenerator/countries/${participants[0]?.country_id}.svg`}
                height={20}
                width={40}
                x={
                  x +
                  TILE_WIDTH -
                  40 -
                  2 * PLAYER_MARGIN -
                  TILE_INFO_SIZE -
                  5 // ??
                }
                y={
                  y +
                  PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 4
                }
              /> */}
            </>
          ) : (
            <text
              className={twMerge(
                "pointer-events-none",
                match.participant_1_id
                  ? Number(match.winner) === 0
                    ? PLAYER_TEXT_CLASS.default
                    : Number(match.winner) === 1
                    ? PLAYER_TEXT_CLASS.winner
                    : PLAYER_TEXT_CLASS.loser
                  : PLAYER_TEXT_CLASS.empty,
              )}
              x={
                x +
                PLAYER_MARGIN +
                (TILE_WIDTH - 2 * PLAYER_MARGIN - TILE_INFO_SIZE) / 2
              }
              y={
                y +
                PLAYER_MARGIN +
                // height / 2
                ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 2
              }
              textAnchor="middle"
              dominantBaseline="central"
            >
              TBD
            </text>
          )}
        </g>

        <g id={`stage-${match.stage_number}-match-${match.match_number}-p2`}>
          <rect
            className={twMerge(
              "peer transition-colors",
              match.participant_2_id
                ? Number(match.winner) === 0
                  ? PLAYER_RECT_CLASS.default
                  : Number(match.winner) === 2
                  ? PLAYER_RECT_CLASS.winner
                  : PLAYER_RECT_CLASS.loser
                : PLAYER_RECT_CLASS.empty,
            )}
            x={x + PLAYER_MARGIN}
            y={
              y +
              (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 -
              PLAYER_GAP / 2 +
              2 * PLAYER_MARGIN
            }
            width={
              TILE_WIDTH -
              2 * PLAYER_MARGIN -
              (isFullscreen ? 0 : PLAYER_MARGIN + TILE_INFO_SIZE)
            }
            height={(TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2}
            fill="gray"
            rx={BORDER_RADIUS}
          />

          {participants[1] ? (
            <>
              <text
                className={twMerge(
                  "pointer-events-none font-medium",
                  match.participant_2_id
                    ? Number(match.winner) === 0
                      ? PLAYER_TEXT_CLASS.default
                      : Number(match.winner) === 2
                      ? PLAYER_TEXT_CLASS.winner
                      : PLAYER_TEXT_CLASS.loser
                    : PLAYER_TEXT_CLASS.empty,
                )}
                // x={
                //   x +
                //   PLAYER_MARGIN +
                //   (TILE_WIDTH - 2 * PLAYER_MARGIN - TILE_INFO_SIZE) / 2
                // }
                x={x + PLAYER_MARGIN + 10 /* PADDING */}
                y={
                  y +
                  (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 -
                  PLAYER_GAP / 2 +
                  2 * PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 2 -
                  10
                }
                // textAnchor="middle"
                dominantBaseline="central"
              >
                {participants[1]?.name ?? "TBD"}
              </text>
              <text
                className={twMerge(
                  "pointer-events-none text-xs",
                  match.participant_2_id
                    ? Number(match.winner) === 0
                      ? PLAYER_TEXT_CLASS.default
                      : Number(match.winner) === 2
                      ? PLAYER_TEXT_CLASS.winner
                      : PLAYER_TEXT_CLASS.loser
                    : PLAYER_TEXT_CLASS.empty,
                )}
                // x={
                //   x +
                //   PLAYER_MARGIN +
                //   (TILE_WIDTH - 2 * PLAYER_MARGIN - TILE_INFO_SIZE) / 2
                // }
                y={
                  y +
                  (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 -
                  PLAYER_GAP / 2 +
                  2 * PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 2 +
                  10
                }
                x={x + PLAYER_MARGIN + 10 /* PADDING */}
                // textAnchor="middle"
                dominantBaseline="central"
              >
                {participants[1]?.team ?? "-"}
              </text>
              <foreignObject
                className="pointer-events-none"
                x={
                  x +
                  TILE_WIDTH -
                  40 -
                  PLAYER_MARGIN -
                  (isFullscreen ? 0 : PLAYER_MARGIN + TILE_INFO_SIZE) -
                  5 /* ??? */
                }
                y={
                  y +
                  (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 -
                  PLAYER_GAP / 2 +
                  2 * PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 4
                }
                width={35}
                height={25}
              >
                <img
                  className="h-full w-full rounded object-cover"
                  src={`/tournamentGenerator/countries/${participants[1]?.country_id}.svg`}
                />
              </foreignObject>
              {/* <image
                href={`/tournamentGenerator/countries/${participants[1]?.country_id}.svg`}
                height={20}
                width={40}
                x={
                  x +
                  TILE_WIDTH -
                  40 -
                  2 * PLAYER_MARGIN -
                  TILE_INFO_SIZE -
                  5 // ??
                }
                y={
                  y +
                  (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 -
                  PLAYER_GAP / 2 +
                  2 * PLAYER_MARGIN +
                  // height / 2
                  ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 4
                }
              /> */}
            </>
          ) : (
            <text
              className={twMerge(
                "pointer-events-none",
                match.participant_2_id
                  ? Number(match.winner) === 0
                    ? PLAYER_TEXT_CLASS.default
                    : Number(match.winner) === 2
                    ? PLAYER_TEXT_CLASS.winner
                    : PLAYER_TEXT_CLASS.loser
                  : PLAYER_TEXT_CLASS.empty,
              )}
              x={
                x +
                PLAYER_MARGIN +
                (TILE_WIDTH - 2 * PLAYER_MARGIN - TILE_INFO_SIZE) / 2
              }
              y={
                y +
                (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 -
                PLAYER_GAP / 2 +
                2 * PLAYER_MARGIN +
                // height / 2
                ((TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2 - PLAYER_GAP / 2) / 2
              }
              textAnchor="middle"
              dominantBaseline="central"
            >
              TBD
            </text>
          )}
        </g>

        {!isFullscreen && (
          <g ref={refs.setReference} {...getReferenceProps()}>
            <rect
              x={x + TILE_WIDTH - TILE_INFO_SIZE - PLAYER_MARGIN}
              y={
                y +
                TILE_HEIGHT -
                TILE_INFO_SIZE -
                (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2
              }
              width={TILE_INFO_SIZE}
              height={TILE_INFO_SIZE}
              fill="transparent"
            />
            <FiInfo
              x={x + TILE_WIDTH - TILE_INFO_SIZE - PLAYER_MARGIN}
              y={
                y +
                TILE_HEIGHT -
                TILE_INFO_SIZE -
                (TILE_HEIGHT - 2 * PLAYER_MARGIN) / 2
              }
              size={TILE_INFO_SIZE}
            />
          </g>
        )}
      </g>

      {/* INFO POPUP */}
      {showInfo &&
        createPortal(
          <div
            className="z-30 w-80 break-words rounded bg-neutral-950 bg-opacity-75 p-2 backdrop-blur"
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {JSON.stringify(match)}
          </div>,
          document.body,
        )}
    </>
  );
}
