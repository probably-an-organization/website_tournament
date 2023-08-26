"use client";

import { Fragment, useState, useEffect } from "react";
import type {
  CellContext,
  ColumnDefTemplate,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  Table,
} from "@tanstack/react-table";

import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

import { Checkbox } from "@futshi/js_toolbox";
import { twMerge } from "tailwind-merge";

export type TableBodyProps<T> = {
  checkbox: boolean;
  className?: string;
  columnFilters: ColumnFiltersState;
  flexRender: (
    header: ColumnDefTemplate<CellContext<any, unknown>> | undefined,
    headerContext: CellContext<any, unknown>,
  ) => React.ReactNode;
  globalFilter: string;
  pagination: PaginationState;
  reactTable: Table<any>;
  rowCanSelect(row: T): boolean;
  rowExpandComponent?(row: T): React.ReactNode;
  sorting: SortingState;
};

export default function TableBody<T>({
  checkbox,
  className,
  columnFilters,
  flexRender,
  globalFilter,
  pagination,
  reactTable,
  rowCanSelect = () => checkbox,
  rowExpandComponent,
  sorting,
}: TableBodyProps<T>) {
  const [rowCount, setRowCount] = useState<number>(0);
  const [rows, setRows] = useState<Row<T>[]>([]);

  useEffect(() => {
    setRowCount(pagination.pageSize);
  }, [pagination.pageSize]);

  useEffect(() => {
    setRows(reactTable.getRowModel().rows);
  }, [pagination, sorting, globalFilter, columnFilters]);

  return (
    <tbody
      className={twMerge(
        "border-b border-b-neutral-300 transition-height dark:border-b-neutral-600",
        className,
      )}
    >
      {Array.from({ length: rowCount }).map((_, index) => {
        const rowData = rows[index];
        return (
          <Fragment key={index}>
            <tr
              className={twMerge(
                "h-14 rounded dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-700",
                rowData ? "shadow" : "",
                rowData?.getCanExpand()
                  ? "cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors"
                  : "",
              )}
              onClick={() =>
                rowData?.getCanExpand() ? rowData.toggleExpanded() : {}
              }
            >
              {rowData && (
                <>
                  {rowCanSelect(rowData.original) && (
                    <td className="first:rounded-l last:rounded-r">
                      <div className="align-center flex justify-center">
                        <Checkbox
                          checked={rowData.getIsSelected()}
                          disabled={!rowData.getCanSelect()}
                          indeterminate={rowData.getIsSomeSelected()}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={() => rowData.toggleSelected()}
                        />
                      </div>
                    </td>
                  )}
                  {rowData.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-2 first:rounded-l last:rounded-r"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                  <td className="px-4 first:rounded-l last:rounded-r">
                    {rowData.getCanExpand() && (
                      <div className="flex items-center justify-end">
                        <FiChevronDown
                          className={twMerge(
                            "transition-transform duration-200",
                            rowData.getIsExpanded() ? " rotate-180" : "",
                          )}
                        />
                      </div>
                    )}
                  </td>
                </>
              )}
            </tr>
            <tr className={rowData ? "opacity-100" : "opacity-0"}>
              {/* 2nd row is a custom 1 cell row */}
              <AnimatePresence>
                {rowData?.getIsExpanded() && (
                  <td
                    className="p-0"
                    colSpan={
                      rowData.getVisibleCells().length + 1 + (checkbox ? 1 : 0)
                    }
                  >
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{
                        height: { duration: 0.2, ease: "easeIn" },
                      }}
                      //layout
                    >
                      <div className="p-2">
                        {rowExpandComponent &&
                          rowExpandComponent(rowData.original)}
                      </div>
                    </motion.div>
                  </td>
                )}
              </AnimatePresence>
            </tr>
          </Fragment>
        );
      })}
    </tbody>
  );
}
