export const toClassName = (param: { [key: string]: boolean }): string =>
  Object.entries(param)
    .filter(([, val]) => val)
    .map(([key]) => key)
    .join(" ")
