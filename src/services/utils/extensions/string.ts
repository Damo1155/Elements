export const toKebabCase = (value: string) =>
  value
    ?.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
    ?.filter(Boolean)
    .map((x) => x.toLowerCase())
    .join('-');
