import * as React from "react";
import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

export type MenuItemLink = {
  className: string;
  href: string;
  icon: {
    component: React.ReactNode;
    fill: boolean;
    stroke: boolean;
  };
  label: string;
};

const SIDEBAR_LINKS: MenuItemLink[] = [];

const MENU_ANIMATION_VARIANTS = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

type MenuProps = {
  className?: string;
};

export default function Menu({ className }: MenuProps) {
  return (
    <nav>
      <motion.ul className={className} variants={MENU_ANIMATION_VARIANTS}>
        {SIDEBAR_LINKS.map((link, i) => (
          <MenuItem key={`link-${i}`} index={i} link={link} />
        ))}
      </motion.ul>
    </nav>
  );
}
