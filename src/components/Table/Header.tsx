"use client";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import type {
  ColumnDefTemplate,
  HeaderContext,
  SortDirection,
  Table,
} from "@tanstack/react-table";
import { Checkbox } from "@futshi/js_toolbox";
import { twMerge } from "tailwind-merge";

export type TableHeaderProps<T> = {
  checkbox: boolean;
  flexRender: (
    header: ColumnDefTemplate<HeaderContext<any, unknown>> | undefined,
    headerContext: HeaderContext<any, unknown>,
  ) => React.ReactNode;
  reactTable: Table<any>;
  rowCanExpand?(row: T): boolean;
  rowExpandComponent?(row: T): React.ReactNode;
};

export default function TableHeader<T>({
  checkbox,
  reactTable,
  flexRender,
  rowCanExpand,
  rowExpandComponent,
}: TableHeaderProps<T>) {
  return (
    <thead className="dark:bg-neutral-800 rounded">
      {reactTable.getHeaderGroups().map((headerGroup, headerGroupIndex) => {
        const isDataHeaderGroup: boolean =
          headerGroupIndex >= reactTable.getHeaderGroups().length - 1;
        return (
          <tr key={headerGroup.id}>
            {checkbox && (
              <th className="w-[1%] px-4 first:rounded-l last:rounded-r">
                {isDataHeaderGroup && (
                  <Checkbox
                    checked={reactTable.getIsAllRowsSelected()}
                    indeterminate={reactTable.getIsSomeRowsSelected()}
                    onChange={reactTable.getToggleAllRowsSelectedHandler()}
                  />
                )}
              </th>
            )}
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="px-1 py-2 first:rounded-l last:rounded-r"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={twMerge(
                      "dark:text-neutral-50",
                      isDataHeaderGroup
                        ? ""
                        : "rounded bg-neutral-400 py-0.5 text-xs text-neutral-50 dark:bg-neutral-500",
                    )}
                  >
                    <div
                      className={twMerge(
                        header.column.getCanSort()
                          ? "flex gap-2 cursor-pointer select-none items-center font-semibold dark:text-neutral-50"
                          : "cursor-default text-center",
                        isDataHeaderGroup
                          ? " justify-start"
                          : " justify-center",
                      )}
                      onClick={() =>
                        header.column.toggleSorting(
                          header.column.getIsSorted() === "asc",
                        )
                      }
                    >
                      <div className="flex flex-col">
                        <FiChevronUp
                          className={twMerge(
                            "transition-colorsOpacity opacity-30",
                            header.column.getIsSorted() === "asc"
                              ? "opacity-100 stroke-orange-500"
                              : "",
                          )}
                          size={15}
                          strokeWidth={3}
                        />
                        <FiChevronDown
                          className={twMerge(
                            "transition-colorsOpacity opacity-30",
                            header.column.getIsSorted() === "desc"
                              ? "opacity-100 stroke-orange-500"
                              : "",
                          )}
                          size={15}
                          strokeWidth={3}
                        />
                      </div>
                      <p
                        className={twMerge(
                          "transition-colors",
                          header.column.getIsSorted() ? "text-orange-500" : "",
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </th>
            ))}
            {rowCanExpand && <th className="rounded-r" />}
          </tr>
        );
      })}
      {rowCanExpand && rowExpandComponent && <tr />}
    </thead>
  );
}
