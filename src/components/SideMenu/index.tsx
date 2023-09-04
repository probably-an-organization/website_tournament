import { createContext, useContext, useState } from "react";

type SideMenuContextProps = {
  expanded: boolean;
  pin: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setPin: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

const SideMenuContext = createContext<SideMenuContextProps>(null);

export const useSideMenuContext = () => {
  const context = useContext(SideMenuContext);

  if (context == null) {
    throw new Error(
      "TournamentNavigation components must be wrapped in <TournamentNavigation />",
    );
  }

  return context;
};

type SideMenuProps = {
  children: React.ReactNode;
};

export default function SideMenu({ children }: SideMenuProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [pin, setPin] = useState<boolean>(false);

  return (
    <SideMenuContext.Provider
      value={{
        expanded,
        pin,
        setExpanded,
        setPin,
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
}
