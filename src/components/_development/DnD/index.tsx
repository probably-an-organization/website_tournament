import { useState } from "react";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MouseSensor,
  closestCorners,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import type { SortableContainerProps } from "./SortableContainer";
import { OverlayContainer, SortableContainer } from "./SortableContainer";
import { OverlayItem, SortableItem } from "./SortableItem";

export type Item = {
  id: string;
  name: string;
};

export const initialItems = [
  {
    id: "unsorted",
    name: "Unsorted",
    items: [
      {
        id: "item0",
        name: "Item 0",
      },
    ],
  },
  {
    id: "containerA",
    name: "Container A",
    items: [
      {
        id: "item1",
        name: "Item 1",
      },
      {
        id: "item2",
        name: "Item 2",
      },
      {
        id: "item3",
        name: "Item 3",
      },
    ],
  },
  {
    id: "containerB",
    name: "Container B",
    items: [
      {
        id: "item4",
        name: "Item 4",
      },
      {
        id: "item5",
        name: "Item 5",
      },
      {
        id: "item6",
        name: "Item 6",
      },
    ],
  },
];

export default function DnD() {
  const [sortables, setSortables] = useState<SortableContainerProps[]>([
    ...initialItems,
  ]);

  //The state of the active draggable, used to render the drag overlay below
  const [activeItem, setActiveItem] = useState<
    SortableContainerProps | Item | null
  >(null);
  //Sensors are an abstraction to detect different input methods in
  //order to initiate drag operations, respond to movement and end or
  //cancel the operation. See more here: https://docs.dndkit.com/api-documentation/sensors
  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const containerIds = sortables.map((s) => s.id);

  const unsortedContainer = sortables.find((s) => s.id === "unsorted");

  return (
    <DndContext
      //collision detection algorithm best suited for sortable interfaces and multiple containers
      //read more here: https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      {unsortedContainer && (
        <div className="flex w-full items-center justify-center">
          <div className="mb-8 min-h-28 w-48 rounded bg-neutral-400 p-4">
            {unsortedContainer.items.map((item) => (
              <SortableItem
                key={`sortable-${item.id}`}
                id={item.id}
                name={item.name}
              />
            ))}
          </div>
        </div>
      )}
      <SortableContext
        //read more on the SortableContext here https://docs.dndkit.com/presets/sortable/sortable-context
        items={sortables}
        strategy={rectSortingStrategy}
      >
        <div className="flex w-full items-start justify-center gap-4">
          {sortables
            .filter((s) => s.id !== "unsorted")
            .map((s) => (
              <SortableContainer
                key={s.id}
                id={s.id}
                name={s.name}
                items={s.items}
              />
            ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          //Render a drag overlay for either the container or sortable item based on the id of the active item
          // check here https://docs.dndkit.com/api-documentation/draggable/drag-overlay for more info
          <>
            {containerIds.includes(activeItem.id) ? (
              <OverlayContainer {...(activeItem as SortableContainerProps)} />
            ) : (
              <OverlayItem {...(activeItem as Item)} />
            )}
          </>
        ) : null}
      </DragOverlay>
    </DndContext>
  );

  //Returns the id of a container based on the id of any of its child items
  function findContainer(id?: string) {
    if (id) {
      if (containerIds.includes(id)) return id;
      const container = sortables?.find((i) =>
        i.items?.find((l) => l?.id === id)
      );

      return container?.id;
    }
  }

  /*Returns true if we are sorting containers
   * we will know if we are sorting containers if the id of the active item is a
   * container id and it is being dragged over any item in the over container
   * or the over container itself
   */
  function isSortingContainers({
    activeId,
    overId,
  }: {
    activeId: string;
    overId: string;
  }) {
    const isActiveContainer = containerIds.includes(activeId);
    const isOverContainer =
      findContainer(overId) || containerIds.includes(overId);
    return !!isActiveContainer && !!isOverContainer;
  }

  function handleDragStart({ active }: DragStartEvent) {
    const activeId = active.id as string;

    if (containerIds.includes(activeId)) {
      //set the state of active item if we are dragging a container
      const container = sortables.find((i) => i.id === activeId);
      if (container) setActiveItem(container);
    } else {
      //set the state of active item if we are dragging a container item
      const containerId = findContainer(activeId);
      const container = sortables.find((i) => i.id === containerId);
      const item = container?.items.find((i) => i.id === activeId);
      if (item) setActiveItem(item);
    }
  }

  /*In this function we handle when a sortable item is dragged from one container 
  to another container, to do this we need to know:
   - what item is being dragged 
   - what container it is being dragged from
   - what container it is being dragged to
   - what index to insert the active item into, in the new container
   */
  function handleDragOver({ active, over }: DragOverEvent) {
    if (!active || !over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    //find the container id of the active item and the container id of the item being dragged over
    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);
    if (!overContainerId || !activeContainerId) return;

    //we don't want to sort containers, so we return early if we are sorting containers
    if (isSortingContainers({ activeId, overId })) return;

    //we only want to update the state if we are dragging over a different container
    if (activeContainerId !== overContainerId) {
      const activeContainer = sortables.find((i) => i.id === activeContainerId);
      const overContainer = sortables.find((i) => i.id === overContainerId);
      const activeItems = activeContainer?.items || [];
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overItems = overContainer?.items || [];
      const overIndex = overItems.findIndex((i) => i.id === overId);
      let newIndex: number;
      if (containerIds.includes(overId)) {
        //if the container is empty, and we drag over it, the overId would be the id of that container and not
        //the id of any of its items since it is empty so we want to add the item to the end of
        //the container basically making it the last item
        newIndex = overItems.length + 1;
      } else {
        //Get the new index of the item being dragged over if it is a sortable item in the over container
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      //Update the state
      const newItems = sortables.map((item) =>
        // Remove the active item from the old list
        item.id === activeContainerId
          ? {
              ...item,
              items: activeItems.filter((item) => item.id !== active.id),
            }
          : // Add the active item to the new list
          item.id === overContainerId
          ? {
              ...item,
              items: [
                ...item.items.slice(0, newIndex),
                activeItems[activeIndex],
                ...overItems.slice(newIndex, item.items.length),
              ],
            }
          : item
      ) as SortableContainerProps[];

      setSortables(newItems);
    }
  }

  /*In this function we handle when a sortable item is sorted within its container
    or when a sortable container is sorted with other sortable container
   */
  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!active || !over) return;
    const activeId = active.id as string;
    const overId = over.id as string;
    const activeContainerId = findContainer(activeId);
    const overContainerId = findContainer(overId);

    if (isSortingContainers({ activeId, overId })) {
      if (activeId !== overId) {
        //update sortable containers to their new positions
        setSortables((items) => {
          const oldIndex = sortables.findIndex(
            (f) => f.id === activeContainerId
          );
          const newIndex = sortables.findIndex((f) => f.id === overContainerId);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }

    if (activeContainerId === overContainerId) {
      const activeContainer = sortables.find((i) => i.id === activeContainerId);
      const activeItems = activeContainer?.items || [];
      const oldIndex = activeItems.findIndex((i) => i.id === activeId);
      const newIndex = activeItems.findIndex((i) => i.id === overId);
      //update sortable items to their new positions
      const newItems = sortables.map((s) =>
        s.id === activeContainerId
          ? {
              ...s,
              items: arrayMove(s.items, oldIndex, newIndex),
            }
          : s
      );

      // TODO IF SORTABLE ITEM WITHIN NO CONTAINER, PUT INTO UNSORTED CONTAINER

      if (oldIndex !== newIndex) {
        setSortables(newItems);
      }
    }
  }
}
