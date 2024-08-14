import type { Nullish } from '../../util/nullish';
import type { MatchSetupConstraint, SetupStatus } from '../MatchSetupConstraint';
import type { PlannedMatchSetup } from '../PlannedMatchSetup';
import { okSetupStatus } from './constraint-messages';

export class AggregateConstraint implements MatchSetupConstraint {
  constructor(private readonly constraints: MatchSetupConstraint[]) {
    // nop
  }

  and(...constraints: MatchSetupConstraint[]): AggregateConstraint {
    return new AggregateConstraint([...this.constraints, ...constraints]);
  }

  static allOf(...constraints: MatchSetupConstraint[]) {
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
