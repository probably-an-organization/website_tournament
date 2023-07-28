import {
  TILE_HEIGHT,
  TILE_GAP,
  TILE_STAGE_WIDTH_GAP,
  TILE_WIDTH,
  PLAYER_MARGIN,
  PLAYER_GAP,
} from ".";
import { useKnockoutTournamentContext } from "~src/hooks/context/useKnockoutTournamentContext";
import KnockoutSVGTreeMatchWithInfo from "./MatchWithInfo";

type KnockoutSVGTreeTopProps = {
  className?: string;
};

export default function KnockoutSVGTreeTop({
  className,
}: KnockoutSVGTreeTopProps) {
  const { knockoutTournament } = useKnockoutTournamentContext();

  if (knockoutTournament === null) {
    throw Error("Knockout tournament is null");
  }

  const firstStageTiles = knockoutTournament.sortedMatches[0]?.length;
  if (!firstStageTiles) {
    throw Error("???");
  }

  const SVG_HEIGHT =
    firstStageTiles * TILE_HEIGHT + (firstStageTiles - 1) * TILE_GAP;
  const SVG_WIDTH =
    knockoutTournament.sortedMatches.length * TILE_STAGE_WIDTH_GAP -
    (TILE_STAGE_WIDTH_GAP - TILE_WIDTH);

  return (
    <svg height={SVG_HEIGHT} width={SVG_WIDTH}>
      <g id="paths">
        {knockoutTournament.sortedMatches.map((stage, i) => {
          if (i === 0) {
            return;
          }
          const previousTilesGap =
            i === 0
              ? -1
              : firstStageTiles /
                knockoutTournament.sortedMatches[i - 1]!.length;
          return (
            <g key={`stage-${i}-path`} id={`stage-${i}-path`}>
              <path
                className="stroke-1 dark:stroke-neutral-800"
                d={`M ${
                  i * TILE_STAGE_WIDTH_GAP -
                  (TILE_STAGE_WIDTH_GAP - TILE_WIDTH) / 2
                },0 ${
                  i * TILE_STAGE_WIDTH_GAP -
                  (TILE_STAGE_WIDTH_GAP - TILE_WIDTH) / 2
                },${SVG_HEIGHT}`}
                strokeLinecap="round"
              />
              {stage.map((_, ii) => {
                const tileMatchCenter1 =
                  2 * ii * (previousTilesGap * (TILE_HEIGHT + TILE_GAP));

                const tileMatchCenter2 =
                  (2 * ii + 1) * (previousTilesGap * (TILE_HEIGHT + TILE_GAP));
                return (
                  <g
                    key={`stage-${i - 1}-path-match-${2 * ii}-${2 * ii + 1}`}
                    id={`stage-${i - 1}-path-match-${2 * ii}-${2 * ii + 1}`}
                  >
                    <path
                      className="stroke-[3px] dark:stroke-neutral-200"
                      d={`M ${(i - 1) * TILE_STAGE_WIDTH_GAP + TILE_WIDTH},${
                        tileMatchCenter1 + TILE_HEIGHT / 2
                      } ${i * TILE_STAGE_WIDTH_GAP},${
                        tileMatchCenter1 +
                        PLAYER_MARGIN +
                        (TILE_HEIGHT - 2 * PLAYER_MARGIN - PLAYER_GAP) / 2 / 2
                      }`} // TODO
                      strokeLinecap="round"
                    />
                    <path
                      className="stroke-[3px] dark:stroke-neutral-200"
                      d={`M ${(i - 1) * TILE_STAGE_WIDTH_GAP + TILE_WIDTH},${
                        tileMatchCenter2 + TILE_HEIGHT / 2
                      } ${i * TILE_STAGE_WIDTH_GAP},${
                        tileMatchCenter1 +
                        TILE_HEIGHT / 2 +
                        (TILE_HEIGHT - 2 * PLAYER_MARGIN - PLAYER_GAP) / 2 / 2 +
                        TILE_GAP
                      }`} // TODO
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </g>
      <g id="tiles">
        {knockoutTournament.sortedMatches.map((stage, i) => {
          const stageTilesGap =
            firstStageTiles / knockoutTournament.sortedMatches[i]!.length;
          return (
            <g key={`stage-${i}-tile`} id={`stage-${i}-tile`}>
              {stage.map((match, ii) => {
                const tileMatchCenter =
                  ii * (stageTilesGap * (TILE_HEIGHT + TILE_GAP));

                return (
                  <KnockoutSVGTreeMatchWithInfo
                    key={`stage-${i}-tile-match-${ii}`}
                    match={match} /* TODO */
                    x={i * TILE_STAGE_WIDTH_GAP}
                    y={tileMatchCenter}
                  />
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
