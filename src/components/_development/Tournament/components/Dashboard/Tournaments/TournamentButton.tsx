import { useRouter } from "next/router";
import { styled } from "~/utils/stringUtils";

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
  const router = useRouter();

  return (
    <button
      className={styled(
        "h-40 w-40 rounded p-2 transition-colorsTransform hover:scale-102.5",
        className
      )}
      onClick={() => void (async () => await router.push(href))()}
    >
      {children}
    </button>
  );
}
