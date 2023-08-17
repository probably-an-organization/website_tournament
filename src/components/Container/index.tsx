import React from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={twMerge("container mx-auto h-screen w-screen", className)}>
      {children}
    </div>
  );
}
