"use client";

import { cloneElement, useState } from "react";
import {
  FiChevronLeft,
  FiClipboard,
  FiCodesandbox,
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
import TournamentTest from "./Test";
import TournamentBroadcast from "./Broadcast";

enum Navigation {
  Overview = "Navigation.Overview",
  Settings = "Navigation.Settings",
  Broadcast = "Navigation.Broadcast",
  Test = "Navigation.Test",
}

const NAVIGATION_ITEMS: {
  [key in Navigation]?: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  [Navigation.Overview]: {
    icon: <FiClipboard />,
    label: "Overview",
  },
  [Navigation.Settings]: {
    icon: <FiSettings />,
    label: "Settings",
  },
  [Navigation.Broadcast]: {
    icon: <FiMonitor />,
    label: "Broadcast",
  },
  [Navigation.Test]: {
    icon: <FiCodesandbox />,
    label: "Test",
  },
};

export default function Tournament() {
  const [navigation, setNavigation] = useState<Navigation>(Navigation.Overview);

  const { redirect, tournament } = useGlobalContext();

  return (
    <SideMenu>
      <SideMenuBar>
        <ul className="-mx-3 flex flex-col gap-2 overflow-hidden">
          {Object.entries(NAVIGATION_ITEMS).map(([key, value], i) => (
            <li className="float-left flex" key={`navigation-item-${i}`}>
              <button
                className="flex-1 px-3"
                onClick={() => setNavigation(key as Navigation)}
              >
                <div className="group flex items-center gap-2 px-2 py-1 rounded transition-colors">
                  {cloneElement(value.icon, {
                    className: twMerge(
                      "w-12 -ml-3 transition-colors",
                      navigation === key
                        ? "stroke-neutral-50"
                        : "stroke-neutral-500 group-hover:stroke-neutral-100",
                    ),
                    size: 34,
                  })}
                  <span
                    className={twMerge(
                      "text-sm transition-colors",
                      navigation === key
                        ? "text-neutral-50"
                        : "text-neutral-500 group-hover:text-neutral-100",
                    )}
                  >
                    {value.label}
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

          {navigation === Navigation.Overview && <TournamentDetails />}
          {navigation === Navigation.Settings && <TournamentSettings />}
          {navigation === Navigation.Broadcast && <TournamentBroadcast />}
          {navigation === Navigation.Test && <TournamentTest />}
        </div>
      </SideMenuPage>
    </SideMenu>
  );
}
