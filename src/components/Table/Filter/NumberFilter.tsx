import type { Column } from "@tanstack/react-table";
import DebouncedInput from "~/components/DebouncedInput";

// TODO DebouncedInput -> Input -> default styling like border, here we remove border so
// we end up with <input class="(...) border border-0" /> which is not nice.

// TODO add floating label, which hides input first https://play.tailwindcss.com/0bqZmoeIzx

type NumberFilterProps = {
  column: Column<number>;
  columnFilterValue: [number, number];
};

export default function NumberFilter({
  column,
  columnFilterValue,
}: NumberFilterProps) {
  return (
    <div className="box-border flex h-10 rounded border border-gray-300 dark:border-slate-500 dark:bg-slate-700 dark:focus-within:border-slate-200">
      <DebouncedInput
        className="peer order-1 h-full w-full border-0"
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[0] ?? ""}
        onChange={(value) =>
          column.setFilterValue(
            (old: [number, number]) => [value, old?.[1]] as [number, number]
          )
        }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${String(column.getFacetedMinMaxValues()?.[0])})`
            : ""
        }`}
      />
      <DebouncedInput
        className="peer order-3 h-full w-full border-0"
        type="number"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={columnFilterValue?.[1] ?? ""}
        onChange={(value) =>
          column.setFilterValue(
            (old: [number, number]) => [old?.[0], value] as [number, number]
          )
        }
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${String(column.getFacetedMinMaxValues()?.[1])})`
            : ""
        }`}
      />
      <div className="order-2 my-2 w-[1.5px] bg-gray-300 dark:bg-slate-500 dark:peer-focus:bg-slate-200" />
    </div>
  );
}
