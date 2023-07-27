"use client";

import { FiArrowUpCircle, FiArrowDownCircle, FiFilter } from "react-icons/fi";
import type {
  ColumnDefTemplate,
  HeaderContext,
  Table,
} from "@tanstack/react-table";

import { useTranslation } from "next-i18next";

import Checkbox from "../Checkbox";
import Button from "../Button";

export type TableHeaderProps<T> = {
  checkbox: boolean;
  flexRender: (
    header: ColumnDefTemplate<HeaderContext<any, unknown>> | undefined,
    headerContext: HeaderContext<any, unknown>
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
  const { t } = useTranslation("table");
  return (
    <thead>
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
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="not px-1 first:rounded-l last:rounded-r"
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={`dark:text-neutral-50${
                        isDataHeaderGroup
                          ? ""
                          : " rounded bg-neutral-400 py-0.5 text-xs text-neutral-50 dark:bg-neutral-500"
                      }`}
                    >
                      <div
                        className={`${
                          header.column.getCanSort()
                            ? "flex cursor-pointer select-none items-center gap-1 font-semibold dark:text-neutral-50"
                            : "cursor-default text-center font-thin"
                        }${
                          isDataHeaderGroup
                            ? " justify-start"
                            : " justify-center"
                        }${header.column.getIsSorted() ? " underline" : ""}`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <FiArrowUpCircle />,
                          desc: <FiArrowDownCircle />,
                        }[header.column.getIsSorted() as string] ?? (
                          <div className="w-[16px]" />
                        )}
                      </div>
                      {/* {header.column.getCanFilter() ? (
                          <Filter column={header.column} table={table} />
                        ) : null} */}
                    </div>
                  )}
                </th>
              );
            })}
            <th className="w-[1%] first:rounded-l last:rounded-r">
              {isDataHeaderGroup && (
                <Button onClick={() => alert("???")}>
                  <FiFilter />
                  {t("Filter")}
                </Button>
              )}
            </th>
          </tr>
        );
      })}
      {rowCanExpand && rowExpandComponent && <tr />}
    </thead>
  );
}
