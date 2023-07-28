"use client";

import { useRouter } from "next/router";
import { motion } from "framer-motion";

import type { SidebarLink } from "~src/constants/SIDEBAR";
import { styled } from "~src/utils/stringUtils";
import Link from "next/link";

const MENU_ITEM_ANIMATION_VARIANTS = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

type MenuItemProps = {
  index: number;
  link: SidebarLink;
};

export default function MenuItem({ link }: MenuItemProps) {
  const router = useRouter();
  return (
    <motion.li
      className={styled(
        "group mb-5 cursor-pointer list-none",
        router.asPath === link.href ? "pointer-events-none" : "",
      )}
      variants={MENU_ITEM_ANIMATION_VARIANTS}
      whileHover={{ x: 5 /* scale: 1.025 */ }}
      whileTap={{ x: 15 /* scale: 0.975 */ }}
    >
      <Link
        href={link.href}
        className={styled("flex items-center", link.className)}
      >
        <div
          className={styled(
            "mr-5 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
            router.asPath === link.href
              ? styled(
                  "border-neutral-900 dark:border-neutral-50",
                  link.icon?.fill
                    ? "[&>svg]:fill-neutral-900 dark:[&>svg]:fill-neutral-50"
                    : "",
                  link.icon?.stroke
                    ? "[&>svg]:stroke-neutral-900 dark:[&>svg]:stroke-neutral-50"
                    : "",
                )
              : styled(
                  "border-neutral-600 group-hover:border-neutral-900",
                  "dark:border-neutral-400 dark:group-hover:border-neutral-50",
                  link.icon?.fill
                    ? styled(
                        "[&>svg]:fill-neutral-600 [&>svg]:group-hover:fill-neutral-900",
                        "dark:[&>svg]:fill-neutral-400 dark:[&>svg]:group-hover:fill-neutral-50",
                      )
                    : "",
                  link.icon?.stroke
                    ? styled(
                        "[&>svg]:stroke-neutral-600 [&>svg]:group-hover:stroke-neutral-900",
                        "dark:[&>svg]:stroke-neutral-400 dark:[&>svg]:group-hover:stroke-neutral-50",
                      )
                    : "",
                ),
          )}
        >
          {link.icon?.component}
        </div>
        <span
          className={styled(
            "w-48 flex-1",
            router.asPath === link.href
              ? "text-neutral-900 dark:text-neutral-50"
              : "text-neutral-600 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-50",
          )}
        >
          {link.label}
        </span>
      </Link>
    </motion.li>
  );
}
