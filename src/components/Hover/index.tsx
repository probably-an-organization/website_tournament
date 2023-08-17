import { type CSSProperties, createContext, useContext, useState } from "react";
import {
  ExtendedRefs,
  FloatingPortal,
  ReferenceType,
  flip,
  useFloating,
  offset,
  shift,
  useHover,
  useInteractions,
} from "@floating-ui/react";

import { twMerge } from "tailwind-merge";
type HoverContextType = {
  floatingStyles: CSSProperties;
  getFloatingProps(): any;
  getReferenceProps(): any;
  refs: ExtendedRefs<ReferenceType>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
} | null;

const HoverContext = createContext<HoverContextType>(null);

export const useHoverContext = () => {
  const context = useContext(HoverContext);

  if (context == null) {
    throw new Error("Hover components must be wrapped in <Hover />");
  }

  return context;
};

type HoverProps = {
  children: React.ReactNode;
};

export function Hover({ children }: HoverProps) {
  const [show, setShow] = useState<boolean>(false);

  const { refs, floatingStyles, context } = useFloating({
    middleware: [offset(5), flip(), shift()],
    open: show,
    onOpenChange: setShow,
  });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <HoverContext.Provider
      value={{
        floatingStyles,
        getFloatingProps,
        getReferenceProps,
        refs,
        setShow,
        show,
      }}
    >
      {children}
    </HoverContext.Provider>
  );
}

interface HoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverTrigger({ className, children }: HoverTriggerProps) {
  const context = useHoverContext();

  return (
    <div
      className={className}
      ref={context.refs.setReference}
      {...context.getReferenceProps()}
    >
      {children}
    </div>
  );
}

type HoverContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function HoverContent({ children, className }: HoverContentProps) {
  const context = useHoverContext();

  if (!context.show) return null;

  return (
    <FloatingPortal>
      <div
        className={twMerge("z-50", className)}
        ref={context.refs.setFloating}
        style={context.floatingStyles}
        {...context.getFloatingProps()}
      >
        {children}
      </div>
    </FloatingPortal>
  );
}
