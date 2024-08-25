import type { MatchSetupConstraint, SetupStatus } from '@einsatzplan/model/MatchSetupConstraint';
import type { PlannedMatchSetup } from '@einsatzplan/model/PlannedMatchSetup';
import type { Nullish } from '@einsatzplan/shared-util/nullish';
import { isNullish } from '@einsatzplan/shared-util/nullish';
import { notPlanned, okSetupStatus } from './constraint-messages';

export class RequireMatchSetupConstraint implements MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus {
    if (isNullish(setup)) {
      return notPlanned();
    }

    return okSetupStatus();
  }

}
