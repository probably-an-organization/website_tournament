import { useState } from "react";
import { useDragControls, motion } from "framer-motion";
import { styled } from "~/utils/stringUtils";

// TODO similar to dnd kit drawer: https://master--5fc05e08a4a65d0021ae0bf2.chromatic.com/?path=/story/examples-drawer-sheet--bottom-sheet

const OFFSET_THRESHOLD = 50;

// export type MenuDrawerProps = {};

export default function MenuDrawer() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const controls = useDragControls();

  // let startDragClientY = 0;

  // const handleDragStart = (event: PointerEvent) => {
  //   controls.start(event, { snapToCursor: false });
  //   startDragClientY = event.clientY;
  // };

  const handleDragEnd = (event: PointerEvent) => {
    const offset = /* startDragClientY - */ event.clientY;
    if (!showMenu && -offset > OFFSET_THRESHOLD) {
      setShowMenu(true);
    } else if (showMenu && offset > OFFSET_THRESHOLD) {
      setShowMenu(false);
    }
  };

  return (
    <>
      <div
        className={styled(
          "pointer-events-none absolute inset-0 h-full w-full bg-blue-200",
          showMenu ? "opacity-100" : "opacity-0"
        )}
      >
        ASDSFGKOASKFOAWDKOAWDKO
      </div>
      <motion.button
        className={styled("fixed top-0 h-12 w-12 bg-green-500")}
        drag="y"
        dragConstraints={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        dragControls={controls}
        dragListener={true}
        onDragEnd={handleDragEnd}
        onClick={() => setShowMenu(!showMenu)}
        layout
      />
    </>
  );
}
