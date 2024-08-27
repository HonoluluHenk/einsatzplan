import type { Nullish } from './nullish';
import { isNullish } from './nullish';

export function trimToUndefined(value: string | Nullish): string | undefined {
  if (isNullish(value)) {
    return undefined;
  }

  return value.trim() === ''
         ? undefined
         : value.trim();
}
