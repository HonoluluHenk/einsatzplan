import type { FormGroup } from '@angular/forms';
import { FormVisitor } from './FormVisitor';

export abstract class BaseForm<T, FormGroupType extends FormGroup> {

  protected constructor(
    readonly group: FormGroupType,
  )
  {
  }

  abstract valueWhenValid(): T;

  whenFormValid(cb: (form: T) => void): void {
    this.group.markAllAsTouched();

    new FormVisitor(this.group)
      .visitDepthFirst(control => control.updateValueAndValidity());

    if (this.group.invalid) {
      return;
    }

    cb(this.group.value);
  }
}
