import { FiChevronLeft, FiLock, FiUnlock } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useSideMenuContext } from ".";

export type SideMenuBarProps = {
  children: React.ReactNode;
};

export default function SideMenuBar({ children }: SideMenuBarProps) {
  const { expanded, pin, setExpanded, setPin } = useSideMenuContext();

  return (
    <div
      className={twMerge(
        "fixed bottom-0 left-0 top-0 z-20 flex flex-col bg-neutral-100 p-3 transition-width dark:bg-neutral-900 shadow dark:shadow-black",
        expanded ? "w-40" : "w-16",
      )}
    >
      <div className="flex-1">{children}</div>
      <div className="flex w-full justify-between">
        <button
          className={twMerge(
            "transition-opacityTransform hover:scale-102.5",
            expanded ? "opacity-100" : "pointer-events-none opacity-0",
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
          className={twMerge(
            " transition-opacityTransform hover:scale-102.5",
            expanded ? "" : "rotate-180",
            pin
              ? "pointer-events-none cursor-default opacity-0"
              : "opacity-100",
          )}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <FiChevronLeft className="stroke-neutral-500 transition-colors hover:stroke-neutral-50" />
        </button>
      </div>
    </div>
  );
}
