import { type NonNullableFormBuilder } from '@angular/forms';
import type { PlayerPlanningStatus, PlayerSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { BaseForm } from '../../util-angular/BaseForm';

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
