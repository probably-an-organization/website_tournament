import { twMerge } from "tailwind-merge";
type NavigationPageProps = {
  children: React.ReactNode;
  expanded: boolean;
  pin: boolean;
};

export default function NavigationPage({
  children,
  expanded,
  pin,
}: NavigationPageProps) {
  return (
    <div
      className={twMerge(
        "transition-spacing",
        expanded && pin ? "ml-36" : "ml-12",
      )}
    >
      {children}
    </div>
  );
}
