import type { Nullish } from '../../util/nullish';
import { isNullish } from '../../util/nullish';
import { type MatchSetupConstraint, okSetupStatus, type SetupStatus } from '..//MatchSetupConstraint';
import type { PlannedMatchSetup } from '../PlannedMatchSetup';
import { type PlayerPlanningStatus } from '../PlannedMatchSetup';

export class MinRequiredPlayersConstraint implements MatchSetupConstraint {
  constructor(readonly minRequiredPlayers: number) {
    // nop
  }

  public static sttv() {
    return new MinRequiredPlayersConstraint(3);
  }

  analyze(setup: PlannedMatchSetup | Nullish): SetupStatus {
    if (isNullish(setup)) {
      return okSetupStatus();
    }

    const availablePlayers = this.countPlayersByStatus(setup, 'available');
    if (availablePlayers >= this.minRequiredPlayers) {
      return okSetupStatus();
    }

    const maybePlayers = this.countPlayersByStatus(setup, 'maybe');
    const possiblePlayers = availablePlayers + maybePlayers;
    if (possiblePlayers >= this.minRequiredPlayers) {
      return {
        status: 'warning',
        message: $localize`:@@MinRequiredPlayersConstraint.NotEnoughDefinitivePlayers:Nicht genug definitive Zusagen`,
      };
    }

    return {
      status: 'invalid',
      message: $localize`:@@MinRequiredPlayersconstraint.NotEnoughPlayers:Nicht genug Spieler geplant`,
    };
  }

  private countPlayersByStatus(
    setup: PlannedMatchSetup,
    status: PlayerPlanningStatus,
  )
  {
    return Object.values(setup.players)
      .filter((p) => p.status === status)
      .length;
  }
}
