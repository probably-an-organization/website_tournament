import { styled } from "~src/utils/stringUtils";

const SELECT_COLORS = {
  background: {
    default: "",
    dark: "dark:bg-neutral-700",
  },
  border: {
    default: "border-neutral-400 focus-visible:border-neutral-500",
    dark: "dark:border-neutral-500 dark:focus-visible:border-neutral-400",
  },
  shadow: {
    default: "focus-visible:shadow-blue-200",
    dark: "dark:shadow-slate-900",
  },
  text: {
    default: "",
    dark: "dark:text-gray-50",
  },
};

type SelectProps = {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  disabled?: boolean;
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  value: number | string;
};

export default function Select({
  className,
  children,
  disabled = false,
  onChange,
  value,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={styled(
        "font-lg block h-10 rounded border p-2 font-normal focus-visible:outline-0",
        className,
        SELECT_COLORS.background.default,
        SELECT_COLORS.background.dark,
        SELECT_COLORS.border.default,
        SELECT_COLORS.border.dark,
        SELECT_COLORS.shadow.default,
        SELECT_COLORS.shadow.dark,
        SELECT_COLORS.text.default,
        SELECT_COLORS.text.dark,
      )}
    >
      {children}
    </select>
  );
}
