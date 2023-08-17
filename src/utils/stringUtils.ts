export function camelize(str: string, firstLetterLowerCase?: boolean) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 && firstLetterLowerCase
        ? word.toLowerCase()
        : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function twMerge(...args: (string | undefined)[]) {
  return [...args].filter(Boolean).join(" ");
}
