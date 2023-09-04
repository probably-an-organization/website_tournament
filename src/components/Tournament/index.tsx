"use client";

import { cloneElement, useState } from "react";
import {
  FiChevronLeft,
  FiClipboard,
  FiMonitor,
  FiSettings,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import SideMenu from "~src/components/SideMenu";
import SideMenuBar from "~src/components/SideMenu/Bar";
import SideMenuPage from "~src/components/SideMenu/Page";

import TournamentSettings from "./Settings";
import TournamentDetails from "./Details";

const NAVIGATION_ITEMS: {
  icon: React.ReactElement;
  label: string;
}[] = [
  {
    icon: <FiClipboard />,
    label: "Overview",
  },
  {
    icon: <FiSettings />,
    label: "Settings",
  },
  {
    icon: <FiMonitor />,
    label: "Broadcast",
  },
];

export default function Tournament() {
  const [navigation, setNavigation] = useState<number>(0);

  const { redirect, tournament } = useGlobalContext();

  return (
    <SideMenu>
      <SideMenuBar>
        <ul className="-mx-3 flex flex-col gap-2 overflow-hidden">
          {NAVIGATION_ITEMS.map((n, i) => (
            <li className="float-left flex" key={`navigation-item-${i}`}>
              <button className="flex-1 px-3" onClick={() => setNavigation(i)}>
                <div className="group flex items-center gap-2 px-2 py-1 rounded transition-colors">
                  {cloneElement(n.icon, {
                    className: twMerge(
                      "w-12 -ml-3 transition-colors",
                      navigation === i
                        ? "stroke-neutral-50"
                        : "stroke-neutral-500 group-hover:stroke-neutral-100",
                    ),
                    size: 34,
                  })}
                  <span
                    className={twMerge(
                      "text-sm transition-colors",
                      navigation === i
                        ? "text-neutral-50"
                        : "text-neutral-500 group-hover:text-neutral-100",
                    )}
                  >
                    {n.label}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </SideMenuBar>

      <SideMenuPage className="relative">
        <div className="p-3 flex flex-col gap-3 min-w-full w-fit">
          <div className="flex items-center justify-end">
            <div className="sticky right-3">
              <button
                className="flex items-center gap-1 rounded bg-neutral-500 py-1 pl-1 pr-2 transition-colorsTransform hover:scale-102.5 hover:bg-neutral-400"
                onClick={() =>
                  redirect(tournament.signedIn ? "/dashboard" : "/", {
                    withLoading: true,
                  })
                }
              >
                {tournament.signedIn
                  ? [<FiChevronLeft />, <span>Dashboard</span>]
                  : [<FiChevronLeft />, <span>Sign In</span>]}
              </button>
            </div>
          </div>

          {navigation === 0 && <TournamentDetails />}
          {navigation === 1 && <TournamentSettings />}
          {navigation === 2 && <div>Todo</div>}
        </div>
      </SideMenuPage>
    </SideMenu>
  );
}
