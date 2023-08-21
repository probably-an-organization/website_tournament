import { twMerge } from "tailwind-merge";

import { Card } from "@futshi/js_toolbox";
import { createElement } from "react";

type ActionListItem = {
  title: string;
  description?: string;
  onClick?(): void;
  actionComponent?: React.ReactElement;
};

type ActionListProps = {
  className?: string;
  items: ActionListItem[];
};

export default function ActionList({ className, items }: ActionListProps) {
  return (
    <Card className={twMerge("overflow-hidden p-0 flex flex-col", className)}>
      {items.map((item, i) =>
        createElement(
          item.onClick ? "button" : "div",
          {
            className: twMerge(
              "border-b dark:border-b-neutral-700 last:border-b-0 p-3 items-center w-full flex justify-between",
              item.onClick ? "transition-colors hover:bg-neutral-800" : "",
            ),
            key: i,
            onClick: item.onClick,
          },
          <>
            <div className="flex flex-col items-start">
              <span>{item.title}</span>
              <span className="text-sm text-neutral-400">
                {item.description}
              </span>
            </div>
            {item.actionComponent}
          </>,
        ),
      )}
    </Card>
  );
}
