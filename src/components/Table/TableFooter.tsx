"use client";

import type { Table } from "@tanstack/react-table";

import Checkbox from "../Checkbox";

export type TableFooterProps = {
  checkbox: boolean;
  reactTable: Table<any>;
};

export default function TableFooter({
  checkbox,
  reactTable,
}: TableFooterProps) {
  const colSpan =
    (reactTable.getRowModel().rows[0]?.getVisibleCells().length || 0) +
    1 +
    (checkbox ? 1 : 0);

  return (
    <tfoot>
      <tr>
        <td className="w-[1%] px-4 py-2 first:rounded-l last:rounded-r">
          <Checkbox
            checked={reactTable.getIsAllPageRowsSelected()}
            indeterminate={reactTable.getIsSomePageRowsSelected()}
            onChange={reactTable.getToggleAllPageRowsSelectedHandler()}
          />
        </td>
        {checkbox && (
          <td
            className="px-2 py-2 first:rounded-l last:rounded-r"
            colSpan={colSpan}
          >
            Page Rows ({reactTable.getRowModel().rows.length})
          </td>
        )}
      </tr>
    </tfoot>
  );
}
