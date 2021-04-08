export const sizeFormat = (size: number): string => {
  if (size > 1024 ** 3) {
    return `${(size / 1024 ** 3).toFixed(2)} Gb`;
  }
  if (size > 1024 ** 2) {
    return `${(size / 1024 ** 2).toFixed(2)} Mb`;
  }
  if (size > 1024) {
    return `${(size / 1024).toFixed(2)} Kb`;
  }
  return `${size} B`;
};
