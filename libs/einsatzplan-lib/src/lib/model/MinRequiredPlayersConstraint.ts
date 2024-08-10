import {
  MatchSetupConstraint,
  PlannedMatchSetup,
  SetupStatus,
} from './PlannedMatchSetup';
import type { Locale } from 'date-fns';

export class MinRequiredPlayersConstraint implements MatchSetupConstraint {
  constructor(
    readonly minRequiredPlayers: number,
    private readonly locale: Locale
  ) {}

  public static sttv(locale: Locale) {
    return new MinRequiredPlayersConstraint(3, locale);
  }

  analyze(setup: PlannedMatchSetup): SetupStatus {
    const availablePlayers = this.countAvailablePlayers(setup);
    if (availablePlayers >= this.minRequiredPlayers) {
      return {
        status: 'ok',
        message: this.okMessage(),
        // message: $localize`@@STTVSetupConstraint.NotEnoughPlayers:Nicht genug Spieler replant`,
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

  private countAvailablePlayers(setup: PlannedMatchSetup) {
    return Object.values(setup.players).filter((p) => p.status === 'available')
      .length;
  }
}
