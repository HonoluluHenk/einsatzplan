import type { ISOLocalDateString } from './types/ISOLocalDateString';
import type { ISOLocalTimeString } from './types/ISOLocalTimeString';

export function asISOLocalDateString(date: Date): ISOLocalDateString {
  return date.toISOString().split('T')[0] as ISOLocalDateString;
}

export function asISOLocalTimeString(date: Date): ISOLocalTimeString {
  return date.toTimeString().split(' ')[0] as ISOLocalTimeString;
}
