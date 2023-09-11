import { useState } from "react";
import { Input } from "@futshi/js_toolbox";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~src/components/Popover";
import NationalityBadge from "./NationalityBadge";
import type { Country } from "~src/constants/tournament/COUNTRIES";
import { COUNTRIES_ISO } from "~src/constants/tournament/COUNTRIES";

type NationalityBadgeSelectorProps = {
  closeOnChange?: boolean;
  error?: boolean;
  onChange(country: Country): void;
  value?: Country;
};

export default function NationalityBadgeSelector({
  closeOnChange = true,
  error,
  onChange,
  value,
}: NationalityBadgeSelectorProps) {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");

  const filteredCountries = COUNTRIES_ISO.filter((country) => {
    for (const [_, value] of Object.entries(country)) {
      if (value.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    }
    return false;
  });

  return (
    <Popover open={dropdown} onOpenChange={setDropdown}>
      <PopoverTrigger
        className="h-full w-full"
        onClick={() => setDropdown((previousDropdown) => !previousDropdown)}
      >
        <NationalityBadge
          className={error ? "border border-red-500" : ""}
          country={value}
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="relative flex h-96 flex-col overflow-auto rounded bg-black bg-opacity-75 backdrop-blur">
          <div className="sticky left-0 right-0 top-0 h-10 border-b p-2 backdrop-blur">
            <Input
              className="h-full"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter(e.target.value)
              }
              value={filter}
            />
          </div>
          <div className="flex flex-col gap-2 p-2">
            {filteredCountries.map((country, i) => (
              <button
                className="flex flex-row gap-2"
                key={`country-${i}`}
                onClick={() => {
                  onChange(country.code as Country);
                  if (closeOnChange) {
                    setDropdown(false);
                  }
                }}
              >
                <div className="h-4 w-6">
                  <NationalityBadge country={country.code as Country} />
                </div>
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-xs text-neutral-50">
                  {country.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
