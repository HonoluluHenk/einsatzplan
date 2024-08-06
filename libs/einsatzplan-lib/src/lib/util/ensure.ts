type Ensure<T> = {
  [Key in keyof Required<T>]: Ensure<T[Key]>;
}

export function ensureProps<T extends object>(props: Ensure<T>): Ensure<T> {
  return props;
}

