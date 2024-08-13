import { type AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormVisitor {
  constructor(readonly group: AbstractControl) {
    // nop
  }

  visitDepthFirst(
    cb: (
      control: AbstractControl,
      path: string,
    ) => void,
    path: string = '',
    start: AbstractControl = this.group,
  )
  {
    if (start instanceof FormGroup) {
      for (const key of Object.keys(start.controls)) {
        const newPath = `${path}.${key}`;
        const newStart = start.controls[key];
        this.visitDepthFirst(cb, newPath, newStart);
      }
      cb(start, path);
    } else if (start instanceof FormArray) {
      for (let i = 0; i < start.length; i++) {
        const newPath = `${path}[${i}]`;
        const newStart = start.at(i);
        this.visitDepthFirst(cb, newPath, newStart);
      }
      cb(start, path);
    } else if (start instanceof FormControl) {
      cb(start, path);
    } else {
      throw new Error('Unknown control type: ' + start?.constructor?.name);
    }
  }
}
