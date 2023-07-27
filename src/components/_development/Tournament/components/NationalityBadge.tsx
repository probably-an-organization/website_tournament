import Image from "next/image";

import { styled } from "~/utils/stringUtils";
import type { Country } from "../constants/COUNTRIES";

export type NationalityBadgeProps = {
  className?: string;
  country?: Country;
};

export default function NationalityBadge({
  className,
  country,
}: NationalityBadgeProps) {
  return (
    <div
      className={styled(
        "flex h-full w-full items-center justify-center rounded bg-neutral-600",
        className
      )}
    >
      {!country ? (
        <span className="flex h-full w-full items-center justify-center rounded bg-neutral-500 not-italic text-neutral-300">
          ?
        </span>
      ) : (
        <Image
          alt="rank"
          className={styled("h-full w-full rounded object-cover", className)}
          height="0"
          src={`/tournamentGenerator/countries/${country}.svg`}
          unoptimized
          width="0"
        />
      )}
    </div>
  );
}
