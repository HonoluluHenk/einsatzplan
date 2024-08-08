import {inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {ISOLocalTimeString} from "@einsatzplan/einsatzplan-lib/types/ISOLocalTimeString";
import {isNullish, Nullish} from "@einsatzplan/einsatzplan-lib/util/nullish";

@Pipe({
  name: 'time',
  standalone: true,
  pure: true
})
export class TimePipe implements PipeTransform {
  readonly #locale = inject(LOCALE_ID);

  transform(value: Date | ISOLocalTimeString | Nullish): string {
    if (isNullish(value)) {
      return '';
    }

    const date = value instanceof Date
      ? value
      : new Date('1970-01-01T' + value);

    const result = date.toLocaleTimeString(this.#locale, {hour: '2-digit', minute: '2-digit'});

    return result;

  }
}
