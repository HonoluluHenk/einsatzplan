import type { MatchSetupConstraint, SetupStatus } from '@einsatzplan/model/MatchSetupConstraint';
import type { PlannedMatchSetup } from '@einsatzplan/model/PlannedMatchSetup';
import type { Nullish } from '@einsatzplan/shared-util/nullish';
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
