import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

import { SIDEBAR_LINKS } from "~/constants/SIDEBAR";

const MENU_ANIMATION_VARIANTS = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const GET_SIDEBAR_LINKS = () => {
  if (process.env.NODE_ENV === "production") {
    return SIDEBAR_LINKS.filter((link) => link.production);
  }
  return SIDEBAR_LINKS;
};

type MenuProps = {
  className?: string;
};

export default function Menu({ className }: MenuProps) {
  return (
    <nav>
      <motion.ul className={className} variants={MENU_ANIMATION_VARIANTS}>
        {GET_SIDEBAR_LINKS().map((link, i) => (
          <MenuItem key={`link-${i}`} index={i} link={link} />
        ))}
      </motion.ul>
    </nav>
  );
}
