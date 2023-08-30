import { twMerge } from "tailwind-merge";

type NavigationPageProps = {
  className: string;
  children: React.ReactNode;
  expanded: boolean;
  onClick?(): void;
  pin: boolean;
};

export default function NavigationPage({
  className,
  children,
  expanded,
  onClick,
  pin,
}: NavigationPageProps) {
  return (
    <div
      className={twMerge(
        "transition-spacing",
        className,
        expanded && pin ? "ml-40" : "ml-16",
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
