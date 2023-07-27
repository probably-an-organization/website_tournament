import { motion } from "framer-motion";
import { styled } from "~/utils/stringUtils";

type HoverButtonProps = {
  animate?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?(): Promise<void> | void;
  scale?: number;
};

export default function HoverButton({
  animate,
  children,
  className = "flex items-center justify-center",
  disabled,
  onClick,
  scale = 1.125,
}: HoverButtonProps) {
  return (
    <motion.button
      animate={animate}
      className={styled(
        disabled ? "pointer-events-none" : "pointer-events-auto",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: scale }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
