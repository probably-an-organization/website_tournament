export function isDoubleClick(e: React.MouseEvent<HTMLElement>): boolean {
  switch (e.detail) {
    case 2:
      return true;
    default:
      return false;
  }
}
