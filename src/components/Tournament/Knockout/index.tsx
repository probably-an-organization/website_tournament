"use client";

import { cloneElement, useState } from "react";
import {
  FiChevronLeft,
  FiClipboard,
  FiMonitor,
  FiSettings,
} from "react-icons/fi";

import { Card } from "@futshi/js_toolbox";
import KnockoutDetails from "~src/components/Tournament/Knockout/Details";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import Navigation from "~src/components/Tournament/Navigation";
import NavigationPage from "~src/components/Tournament/Navigation/Page";
import { twMerge } from "tailwind-merge"import KnockoutSettings from "./Settings";

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
    <NavigationPage expanded={navigationExpanded} pin={navigationPin}>
      <Navigation
        expanded={navigationExpanded}
        pin={navigationPin}
        setExpanded={setNavigationExpanded}
        setPin={setNavigationPin}
      >
        <ul className="-mx-2 flex flex-col gap-2 overflow-hidden">
          {NAVIGATION_ITEMS.map((n, i) => (
            <li className="float-left flex" key={`navigation-item-${i}`}>
              <button className="flex-1 px-2" onClick={() => setNavigation(i)}>
                <div
                  className={twMerge(
                    "group flex items-center gap-2 rounded transition-colors",
                    navigation === i ? "bg-neutral-50" : "hover:bg-neutral-600",
                  )}
                >
                  {cloneElement(n.icon, {
                    className: twMerge(
                      "w-8 pl-1",
                      navigation === i
                        ? "stroke-neutral-800"
                        : "stroke-neutral-50",
                    ),
                    size: 36,
                  })}
                  <span
                    className={twMerge(
                      "text-sm",
                      navigation === i ? "text-neutral-800" : "",
                    )}
                  >
                    {n.label}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Navigation>

      <div className="mx-auto flex w-fit min-w-full flex-col gap-3 p-3">
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

        <Card className="w-fit min-w-full p-3">
          {navigation === 0 && <KnockoutDetails />}
          {navigation === 1 && <KnockoutSettings />}
          {navigation === 2 && <div>Todo</div>}
        </Card>
      </div>
    </NavigationPage>
  );
}
