import { useState } from "react";

import { FiChevronUp, FiChevronDown, FiX, FiEdit3 } from "react-icons/fi";

import { styled } from "~/utils/stringUtils";

enum FilterType {
  None = 0,
  Ascending = 1,
  Descending = 2,
}

export type FilterInputProps = {
  type?: string;
  name?: string;
  children?: React.ReactNode;
};

export default function FilterInput({
  type = "text",
  name = "name",
  children = "input",
}: FilterInputProps) {
  const [active, setActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>(FilterType.None);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setActive(!!e.target.value);
  };

  const resetFilter = () => {
    setFilter("");
    setActive(false);
  };

  return (
    <div className="flex overflow-hidden rounded border border-white border-opacity-25 bg-neutral-600 text-white">
      <div className="relative flex">
        <input
          className={styled(
            "peer w-full rounded bg-transparent p-2 text-sm outline-none duration-200 ease-in-out focus:pt-6",
            active ? "pt-6" : undefined
          )}
          id={name}
          name={name}
          type={type}
          onChange={handleFilter}
          value={filter}
        />
        <label
          className={styled(
            "pointer-events-none absolute bottom-0 left-0 top-0 flex items-center p-2 text-neutral-50 transition-all duration-200 ease-in-out peer-focus:bottom-6 peer-focus:text-xs peer-focus:font-thin peer-focus:text-opacity-50",
            active
              ? "bottom-6 text-xs font-thin text-opacity-50"
              : "text-sm font-bold text-opacity-100"
          )}
          htmlFor={name}
        >
          {children}
        </label>

        <div
          className={styled(
            "pointer-events-none absolute bottom-0 right-0 top-0 flex p-2 transition-opacity peer-focus:opacity-0",
            active || filter ? "opacity-0" : "opacity-100"
          )}
        >
          <FiEdit3 className="self-center justify-self-center" />
        </div>

        <div
          className={styled(
            "absolute right-1 top-1",
            filter.length > 0 ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          <button
            className={styled(
              "cursor-pointer p-1 transition-all hover:text-red-500",
              filter.length > 0
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            )}
            onClick={resetFilter}
          >
            <FiX />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center border-l border-l-neutral-500">
        <button
          className={styled(
            "group p-1.5 transition-colors dark:hover:bg-neutral-700",
            filterType === FilterType.Ascending
              ? "text-green-500 hover:text-red-500"
              : "text-neutral-500 hover:text-neutral-200"
          )}
          onClick={() =>
            setFilterType(
              filterType === FilterType.Ascending
                ? FilterType.None
                : FilterType.Ascending
            )
          }
        >
          <FiChevronUp />
        </button>
        <button
          className={styled(
            "group p-1.5 transition-colors dark:hover:bg-neutral-700",
            filterType === FilterType.Descending
              ? "text-green-500 hover:text-red-500"
              : "text-neutral-500 hover:text-neutral-200"
          )}
          onClick={() =>
            setFilterType(
              filterType === FilterType.Descending
                ? FilterType.None
                : FilterType.Descending
            )
          }
        >
          <FiChevronDown />
        </button>
      </div>
    </div>
  );
}
