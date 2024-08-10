import type {Locale} from 'date-fns';
import {MatchSetupConstraint, PlannedMatchSetup, type PlayerPlanningStatus, SetupStatus} from './PlannedMatchSetup';

export class MinRequiredPlayersConstraint implements MatchSetupConstraint {
  constructor(
    readonly minRequiredPlayers: number,
    private readonly locale: Locale,
  )
  {
  }

  public static sttv(locale: Locale) {
    return new MinRequiredPlayersConstraint(3, locale);
  }

  analyze(setup: PlannedMatchSetup): SetupStatus {
    const availablePlayers = this.countPlayersInStatus(setup, 'available');
    if (availablePlayers >= this.minRequiredPlayers) {
      return {
        status: 'ok',
        message: this.okMessage(),
        // message: $localize`@@STTVSetupConstraint.NotEnoughPlayers:Nicht genug Spieler replant`,
      };
    }

    const maybePlayers = this.countPlayersInStatus(setup, 'maybe');
    if (availablePlayers + maybePlayers >= this.minRequiredPlayers) {
      return {
        status: 'warning',
        message: $localize`:@@STTVSetupConstraint.NotEnoughDefinitivePlayers:Genug Spieler geplant, aber ${maybePlayers} haben noch nicht definitiv zugesagt.`,
      };
    }

    return {
      status: 'error',
      message: $localize`:@@STTVSetupConstraint.NotEnoughPlayers:Nicht genug Spieler geplant`,
    };
  }

  private okMessage(): string {
    return $localize`:@@STTVSetupConstraint.OK:OK`;
  }

  private countPlayersInStatus(
    setup: PlannedMatchSetup,
    status: PlayerPlanningStatus,
  ): number {
    return Object.values(setup.players)
      .filter((p) => p.status === status)
      .length;
  }
}
