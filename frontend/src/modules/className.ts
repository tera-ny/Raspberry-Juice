export const classNames = (dict: { [key: string]: boolean }) =>
  Object.keys(dict).filter((key) => dict[key]).join(" ");
