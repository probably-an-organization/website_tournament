import { twMerge } from "tailwind-merge";
import { useSideMenuContext } from ".";

type SideMenuPageProps = {
  className?: string;
  children: React.ReactNode;
  onClick?(): void;
};

export default function SideMenuPage({
  className,
  children,
}: SideMenuPageProps) {
  const { expanded, pin, setExpanded } = useSideMenuContext();
  return (
    <div
      className={twMerge(
        "transition-spacing w-full",
        className,
        expanded && pin ? "pl-40" : "pl-16",
      )}
      onClick={() => {
        if (expanded && !pin) {
          setExpanded(false);
        }
      }}
    >
      {children}
    </div>
  );
}
