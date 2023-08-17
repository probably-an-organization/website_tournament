import React from "react";
import { twMerge } from "tailwind-merge";
export type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-end rounded-b border-t border-neutral-300 p-3 dark:border-neutral-600",
        className,
      )}
    >
      {children}
    </div>
  );
}
