"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "@futshi/js_toolbox";
import { FiFilter } from "react-icons/fi";

import type {
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  sortingFns,
  flexRender,
  // Row,
} from "@tanstack/react-table";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem, compareItems } from "@tanstack/match-sorter-utils";

import DebouncedInput from "~src/components/DebouncedInput";

import TableHeader from "./Header";
import TableFooter from "./Footer";
import TableBody from "./Body";
import TableNavigation from "./Navigation";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), String(value));

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  const rowMetaA = rowA.columnFiltersMeta?.[columnId];
  const rowMetaB = rowB.columnFiltersMeta?.[columnId];
  if (rowMetaA && rowMetaB) {
    dir = compareItems(rowMetaA.itemRank, rowMetaB.itemRank);
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export type TableProps<T> = {
  checkbox?: boolean;
  className?: string;
  columns: ColumnDef<T>[];
  data: T[];
  rowCanExpand?(row: T): boolean;
  rowCanSelect?(row: T): boolean;
  rowExpandComponent?(row: T): React.ReactNode;
};

export default function Table<T extends { id?: any }>({
  checkbox = false,
  className,
  columns,
  data,
  rowCanExpand = () => false,
  rowCanSelect = () => checkbox,
  rowExpandComponent,
}: TableProps<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // const rerender = useReducer(() => ({}), {})[1];

  // const { t } = useTranslation("table");

  const reactTable = useReactTable({
    autoResetPageIndex: false,
    columns: columns,
    data: data,
    enableRowSelection: rowCanSelect
      ? (row) => rowCanSelect(row.original)
      : checkbox,
    debugColumns: false,
    debugHeaders: false,
    debugTable: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: (row) => rowCanExpand(row.original),
    getRowId: (row: T) => row?.id as string,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    manualPagination: false,
    manualSorting: false,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      globalFilter,
      pagination,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className={twMerge("w-full", className)}>
      <div className="sticky flex gap-3 left-0 max-w-full pb-4">
        <DebouncedInput
          value={globalFilter}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
          className="flex-1"
        />
        <Button className="flex-shrink-0">
          <FiFilter />
          Filter
        </Button>
      </div>
      <div className="min-w-fit w-full max-w-full overflow-auto">
        <table className="table-auto border-separate border-spacing-y-1">
          <TableHeader
            reactTable={reactTable}
            checkbox={checkbox}
            flexRender={flexRender}
            rowCanExpand={rowCanExpand}
            rowExpandComponent={rowExpandComponent}
          />
          <TableBody
            checkbox={checkbox}
            className="overflow-x-scroll"
            columnFilters={columnFilters}
            rowExpandComponent={rowExpandComponent}
            flexRender={flexRender}
            globalFilter={globalFilter}
            pagination={pagination}
            reactTable={reactTable}
            rowCanSelect={rowCanSelect}
            sorting={sorting}
          />
          <TableFooter checkbox={checkbox} reactTable={reactTable} />
        </table>
      </div>

      <TableNavigation className="sticky left-0" reactTable={reactTable} />
    </div>
  );
}
