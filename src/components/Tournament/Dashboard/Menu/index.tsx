import { useState } from "react";
import { FiBell, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

import DashboardMenuButton from "./MenuButton";
import {
  DASHBOARD_MENU,
  DASHBOARD_USER_MENU,
  DashboardSection,
} from "~src/constants/tournament/DASHBOARD";
import useAxios from "~src/hooks/useAxios";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~src/components/Popover";
import { twMerge } from "tailwind-merge";

export default function DashboardMenu() {
  const [menuDropdown, setMenuDropdown] = useState<boolean>(false);
  const [notificationDropdown, setNotificationDropdown] =
    useState<boolean>(false);
  const [userDropdown, setUserDropdown] = useState<boolean>(false);

  const { redirect, setTournament, tournament } = useGlobalContext();

  const { section, setSection } = useDashboardContext();
  const { get } = useAxios();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      const { status } = await get("/logout", {
        withCredentials: true,
      });
      if (status === 200) {
        setTournament((prev) => ({ ...prev, signedIn: false }));
        redirect("/", { withLoading: true });
      }
    }
  };

  return (
    <div className="z-10 min-w-fit bg-neutral-800 shadow flex justify-center">
      <div className="flex w-full h-full max-w-5xl justify-between gap-2 p-2">
        <ul className="hidden md:flex gap-2">
          {Object.entries(DASHBOARD_MENU).map(([key, value], i) => (
            <li key={`dashboard-nav-${i}`}>
              <DashboardMenuButton
                disabled={section === key}
                onClick={() => setSection(key as DashboardSection)}
              >
                {value.icon}
                {value.label}
              </DashboardMenuButton>
            </li>
          ))}
        </ul>
        <div className="block md:hidden">
          <Popover open={menuDropdown} onOpenChange={setMenuDropdown}>
            <PopoverTrigger
              className="p-2 transition-colors dark:bg-neutral-900 dark:hover:bg-neutral-700 rounded flex items-center gap-2"
              onClick={() => setMenuDropdown((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {{ ...DASHBOARD_MENU, ...DASHBOARD_USER_MENU }[section]!.icon}
                {{ ...DASHBOARD_MENU, ...DASHBOARD_USER_MENU }[section]!.label}
                <FiChevronDown
                  className={twMerge(
                    "transition-transform",
                    menuDropdown ? "-rotate-180" : "",
                  )}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="z-30 block md:hidden w-40 shadow bg-neutral-900 rounded">
              <ul>
                {Object.entries(DASHBOARD_MENU).map(([key, value], i) => (
                  <li key={`dashboard-mobile-nav-${i}`}>
                    <DashboardMenuButton
                      className="w-full disabled:opacity-25"
                      disabled={section === key}
                      onClick={() => {
                        setMenuDropdown(false);
                        setSection(key as DashboardSection);
                      }}
                    >
                      {value.icon}
                      {value.label}
                    </DashboardMenuButton>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-2 items-center">
          <Popover
            open={notificationDropdown}
            onOpenChange={setNotificationDropdown}
          >
            <PopoverTrigger
              className="p-2 h-full relative transition-colors hover:bg-neutral-700 rounded flex items-center gap-2"
              onClick={() => setNotificationDropdown((prev) => !prev)}
            >
              <FiBell />
              <div className="border dark:border-neutral-800 absolute pointer-events-none text-[8px] aspect-square right-0.5 top-0.5 py-px px-1 flex items-center justify-center rounded-lg bg-orange-500">
                12
              </div>
            </PopoverTrigger>
            <PopoverContent className="z-30 w-40 shadow bg-neutral-900 rounded">
              <ul>
                <li>
                  <DashboardMenuButton
                    className="w-full"
                    onClick={() => alert("TODO")}
                  >
                    Notification 1
                  </DashboardMenuButton>
                </li>
                <li>
                  <DashboardMenuButton
                    className="w-full"
                    onClick={() => alert("TODO")}
                  >
                    Notification 2
                  </DashboardMenuButton>
                </li>
              </ul>
            </PopoverContent>
          </Popover>

          <Popover open={userDropdown} onOpenChange={setUserDropdown}>
            <PopoverTrigger
              className="p-2 transition-colors hover:bg-neutral-700 rounded flex items-center gap-2"
              onClick={() => setUserDropdown((prev) => !prev)}
            >
              <div className="overflow-hidden rounded-full h-6 w-6 border">
                <img src="/profile_dummy.jpg" />
              </div>
              <span>{tournament.user?.username}</span>
              <FiChevronDown
                className={twMerge(
                  "transition-transform",
                  userDropdown ? "-rotate-180" : "",
                )}
              />
            </PopoverTrigger>
            <PopoverContent className="z-30 w-40 shadow bg-neutral-900 rounded">
              <ul>
                {Object.entries(DASHBOARD_USER_MENU).map(([key, value], i) => (
                  <li key={`dashboard-user-menu-${i}`}>
                    <DashboardMenuButton
                      key={`dashboard-user-menu-${i}`}
                      className="w-full disabled:opacity-25"
                      disabled={section === key}
                      onClick={() => {
                        setUserDropdown(false);
                        setSection(key as DashboardSection);
                      }}
                    >
                      {value.icon}
                      {value.label}
                    </DashboardMenuButton>
                  </li>
                ))}
                <li>
                  <DashboardMenuButton
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    Logout
                  </DashboardMenuButton>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
