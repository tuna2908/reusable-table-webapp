export const getNumPages = (total: number, pgSize: number) =>
  Math.ceil(total / pgSize);
