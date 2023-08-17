import { twMerge } from "tailwind-merge";
type DashboardMenuButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick(): Promise<void> | void;
};

export default function DashboardMenuButton({
  children,
  className,
  disabled,
  onClick,
}: DashboardMenuButtonProps) {
  return (
    <button
      className={twMerge(
        "flex items-center gap-1 rounded px-3 py-2 text-neutral-100 transition-colors disabled:bg-neutral-900 [&:not(:disabled)]:hover:bg-neutral-700",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
