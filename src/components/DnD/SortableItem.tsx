import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FiMoreHorizontal, FiX } from "react-icons/fi";

import { twMerge } from "tailwind-merge";

type SortableItemProps = {
  className?: string;
  id: string;
  name?: string;
  onRemove?(id: string): void;
};

export function SortableItem({
  className,
  id,
  name,
  onRemove,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name, type: "item" },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className={twMerge(
        "flex items-center justify-between gap-2 rounded bg-neutral-300 p-2 shadow dark:bg-neutral-600",
        className,
      )}
    >
      <FiMoreHorizontal
        className="cursor-grab transition-colors hover:text-white"
        {...listeners}
        {...attributes}
      />
      <span>{name}</span>
      {onRemove && (
        <button
          className="transition-colors hover:text-red-500"
          onClick={() => onRemove(id)}
        >
          <FiX />
        </button>
      )}
    </div>
  );
}

export function OverlayItem({ className, name }: SortableItemProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-2 rounded bg-neutral-300 p-2 shadow dark:bg-neutral-600",
        className,
      )}
    >
      <FiMoreHorizontal className="cursor-grabbing opacity-50" />
      <span>{name}</span>
      <FiX className="opacity-50" />
    </div>
  );
}
