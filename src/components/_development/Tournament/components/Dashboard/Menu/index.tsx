import { FiLogOut, FiUser } from "react-icons/fi";
import DashboardMenuButton from "./MenuButton";
import { DASHBOARD_NAVIGATION } from "../../../constants/DASHBOARD";
import { useRouter } from "next/router";
import useAxios from "~/hooks/useAxios";
import { useGlobal } from "~/hooks/Context/useGlobal";
import { useDashboardContext } from "../../../hooks/useDashboardContext";

export default function DashboardMenu() {
  const { setTournament, tournament } = useGlobal();

  const { tab, setTab } = useDashboardContext();
  const { get } = useAxios();
  const router = useRouter();

  const redirectToLogin = async () => {
    await router.push("/tournament");
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      const { status } = await get("/logout", {
        withCredentials: true,
      });
      if (status === 200) {
        setTournament((prev) => ({ ...prev, signedIn: false }));
        redirectToLogin();
      }
    }
  };

  return (
    <div className="z-10 min-w-fit bg-neutral-800 shadow">
      <div className="flex h-full flex-col justify-between gap-2 p-2 pl-20">
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
