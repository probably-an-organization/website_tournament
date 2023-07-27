import { useRef, useState, useEffect } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { SortableItem, OverlayItem } from "./SortableItem";
import type { Item } from ".";

export type SortableContainerProps = {
  id: string;
  name?: string;
  items: Item[];
};

export function SortableContainer({ name, id, items }: SortableContainerProps) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.clientHeight);
    }
  }, [items]);

  const containerRef = useRef<HTMLDivElement>(null);

  //Read more about the useSortable hook here: https://docs.dndkit.com/presets/sortable/usesortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: { name, type: "container" },
  });

  const dndStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...dndStyle }}
      className="min-w-48 rounded bg-neutral-200 shadow dark:bg-neutral-800"
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab border-b border-b-neutral-300 p-2 dark:border-b-neutral-600"
      >
        {name}
      </div>
      <div
        className="overflow-hidden transition-height"
        style={{ height: height }}
      >
        <div
          ref={containerRef}
          className="flex w-full flex-col items-center gap-4 p-4"
        >
          {items.length === 0 ? (
            <div key={id} className="droppable">
              List is empty
            </div>
          ) : (
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((s) => (
                <SortableItem
                  {...s}
                  className="w-full"
                  key={s.id}
                  onRemove={() =>
                    alert(`TODO remove ${s.id} from container ${id}`)
                  }
                />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </div>
  );
}

export function OverlayContainer({ name, id, items }: SortableContainerProps) {
  return (
    <div className="min-w-48 rounded bg-neutral-200 shadow dark:bg-neutral-800">
      <div>
        <div className="cursor-grabbing border-b border-b-neutral-300 p-2 dark:border-b-neutral-600">
          {name}
        </div>

        <div className="flex w-full flex-col items-center gap-4 p-4">
          {items.length === 0 ? (
            <div key={id} className="droppable">
              List is empty
            </div>
          ) : null}
          {items.map((s) => (
            <OverlayItem className="w-full" {...s} key={s.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
