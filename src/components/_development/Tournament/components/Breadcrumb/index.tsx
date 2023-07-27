import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { styled } from "~/utils/stringUtils";

export type BreadcrumbItem = {
  disabled?: boolean;
  icon: React.ReactElement;
  label: string;
  onClick(value?: number | string): Promise<void> | void;
  value: number | string;
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
      <div className="flex items-center gap-3">
        {items.map((b, i) => (
          <div className="flex items-center gap-3" key={`breadcrumb-${i}`}>
            <button
              className={styled(
                "flex items-center gap-2 rounded-2xl px-4 py-2 transition-colorsOpacity disabled:cursor-not-allowed",
                active === b.value ? "bg-orange-500" : "",
                hoverValue === b.value
                  ? active === b.value
                    ? ""
                    : "bg-orange-500 bg-opacity-50"
                  : ""
              )}
              disabled={b.disabled}
              onClick={() => b.onClick(b.value)}
              onMouseLeave={() => setHoverValue(null)}
              onMouseOver={() => setHoverValue(b.value)}
            >
              {b.icon}
              <span>{b.label}</span>
            </button>
            {i < items.length - 1 && <FiChevronRight />}
          </div>
        ))}
      </div>
    </div>
  );
}
