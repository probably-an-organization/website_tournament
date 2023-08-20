import type { Table } from "@tanstack/react-table";

import {
  FiSkipBack,
  FiChevronLeft,
  FiChevronRight,
  FiSkipForward,
} from "react-icons/fi";

import { Button } from "@futshi/js_toolbox";
import Select from "../Select";
import Input from "../Input";

export type TableNavigationProps = {
  reactTable: Table<any>;
};

export default function TableNavigation({ reactTable }: TableNavigationProps) {
  return (
    <div className="pt-3">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center gap-2 pb-3 md:justify-start md:pb-0">
          <Button
            onClick={() => reactTable.setPageIndex(0)}
            disabled={!reactTable.getCanPreviousPage()}
          >
            <FiSkipBack />
          </Button>
          <Button
            onClick={() => reactTable.previousPage()}
            disabled={!reactTable.getCanPreviousPage()}
          >
            <FiChevronLeft />
          </Button>
          <div className="flex items-center gap-2">
            <span>Page</span>
            <Input
              type="number"
              value={reactTable.getState().pagination.pageIndex + 1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                reactTable.setPageIndex(page);
              }}
              className="w-16 rounded border p-1"
            />
            <strong>of {reactTable.getPageCount()}</strong>
          </div>
          <Button
            onClick={() => reactTable.nextPage()}
            disabled={!reactTable.getCanNextPage()}
          >
            <FiChevronRight />
          </Button>
          <Button
            onClick={() =>
              reactTable.setPageIndex(reactTable.getPageCount() - 1)
            }
            disabled={!reactTable.getCanNextPage()}
          >
            <FiSkipForward />
          </Button>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <Select
            value={reactTable.getState().pagination.pageSize}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              reactTable.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
