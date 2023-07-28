import { styled } from "~src/utils/stringUtils";

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
      className={styled(
        "transition-spacing",
        expanded && pin ? "ml-36" : "ml-12",
      )}
    >
      {children}
    </div>
  );
}
