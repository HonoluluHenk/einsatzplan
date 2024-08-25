export type Nullish = null | undefined;
export type InferredNullish<T> = (T & Nullish);
export type NonNullish<T> = Exclude<T, Nullish>;

export function isNullish<T>(value: T): value is InferredNullish<T> {
  return value === null || value === undefined;
}

export function hasValue<T>(value: T | Nullish): value is NonNullish<T> {
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
