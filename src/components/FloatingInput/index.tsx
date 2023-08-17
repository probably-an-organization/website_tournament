import React, { forwardRef, useMemo } from "react";
import { FiX, FiEdit3 } from "react-icons/fi";

import { twMerge } from "tailwind-merge";
export type FloatingInputLabelProps = {
  top: boolean;
  children: React.ReactNode;
};

function FloatingInputLabel({ top, children }: FloatingInputLabelProps) {
  return (
    <label
      className={twMerge(
        top ? "text-xs font-semibold" : "text-sm",
        "pointer-events-none absolute left-2 top-2 flex items-center transition-all duration-200 ease-in-out peer-focus:text-xs peer-focus:font-semibold",
      )}
    >
      {children}
    </label>
  );
}

export type FloatingInputProps = {
  autoFocus?: boolean;
  children?: React.ReactNode;
  className?: string;
  cols?: number;
  disabled?: boolean;
  error?: boolean;
  label: string;
  labelAlwaysTop?: boolean;
  max?: number | string;
  min?: number | string;
  onReset?(): void;
  rows?: number;
  type?: string;
  value?: string;
};

const FloatingInput = forwardRef(function FloatingInput(
  {
    autoFocus,
    children,
    className,
    cols,
    disabled = false,
    error,
    label = "label",
    labelAlwaysTop,
    max,
    min,
    onReset,
    rows,
    type = "text",
    value,
    ...props
  }: FloatingInputProps &
    React.InputHTMLAttributes<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ref?: React.Ref<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
) {
  const labelTop = useMemo(
    () => labelAlwaysTop ?? !!value,
    [labelAlwaysTop, value],
  );

  const resetInput = () => {
    if (!onReset) {
      return;
    }
    onReset();
  };

  const inputClass = twMerge(
    "peer w-full border-t-transparent bg-transparent p-2 text-sm outline-none duration-200 ease-in-out focus:border-t-[1.25rem]",
    labelTop ? "border-t-[1.25rem] text-opacity-100" : "text-opacity-0",
  );

  return (
    <div
      className={twMerge(
        "min-h-10 relative flex h-full rounded border bg-neutral-50 text-gray-800 dark:bg-neutral-700 dark:text-gray-50",
        error ? "border-red-500" : "border-neutral-400 dark:border-neutral-500",
        className,
      )}
    >
      <div
        className={twMerge(
          "relative flex w-full",
          labelTop ? "text-opacity-100" : "text-opacity-0",
        )}
      >
        {type === "textarea" && (
          <>
            <textarea
              autoFocus={autoFocus}
              className={inputClass}
              cols={cols}
              disabled={disabled}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              value={value}
              {...props}
            />
            <FloatingInputLabel top={labelTop}>{label}</FloatingInputLabel>
          </>
        )}
        {type === "select" && (
          <>
            <select
              autoFocus={autoFocus}
              className={inputClass}
              disabled={disabled}
              ref={ref as React.Ref<HTMLSelectElement>}
              value={value}
              {...props}
            >
              {children}
            </select>
            <FloatingInputLabel top={labelTop}>{label}</FloatingInputLabel>
          </>
        )}
        {!type ||
          (["email", "phone", "number", "password", "text"].some(
            (t) => t === type,
          ) && (
            <>
              <input
                autoFocus={autoFocus}
                className={inputClass}
                disabled={disabled}
                max={max}
                min={min}
                ref={ref as React.Ref<HTMLInputElement>}
                type={type}
                value={value}
                {...props}
              />
              <FloatingInputLabel top={labelTop}>{label}</FloatingInputLabel>
            </>
          ))}

        <div
          className={twMerge(
            "pointer-events-none absolute bottom-0 right-2 top-0 flex transition-opacity",
            value
              ? "opacity-0"
              : "opacity-25 peer-hover:opacity-75 peer-focus:opacity-75",
          )}
        >
          <FiEdit3 className="self-center justify-self-center" />
        </div>
        {onReset && !disabled && (
          <div
            className={twMerge(
              "absolute bottom-0 right-2 top-2",
              value ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            <div
              className={twMerge(
                "cursor-pointer transition-colorsOpacity hover:text-red-500",
                value
                  ? "opacity-25 hover:opacity-100"
                  : "pointer-events-none opacity-0",
              )}
              onClick={resetInput}
            >
              <FiX />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default FloatingInput;
