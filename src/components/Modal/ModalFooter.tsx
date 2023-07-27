import React from "react";
import { styled } from "~/utils/stringUtils";

export type ModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={styled(
        "flex items-center justify-end rounded-b border-t border-neutral-300 p-3 dark:border-neutral-600",
        className
      )}
    >
      {children}
    </div>
  );
}
