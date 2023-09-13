import { useGlobalContext } from "~src/hooks/context/providers/useGlobalContext";
import { twMerge } from "tailwind-merge";
type DashboardTournamentButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

export default function TournamentsGridViewButton({
  children,
  className,
  href,
}: DashboardTournamentButtonProps) {
  const { redirect } = useGlobalContext();

  return (
    <button
      className={twMerge(
        "h-40 w-40 rounded p-2 transition-colorsTransform hover:scale-102.5",
        className,
      )}
      onClick={() => redirect(href, { withLoading: true })}
    >
      {children}
    </button>
  );
}
