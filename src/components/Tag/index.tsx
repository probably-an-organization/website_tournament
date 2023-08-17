import { twMerge } from "tailwind-merge";
type TagProps = {
  className?: string;
  children: React.ReactNode;
};

export default function Tag({ children, className }: TagProps) {
  return (
    <div className={twMerge("rounded px-2 py-1 text-xs", className)}>
      {children}
    </div>
  );
}
