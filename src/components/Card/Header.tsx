import { styled } from "~src/utils/stringUtils";

export type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
  variant?: string;
};

export default function CardHeader({
  children,
  className,
  variant = "bg-slate-500 text-neutral-50 brightness-95 border-b-neutral-300 dark:border-b-neutral-600 dark:bg-neutral-700 dark:text-neutral-200",
}: CardHeaderProps) {
  return (
    <div
      className={styled(
        "flex items-center justify-between rounded-t border-b p-4",
        variant,
        className,
      )}
    >
      {children}
    </div>
  );
}
