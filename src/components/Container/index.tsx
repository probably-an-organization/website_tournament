import React from "react";

import { styled } from "~/utils/stringUtils";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={styled("container mx-auto h-screen w-screen", className)}>
      {children}
    </div>
  );
}
