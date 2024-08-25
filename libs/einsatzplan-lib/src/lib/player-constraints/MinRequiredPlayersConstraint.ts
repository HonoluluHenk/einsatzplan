import { type MatchSetupConstraint, type SetupStatus } from '@einsatzplan/model/MatchSetupConstraint';
import type { PlannedMatchSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { type PlayerPlanningStatus } from '@einsatzplan/model/PlannedMatchSetup';
import type { Nullish } from '@einsatzplan/shared-util/nullish';
import { isNullish } from '@einsatzplan/shared-util/nullish';
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
