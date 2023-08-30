export function shuffle<T>(array: T[]): void {
  let currentIndex = array.length;
  let randomIndex = Math.floor(Math.random() * currentIndex);

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    if (!array[currentIndex] || !array[randomIndex]) {
      throw Error("???");
    }

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex] as T,
      array[currentIndex] as T,
    ];
  }
}

export function getRandom<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]!;
}

export function chunk<T>(array: T[], size: number) {
  if (size < 1) {
    throw Error("chunk size must be greater than zero");
  }

  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
