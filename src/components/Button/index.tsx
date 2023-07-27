import { styled } from "~/utils/stringUtils";

export type ButtonProps = {
  onClick?(e?: React.MouseEvent<HTMLButtonElement>): void;
  children: React.ReactNode | React.ReactNode[] | string;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
};

export default function Button({
  onClick,
  children,
  disabled = false,
  className = "items-center gap-2 justify-center",
  type = "button",
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={styled(
        "flex h-10 min-w-10 rounded border p-2 transition-colors",
        "border-neutral-400 bg-neutral-50 text-neutral-900",
        "dark:border-neutral-500 dark:bg-neutral-700 dark:text-neutral-200",
        "[&:not(:disabled)]:dark:hover:brightness-125",
        "[&:not(:disabled)]:hover:brightness-95",
        "[&:not(:disabled)]:active:bg-neutral-400",
        "[&:not(:disabled)]:active:dark:bg-neutral-900",
        "disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-700 disabled:opacity-50",
        className
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
