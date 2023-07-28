import { styled } from "~src/utils/stringUtils";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: string;
};

export default function Card({
  children,
  className,
  variant = "bg-neutral-100 dark:bg-neutral-900",
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={styled("rounded shadow dark:shadow-black", className, variant)}
      {...props}
    >
      {children}
    </div>
  );
}
