import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

import { styled } from "~/utils/stringUtils";

type ModalProps = {
  backdrop?: "static" | "default";
  children: React.ReactNode;
  className?: string;
  onClose?(): void;
  show: boolean;
};

export default function Modal({
  backdrop = "static",
  children = <div>children</div>,
  className,
  onClose,
  show = false,
}: ModalProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!mounted && typeof window !== undefined) {
      setMounted(true);
    }
  }, []);

  return mounted
    ? createPortal(
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styled(
                "fixed inset-0 z-30 flex items-center justify-center overflow-y-auto outline-none transition-opacity focus:outline-none",
                className
              )}
            >
              <div
                className="fixed inset-0 bg-black opacity-75"
                onClick={() => {
                  if (onClose && backdrop !== "static") {
                    onClose();
                  }
                }}
              />
              <div className="relative mx-auto w-full max-w-3xl">
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-neutral-200 shadow-lg outline-none focus:outline-none dark:bg-neutral-900">
                  {children}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;
}
