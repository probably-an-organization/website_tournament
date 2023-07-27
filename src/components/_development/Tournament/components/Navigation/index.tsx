import { FiChevronLeft, FiLock, FiUnlock } from "react-icons/fi";

import { styled } from "~/utils/stringUtils";

export type NavigationProps = {
  children: React.ReactNode;
  expanded: boolean;
  pin: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setPin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navigation(props: NavigationProps) {
  return (
    <>
      {/* TODO CREATE NAV CONTEXT */}
      <NavigationComponent {...props} />
    </>
  );
}

function NavigationComponent({
  children,
  expanded,
  pin,
  setExpanded,
  setPin,
}: NavigationProps) {
  return (
    <div
      className={styled(
        "fixed bottom-0 left-0 top-0 z-20 flex flex-col bg-neutral-100 p-2 shadow transition-width dark:bg-neutral-800 dark:shadow-black",
        expanded ? "w-36" : "w-12"
      )}
    >
      <div className="flex-1">{children}</div>
      <div className="flex w-full justify-between">
        <button
          className={styled(
            "transition-opacityTransform hover:scale-102.5",
            expanded ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          {pin ? (
            <FiLock
              className="stroke-neutral-500 transition-colors hover:stroke-neutral-50"
              onClick={() => setPin(false)}
            />
          ) : (
            <FiUnlock
              className="stroke-neutral-500 transition-colors hover:stroke-neutral-50"
              onClick={() => setPin(true)}
            />
          )}
        </button>
        <button
          className={styled(
            " transition-opacityTransform hover:scale-102.5",
            expanded ? "" : "rotate-180",
            pin ? "pointer-events-none cursor-default opacity-0" : "opacity-100"
          )}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <FiChevronLeft className="stroke-neutral-500 transition-colors hover:stroke-neutral-50" />
        </button>
      </div>
    </div>
  );
}
