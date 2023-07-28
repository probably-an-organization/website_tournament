import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useWindowSize from "~src/hooks/useDimensions";
import { FiMoon, FiSun } from "react-icons/fi";

import MenuIcon from "./MenuIcon";
import Menu from "./Menu";
import HoverButton from "../HoverButton";
import { useTheme } from "~src/hooks/context/useThemeContext";

const SIDEBAR_ANIMATION_VARIANTS = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 40px 40px)",
    transition: {
      delay: 0.15,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { theme, toggleTheme } = useThemeContext();
  const windowSize = useWindowSize();

  return (
    <>
      <HoverButton
        className="fixed left-3 top-3 z-30"
        onClick={() => setIsOpen((previousIsOpen) => !previousIsOpen)}
        animate={isOpen ? "open" : "closed"}
      >
        <MenuIcon />
      </HoverButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, pointerEvents: "none" }}
            animate={{ opacity: 0.35, pointerEvents: "auto" }}
            exit={{
              opacity: 0,
              pointerEvents: "auto",
              transition: { delay: 0.25 },
            }}
            className="fixed inset-0 z-10 bg-black"
            onClick={() => (isOpen ? setIsOpen(false) : {})}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={windowSize.height}
        variants={SIDEBAR_ANIMATION_VARIANTS}
        className="fixed bottom-0 left-0 top-0 z-20 h-screen w-full overflow-y-auto overflow-x-hidden bg-neutral-50 shadow dark:bg-neutral-900 sm:w-72"
      >
        <div className="flex h-20 items-center justify-end pr-5">
          <HoverButton
            className="flex items-center gap-2 dark:text-gray-50"
            onClick={toggleTheme}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
            <span>{theme === "light" ? "Dark" : "Light"} mode</span>
          </HoverButton>
        </div>

        <Menu className="px-3" />
      </motion.div>
    </>
  );
}
