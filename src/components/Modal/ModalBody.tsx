import { styled } from "~src/utils/stringUtils";

export type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={styled("relative flex-auto overflow-auto p-6", className)}>
      {children}
    </div>
  );
}
