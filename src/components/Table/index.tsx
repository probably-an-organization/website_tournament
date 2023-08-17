"use client";

import { useState } from "react";
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

import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";

import DebouncedInput from "../DebouncedInput";
import TableNavigation from "./TableNavigation";

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
    <div className={className}>
      <div className="w-full rounded bg-neutral-50 p-3 shadow dark:bg-neutral-800">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
          className="mb-3 w-full"
        />
        <table className="w-full table-auto border-separate border-spacing-y-1">
          <TableHeader
            reactTable={reactTable}
            checkbox={checkbox}
            flexRender={flexRender}
            rowCanExpand={rowCanExpand}
            rowExpandComponent={rowExpandComponent}
          />
          <TableBody
            checkbox={checkbox}
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

        <TableNavigation reactTable={reactTable} />

        {false && <code>{JSON.stringify(reactTable.getState())}</code>}
      </div>
    </div>
  );
}
