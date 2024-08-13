import type { Nullish } from '../util/nullish';
import type { PlannedMatchSetup } from './PlannedMatchSetup';

export type MatchSetupConstraintStatus = 'ok' | 'warning' | 'invalid';
export type SetupStatus = {
  status: MatchSetupConstraintStatus;
  message: string;
};

export function okSetupStatus(): SetupStatus {
  return {
    status: 'ok',
    message: $localize`:@@STTVSetupConstraint.OK:OK`,
    // message: $localize`@@STTVSetupConstraint.NotEnoughPlayers:Nicht genug Spieler replant`,
  };
}

export interface MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus;
}
