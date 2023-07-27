import type { Column } from "@tanstack/react-table";
import DebouncedInput from "~/components/DebouncedInput";

// TODO add floating label, which hides input first https://play.tailwindcss.com/0bqZmoeIzx

type StringFilterProps = {
  column: Column<string>;
  columnFilterValue: string;
  sortedUniqueValues: string[];
};

export default function StringFilter({
  column,
  columnFilterValue,
  sortedUniqueValues,
}: StringFilterProps) {
  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: string) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        className="w-full"
        type="text"
        value={columnFilterValue ?? ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        list={column.id + "list"}
      />
    </>
  );
}
