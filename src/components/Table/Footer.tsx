"use client";

import type { Table } from "@tanstack/react-table";

import { Checkbox } from "@futshi/js_toolbox";

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
    <tfoot className="dark:bg-neutral-900">
      <tr>
        {checkbox && (
          <>
            <td className="w-[1%] first:rounded-l last:rounded-r">
              <div className="flex items-center justify-center">
                <Checkbox
                  checked={reactTable.getIsAllPageRowsSelected()}
                  indeterminate={reactTable.getIsSomePageRowsSelected()}
                  onChange={reactTable.getToggleAllPageRowsSelectedHandler()}
                />
              </div>
            </td>
            <td
              className="py-2 first:rounded-l last:rounded-r"
              colSpan={colSpan}
            >
              <span className="text-sm italic text-neutral-500">
                {reactTable.getRowModel().rows.length} Page Entries
              </span>
            </td>
          </>
        )}
      </tr>
    </tfoot>
  );
}
