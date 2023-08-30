"use client";

import { cloneElement, useState } from "react";
import {
  FiChevronLeft,
  FiClipboard,
  FiMonitor,
  FiSettings,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";

import KnockoutDetails from "~src/components/Tournament/Knockout/Details";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import Navigation from "~src/components/Tournament/Navigation";
import NavigationBar from "../Navigation/Bar";
import KnockoutSettings from "./Settings";
import NavigationPage from "../Navigation/Page";

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

export default function TournamentKnockout() {
  const [navigation, setNavigation] = useState<number>(0);
  const [navigationExpanded, setNavigationExpanded] = useState<boolean>(false);
  const [navigationPin, setNavigationPin] = useState<boolean>(false);

  const { redirect, tournament } = useGlobalContext();

  return (
    <Navigation>
      <NavigationBar
        // TODO instead of local state, context @ navigation
        expanded={navigationExpanded}
        pin={navigationPin}
        setExpanded={setNavigationExpanded}
        setPin={setNavigationPin}
      >
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
      </NavigationBar>

      <NavigationPage
        className="flex w-fit min-w-full flex-col gap-3 p-3"
        // TODO instead of local state, context @ navigation
        expanded={navigationExpanded}
        pin={navigationPin}
        onClick={() => {
          if (navigationExpanded && !navigationPin) {
            setNavigationExpanded(false);
          }
        }}
      >
        <div className="relative flex w-full items-center justify-end">
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

        {navigation === 0 && <KnockoutDetails />}
        {navigation === 1 && <KnockoutSettings />}
        {navigation === 2 && <div>Todo</div>}
      </NavigationPage>
    </Navigation>
  );
}
