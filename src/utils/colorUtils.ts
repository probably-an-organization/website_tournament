import { lerp } from "./mathUtils";

export class ColorRGB {
  r: number;
  g: number;
  b: number;

  constructor(r?: number, g?: number, b?: number) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
  }

  toCSSString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }
}

export class ColorHSL {
  h: number;
  s: number;
  l: number;

  constructor(h?: number, s?: number, l?: number) {
    this.h = h || 0;
    this.s = s || 0;
    this.l = l || 0;
  }

  toCSSString() {
    return `hsl(${this.h},${this.s},${this.l})`;
  }
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(
  color?: ColorRGB | { r: number; g: number; b: number }
) {
  return color
    ? "#" +
        componentToHex(color.r) +
        componentToHex(color.g) +
        componentToHex(color.b)
    : "#000000";
}

export function rgbInterpolationToHex(
  value: number,
  colors: ColorRGB[],
  domain?: number[]
) {
  return rgbToHex(rgbInterpolation(value, colors, domain));
}

export function rgbInterpolation(
  value: number,
  colors: ColorRGB[],
  domain?: number[]
): ColorRGB {
  if (colors.length < 1) {
    throw Error("???");
  }
  if (colors.length === 1) {
    return colors[0]!;
  }
  const step = colors.length === 1 ? 1 : 1 / (colors.length - 1);
  if (value <= 0) {
    return colors[0]!;
  }
  if (value >= 1) {
    return colors[colors.length - 1]!;
  }

  const colorDomain = domain || colors.map((_, i) => i * step);

  let i = 0;
  let colorDomainValue = 0;
  let colorDomainPrevValue = 0;
  while (value > colorDomainValue) {
    colorDomainPrevValue = colorDomain[i]!;
    i++;
    colorDomainValue = colorDomain[i]!;
  }

  const from = colors[i - 1]!;
  const to = colors[i]!;
  value =
    (value - colorDomainPrevValue) / (colorDomainValue - colorDomainPrevValue);

  return new ColorRGB(
    Math.round(lerp(from?.r, to?.r, value)),
    Math.round(lerp(from?.g, to?.g, value)),
    Math.round(lerp(from?.b, to?.b, value))
  );
}

// export function rgbInterpolationToHsl(
//   value: number,
//   ...colors: ColorRGB[]
// ) {
//   if (colors.length < 1) {
//     throw Error("AOKWDKOAWD");
//   }

//   let step = 1 / colors.length;
//   let hslColors = colors.map((col) => rgbToHsl(col));
//   if (value <= 0) {
//     return hslColors[0];
//   }
//   if (value >= 1) {
//     return hslColors[hslColors.length - 1];
//   }
// }

export function rgbToHsl(
  color: ColorRGB | { r: number; g: number; b: number }
): ColorHSL {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return new ColorHSL(
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2
  );
}
