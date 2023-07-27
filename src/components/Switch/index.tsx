import { styled } from "~/utils/stringUtils";

const SWITCH_STYLES = {
  position: "after:absolute after:left-[2px] after:top-[2px]",
  background: {
    default: "bg-neutral-400 after:bg-white peer-checked:bg-orange-600",
    dark: "dark:bg-neutral-700",
  },
  border: {
    default: "after:border-gray-300 peer-checked:after:border-white",
    dark: "dark:border-neutral-600",
  },
  ring: {
    default: "peer-focus:ring-orange-300",
    dark: "dark:peer-focus:ring-orange-800",
  },
};

export type SwitchProps = {
  label?: string;
  onChange?(): void;
  value: boolean;
};

export default function Switch({ label, onChange, value }: SwitchProps) {
  return (
    <div className="flex items-center">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          checked={value}
          className="peer sr-only"
          onChange={() => onChange && onChange()}
          type="checkbox"
          value=""
        />
        <div
          className={styled(
            "peer h-6 w-11 rounded-full after:h-5 after:w-5 after:rounded-full after:border after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-1",
            SWITCH_STYLES.position,
            SWITCH_STYLES.background.default,
            SWITCH_STYLES.background.dark,
            SWITCH_STYLES.ring.default,
            SWITCH_STYLES.ring.dark
          )}
        />
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    </div>
  );
}
