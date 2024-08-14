import type { SetupStatus } from '../MatchSetupConstraint';

export function okSetupStatus(): SetupStatus {
  return {
    status: 'ok',
    message: $localize`:@@PlayerConstraintMessages.OK:OK`,
  };
}

export function notEnoughDefinitivePlayers(
  available: number,
  maybe: number,
  availableRequired: number,
): SetupStatus {
  return {
    status: 'warning',
    message: $localize`:@@PlayerConstraintMessages.NotEnoughDefinitivePlayers:Nicht genug definitive Zusagen (Zusagen: ${available}, Vielleicht: ${maybe}, Insg. benötigt: ${availableRequired})`,
  };
}

export function notEnoughPlayers(availableRequired: number): SetupStatus {
  return {
    status: 'invalid',
    message: $localize`:@@PlayerConstraintMessages.NotEnoughPlayers:Nicht genug Spieler geplant (Insg. benötigt: ${availableRequired})`,
  };
}

export function notPlanned(): SetupStatus {
  return {
    status: 'invalid',
    message: $localize`:@@PlayerConstraintMessages.NotPlanned:Noch nichts geplant`,
  };
}
