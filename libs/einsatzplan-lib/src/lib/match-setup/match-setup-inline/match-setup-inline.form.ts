import {type NonNullableFormBuilder} from '@angular/forms';
import type { PlayerPlanningStatus, PlayerSetup } from '../../model/PlannedMatchSetup';
import { BaseForm } from '../../util-angular/BaseForm';
import { ensureProps } from '../../util/ensure';
import { requireValue } from '../../util/nullish';

function makeForm(fb: NonNullableFormBuilder) {
  return fb.group({
    status: fb.control<PlayerPlanningStatus | null>(null),
  });
}

export class MatchSetupInlineForm extends BaseForm<PlayerSetup, ReturnType<typeof makeForm>> {
  constructor(fb: NonNullableFormBuilder) {
    super(makeForm(fb));
  }

  valueWhenValid(): PlayerSetup {
    const value = this.group.getRawValue();

    return ensureProps<PlayerSetup>({
      status: requireValue(value.status),
    });
  }

  reset(value?: PlayerSetup | undefined): void {
    this.group.reset(value);
  }
}
