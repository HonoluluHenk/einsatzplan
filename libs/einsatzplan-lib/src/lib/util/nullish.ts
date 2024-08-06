export type Nullish<T> = (T & (null | undefined));
export type NonNullish<T> = Exclude<T, null | undefined>;

export function isNullish<T>(value: T): value is Nullish<T> {
  return value === null || value === undefined;
}

export function hasValue<T>(value: T | null | undefined): value is NonNullish<T> {
  return !isNullish(value);
}

export function requireValue<T>(value: T, message?: string | (() => string)): NonNullish<T> {
  if (hasValue(value)) {
    return value;
  }

  if (!message) {
    throw new Error('Value required but is null or undefined');
  }
  const text = typeof message === 'function' ? message() : message;
  throw new Error(text);
}
