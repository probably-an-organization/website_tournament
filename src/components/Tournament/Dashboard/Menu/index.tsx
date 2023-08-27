import { useState } from "react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";

import DashboardMenuButton from "./MenuButton";
import { DASHBOARD_NAVIGATION } from "~src/constants/tournament/DASHBOARD";
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
  const [userDropdown, setUserDropdown] = useState<boolean>(false);

  const { redirect, setTournament, tournament } = useGlobalContext();

  const { tab, setTab } = useDashboardContext();
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
          {DASHBOARD_NAVIGATION.map((dn, i) => (
            <li key={`dashboard-nav-${i}`}>
              <DashboardMenuButton
                disabled={tab === i}
                onClick={() => setTab(i)}
              >
                {dn.icon}
                {dn.label}
              </DashboardMenuButton>
            </li>
          ))}
        </ul>
        <div className="block md:hidden">
          <Popover open={menuDropdown}>
            <PopoverTrigger
              className="p-2 transition-colors hover:bg-neutral-700 rounded flex items-center gap-2"
              onClick={() => setMenuDropdown((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                {DASHBOARD_NAVIGATION[tab]!.icon}
                {DASHBOARD_NAVIGATION[tab]!.label}
                <FiChevronDown
                  className={twMerge(
                    "transition-transform",
                    menuDropdown ? "-rotate-180" : "",
                  )}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="block md:hidden w-40 shadow bg-neutral-900 rounded">
              <ul>
                {DASHBOARD_NAVIGATION.map((dn, i) => (
                  <li key={`dashboard-mobile-nav-${i}`}>
                    <DashboardMenuButton
                      className="w-full disabled:opacity-25"
                      disabled={tab === i}
                      onClick={() => {
                        setMenuDropdown(false);
                        setTab(i);
                      }}
                    >
                      {dn.icon}
                      {dn.label}
                    </DashboardMenuButton>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>

        <Popover open={userDropdown} onOpenChange={setUserDropdown}>
          <PopoverTrigger
            className="p-2 transition-colors hover:bg-neutral-700 rounded flex items-center gap-2"
            onClick={() => setUserDropdown((prev) => !prev)}
          >
            <div className="rounded-full h-6 w-6 border"></div>
            <span>{tournament.user?.username}</span>
            <FiChevronDown
              className={twMerge(
                "transition-transform",
                userDropdown ? "-rotate-180" : "",
              )}
            />
          </PopoverTrigger>
          <PopoverContent className="w-40 shadow bg-neutral-900 rounded">
            <DashboardMenuButton className="w-full" onClick={handleLogout}>
              <FiLogOut />
              Logout
            </DashboardMenuButton>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
