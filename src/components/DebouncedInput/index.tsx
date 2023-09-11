import { useState, useEffect } from "react";
import { Input } from "@futshi/js_toolbox";

type DebouncedInputType = {
  debounce?: number;
  onChange(value: string | number | readonly string[] | undefined): void;
  value: string | number | readonly string[];
};

export default function DebouncedInput({
  debounce = 500,
  onChange,
  value: initialValue,
  ...props
}: DebouncedInputType &
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState<string | number | readonly string[]>(
    initialValue,
  );

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
    />
  );
}
