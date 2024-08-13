import type { MatchSetupConstraint, SetupStatus } from '../MatchSetupConstraint';
import { okSetupStatus } from '../MatchSetupConstraint';
import type { PlannedMatchSetup } from '../PlannedMatchSetup';
import type { Nullish } from '../../util/nullish';
import { isNullish } from '../../util/nullish';

export class RequireMatchSetupConstraint implements MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus {
    if (isNullish(setup)) {
      return {
        status: 'invalid',
        message: $localize`:@@RequireMatchSetupConstraint.NotPlanned:Noch nichts geplant`,
      };
    }

    return okSetupStatus();
  }

}
