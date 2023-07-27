import { styled } from "~/utils/stringUtils";

// TODO: https://medium.com/the-school-of-do/framer-cheat-sheets-slider-range-sliders-5b30b8f41a12

const valueTotalRatio = (value: number, min: number, max: number): string =>
  ((value - min) / (max - min)).toFixed(2);

const getLinearGradientCSS = (
  ratio: string,
  leftColor: string,
  rightColor: string
) =>
  [
    "-webkit-gradient(",
    "linear, ",
    "left top, ",
    "right top, ",
    "color-stop(" + ratio + ", " + leftColor + "), ",
    "color-stop(" + ratio + ", " + rightColor + ")",
    ")",
  ].join("");

type InputSliderProps = {
  className?: string;
  input?: {
    className?: string;
  };
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  steps: (number | string)[];
  value: number;
};

export default function InputSlider({
  className,
  input,
  onChange,
  steps,
  value,
}: InputSliderProps) {
  return (
    <div className={className}>
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={value}
        onInput={onChange}
        className={styled(
          "z-10 my-2 h-4 w-full cursor-pointer appearance-none rounded bg-orange-300",
          // "[&::-webkit-slider-runnable-track]",
          "[&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded [&::-webkit-slider-thumb]:bg-orange-500",
          input?.className
        )}
        style={{
          backgroundImage: getLinearGradientCSS(
            valueTotalRatio(value, 0, steps.length - 1),
            "transparent",
            "#e8e8e8"
          ),
        }}
        step={1}
      />
      <div className="pointer-events-none flex h-[5px] w-full justify-between px-[5px]">
        {steps.map((_, i) => (
          <span
            className="h-full w-[1px] rounded bg-neutral-50 text-xs"
            key={`step-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
