import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
type InputProps = {
  className?: string;
  error?: boolean;
};

const Input = forwardRef(function Input(
  {
    className,
    error,
    ...props
  }: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
  ref?: React.Ref<HTMLInputElement>,
) {
  return (
    <input
      className={twMerge(
        "font-lg block h-10 rounded border p-2 font-normal",
        "bg-neutral-100 dark:bg-neutral-700",
        error ? "border-red-500" : "border-neutral-300 dark:border-slate-500",
        "dark:shadow-neutral-900",
        "dark:text-gray-50",
        "focus-visible:border-neutral-500 focus-visible:shadow-blue-200 focus-visible:outline-0 dark:focus-visible:border-neutral-200",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
