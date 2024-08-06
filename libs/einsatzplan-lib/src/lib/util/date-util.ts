import {ISOLocalDateString} from "@einsatzplan/einsatzplan-lib/types/ISOLocalDateString";
import {ISOLocalTimeString} from "@einsatzplan/einsatzplan-lib/types/ISOLocalTimeString";

export function asISOLocalDateString(date: Date): ISOLocalDateString {
  return date.toISOString().split('T')[0] as ISOLocalDateString;
}

export function asISOLocalTimeString(date: Date): ISOLocalTimeString {
  return date.toTimeString().split(' ')[0] as ISOLocalTimeString;
}
