export function lerp(start: number, end: number, t: number): number {
  return (1 - t) * start + t * end;
}

export function isEven(n: number): boolean {
  return n % 2 === 0;
}

export function isWhole(n: number): boolean {
  return n % 1 === 0;
}

export function factorial(n: number): number {
  if (n < 0) {
    throw Error("Factorial number must be greater or equal 0");
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

export function combinations(n: number, k: number) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function getCombinations<T>(array: T[], k: number, prefix?: T[]): T[][] {
  if (k === 0 && prefix) return [prefix];
  return array.flatMap((v: T, i: number) =>
    getCombinations(array.slice(i + 1), k - 1, prefix ? [...prefix, v] : [v])
  );
}

export function convertValueWithinRange(
  value: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
): number {
  return ((value - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
}
