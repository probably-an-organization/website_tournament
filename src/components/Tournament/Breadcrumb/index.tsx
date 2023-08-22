import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";

import { twMerge } from "tailwind-merge";
import useWindowSize from "~src/hooks/useDimensions";

export type BreadcrumbItem = {
  disabled?: boolean;
  icon: React.ReactElement;
  label: string;
  onClick(value?: number | string): Promise<void> | void;
};

type BreadcrumbProps = {
  active: number;
  className?: string;
  items: BreadcrumbItem[];
};

export default function Breadcrumb({
  className,
  items,
  active,
}: BreadcrumbProps) {
  const [backgroundRight, setBackgroundRight] = useState<number>();

  const breadcrumbRefs = useRef<HTMLDivElement[]>([]);

  const size = useWindowSize();

  useEffect(() => {
    let px = 0;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const divWidth = breadcrumbRefs.current[i]!.clientWidth;
      total += divWidth;
      if (i <= active) {
        px += divWidth;
      }
    }
    setBackgroundRight(total - px);
  }, [active, items, size]);

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute left-0 top-0 z-0 bottom-0 bg-orange-500 rounded"
          animate={{ right: backgroundRight }}
        />
        {items.map((b, i) => (
          <div
            className="z-10 flex items-center"
            key={`breadcrumb-${i}`}
            ref={(element: HTMLDivElement) => {
              breadcrumbRefs.current[i] = element;
            }}
          >
            {/* i !== 0 && i < items.length - 1 && <FiChevronRight /> */}
            <button
              className={twMerge(
                "flex items-center gap-2 rounded border border-transparent transition-colorsTransform",
                i === active
                  ? "dark:text-neutral-100"
                  : i > active
                  ? "dark:text-neutral-300 scale-75 hover:scale-100"
                  : "dark:text-neutral-200 scale-75 hover:scale-100 hover:text-neutral-100",
              )}
              disabled={b.disabled || active === i}
              onClick={() => b.onClick(i)}
              // onMouseOut={() => setHoverValue(null)}
              // onMouseOver={() => setHoverValue(i)}
            >
              <div className="flex items-center gap-2 rounded px-4 py-2">
                {b.icon}
                <span className="hidden md:block">{b.label}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
