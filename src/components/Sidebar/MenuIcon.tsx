import * as React from "react";
import { motion } from "framer-motion";
import { styled } from "~/utils/stringUtils";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MENU_ICON_BACKGROUND =
  "bg-neutral-100  dark:bg-neutral-700 dark:shadow-black";
const MENU_ICON_COLOR = "stroke-neutral-600 dark:stroke-neutral-200";

export default function MenuIcon() {
  return (
    <div
      className={styled(
        "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow",
        MENU_ICON_BACKGROUND
      )}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <Path
          className={MENU_ICON_COLOR}
          variants={{
            closed: { d: "M 2 2.5 L 18 2.5" },
            open: { d: "M 3 17.5 L 17 2.5" },
          }}
        />
        <Path
          className={MENU_ICON_COLOR}
          d="M 2 10 L 18 10"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          className={MENU_ICON_COLOR}
          variants={{
            closed: { d: "M 2 17.5 L 18 17.5" },
            open: { d: "M 3 2.5 L 17 17.5" },
          }}
        />
      </svg>
    </div>
  );
}
