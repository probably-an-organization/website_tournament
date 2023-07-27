import { useMemo } from "react";
import type { Column, Table } from "@tanstack/react-table";

import NumberFilter from "./NumberFilter";
import StringFilter from "./StringFilter";

type FilterProps = {
  column: Column<any, unknown>;
  table: Table<any>;
};

export default function Filter({ column, table }: FilterProps) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : (Array.from(
            column.getFacetedUniqueValues().keys()
          ).sort() as string[]),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <NumberFilter
      column={column}
      columnFilterValue={columnFilterValue as [number, number]}
    />
  ) : (
    <StringFilter
      column={column}
      columnFilterValue={columnFilterValue as string}
      sortedUniqueValues={sortedUniqueValues}
    />
  );
}
