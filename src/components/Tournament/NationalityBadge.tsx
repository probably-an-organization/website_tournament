import Image from "next/image";
import { twMerge } from "tailwind-merge";

import type { Country } from "~src/constants/tournament/COUNTRIES";

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
      className={twMerge(
        "flex h-full w-full items-center justify-center rounded bg-neutral-600",
        className,
      )}
    >
      {!country ? (
        <span className="flex h-full w-full items-center justify-center rounded bg-neutral-500 not-italic text-neutral-300">
          ?
        </span>
      ) : (
        <Image
          alt="rank"
          className={twMerge("h-full w-full rounded object-cover", className)}
          height="0"
          src={`/tournamentGenerator/countries/${country}.svg`}
          unoptimized
          width="0"
        />
      )}
    </div>
  );
}
