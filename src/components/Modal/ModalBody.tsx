import { twMerge } from "tailwind-merge";
export type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={twMerge("relative flex-auto overflow-auto p-6", className)}>
      {children}
    </div>
  );
}
