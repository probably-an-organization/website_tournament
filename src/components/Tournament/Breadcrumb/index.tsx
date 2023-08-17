import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { twMerge } from "tailwind-merge";
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
  const [hoverValue, setHoverValue] = useState<number | string | null>(null);

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-3">
        {items.map((b, i) => (
          <div className="flex items-center gap-2" key={`breadcrumb-${i}`}>
            <button
              className={twMerge(
                "flex items-center gap-2 rounded-2xl transition-colorsOpacity disabled:cursor-not-allowed",
                active >= i ? "bg-orange-500" : "",
                hoverValue === i
                  ? active >= i
                    ? ""
                    : "bg-orange-500 bg-opacity-50"
                  : "",
              )}
              disabled={b.disabled}
              onClick={() => b.onClick(i)}
              onMouseOut={() => setHoverValue(null)}
              onMouseOver={() => setHoverValue(i)}
            >
              <div className="flex items-center gap-2 rounded px-4 py-2">
                {b.icon}
                <span className="hidden md:block">{b.label}</span>
              </div>
            </button>
            {i < items.length - 1 && <FiChevronRight />}
          </div>
        ))}
      </div>
    </div>
  );
}
