import { ColorRGB, rgbInterpolationToHex } from "~src/utils/colorUtils";
import { twMerge } from "tailwind-merge";
import type { Skill } from "../../../../../@types/tournament";

const INTERPOLATION_COLORS = [
  new ColorRGB(0, 255, 0),
  new ColorRGB(255, 255, 0),
  new ColorRGB(255, 0, 0),
];

export type SkillLevelBadgeProps = {
  className?: string;
  skill: Skill;
};

export default function SkillLevelBadge({
  className,
  skill,
}: SkillLevelBadgeProps) {
  const color = rgbInterpolationToHex(skill / 10, INTERPOLATION_COLORS);

  return (
    <div
      className={twMerge(
        "flex h-10 w-24 items-center justify-center rounded bg-neutral-600",
        className,
      )}
    >
      <div className="relative h-10 w-10 p-1">
        <div
          className="relative h-full w-full rounded-full"
          style={{ transform: "rotate(180deg)" }}
        >
          <div className="absolute inset-0 rounded-full border-[6px] border-neutral-400 bg-neutral-600" />
          <div
            className="absolute left-0 top-0 h-full w-full"
            style={
              skill <= 5
                ? {
                    clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                  }
                : undefined
            }
          >
            <div
              className="absolute left-0 top-0 h-full w-full rounded-full border-[6px]"
              style={{
                borderColor: color,
                clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
                transform: `rotate(${360 * (skill / 10)}deg)`,
              }}
            />
            {skill > 5 && (
              <div
                className="absolute left-0 top-0 h-full w-full rounded-full border-[6px]"
                style={{
                  borderColor: color,
                  clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
                }}
              />
            )}
          </div>
        </div>
        <span
          className="absolute inset-0 text-center text-xs font-bold leading-10"
          style={
            skill > 0
              ? {
                  color: color,
                }
              : { color: "white" }
          }
        >
          {skill > 0 && skill <= 10 ? skill : "?"}
        </span>
      </div>
    </div>
  );
}
