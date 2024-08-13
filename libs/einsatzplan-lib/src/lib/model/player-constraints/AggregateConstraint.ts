import type { Nullish } from '../../util/nullish';
import type { MatchSetupConstraint, SetupStatus } from '../MatchSetupConstraint';
import { okSetupStatus } from '../MatchSetupConstraint';
import type { PlannedMatchSetup } from '../PlannedMatchSetup';

export class AggregateConstraint implements MatchSetupConstraint {
  constructor(private readonly constraints: MatchSetupConstraint[]) {
    // nop
  }

  append(...constraints: MatchSetupConstraint[]): AggregateConstraint {
    return new AggregateConstraint([...this.constraints, ...constraints]);
  }

  static with(...constraints: MatchSetupConstraint[]) {
    return new AggregateConstraint(constraints);
  }

  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus {
    for (const constraint of this.constraints) {
      const outcome = constraint.analyze(setup);

      if (outcome.status !== 'ok') {
        return outcome;
      }
    }

    return okSetupStatus();
  }

}
