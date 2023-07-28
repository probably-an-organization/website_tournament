import { useGlobalContext } from "~src/hooks/Context/useGlobalContext";
import { styled } from "~src/utils/stringUtils";

type DashboardTournamentButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export default function DashboardTournamentButton({
  children,
  className,
  href,
}: DashboardTournamentButtonProps) {
  const { redirect } = useGlobalContext();

  return (
    <button
      className={styled(
        "h-40 w-40 rounded p-2 transition-colorsTransform hover:scale-102.5",
        className,
      )}
      onClick={() => redirect(href, { withLoading: true })}
    >
      {children}
    </button>
  );
}
