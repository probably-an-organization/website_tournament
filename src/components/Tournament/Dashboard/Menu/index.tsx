import { FiLogOut, FiUser } from "react-icons/fi";

import DashboardMenuButton from "./MenuButton";
import { DASHBOARD_NAVIGATION } from "~src/constants/tournament/DASHBOARD";
import useAxios from "~src/hooks/useAxios";
import { useGlobalContext } from "~src/hooks/context/useGlobalContext";
import { useDashboardContext } from "~src/hooks/context/tournament/useDashboardContext";

export default function DashboardMenu() {
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
      <div className="flex h-full flex-col max-w-5xl w-full justify-between gap-2 p-2">
        <div className="flex items-center gap-2 text-lg font-medium">
          <FiUser />
          {tournament.user?.username}
        </div>
        <ul className="flex gap-2">
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
          <li className="ml-auto">
            <DashboardMenuButton onClick={handleLogout}>
              <FiLogOut />
              Logout
            </DashboardMenuButton>
          </li>
        </ul>
      </div>
    </div>
  );
}
