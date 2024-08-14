import type { Nullish } from '../../util/nullish';
import { isNullish } from '../../util/nullish';
import { type MatchSetupConstraint, type SetupStatus } from '..//MatchSetupConstraint';
import type { PlannedMatchSetup } from '../PlannedMatchSetup';
import { type PlayerPlanningStatus } from '../PlannedMatchSetup';
import { notEnoughDefinitivePlayers, notEnoughPlayers, okSetupStatus } from './constraint-messages';

export class MinRequiredPlayersConstraint implements MatchSetupConstraint {
  constructor(readonly minRequiredPlayers: number) {
    // nop
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
      return notEnoughDefinitivePlayers(availablePlayers, maybePlayers, this.minRequiredPlayers);
    }

    return notEnoughPlayers(this.minRequiredPlayers);
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
