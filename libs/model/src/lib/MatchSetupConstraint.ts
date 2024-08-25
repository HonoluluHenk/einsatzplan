import type { Nullish } from '@einsatzplan/shared-util/nullish';
import type { PlannedMatchSetup } from './PlannedMatchSetup';

export type MatchSetupConstraintStatus = 'ok' | 'warning' | 'invalid';
export type SetupStatus = {
  status: MatchSetupConstraintStatus;
  message: string;
};

export interface MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus;
}
