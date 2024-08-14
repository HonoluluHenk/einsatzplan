import type { Nullish } from '../../util/nullish';
import { isNullish } from '../../util/nullish';
import type { MatchSetupConstraint, SetupStatus } from '../MatchSetupConstraint';
import type { PlannedMatchSetup } from '../PlannedMatchSetup';
import { notPlanned, okSetupStatus } from './constraint-messages';

export class RequireMatchSetupConstraint implements MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus {
    if (isNullish(setup)) {
      return notPlanned();
    }

    return okSetupStatus();
  }

}
