import type { PlayerID } from './Player';

export type PlayerPlanningStatus =
  | 'available'
  | 'unavailable'
  | 'maybe'
  | 'yet-unknown';

export type PlayerSetup = { status: PlayerPlanningStatus };

export type PlannedMatchSetup = {
  players: Record<PlayerID, PlayerSetup>;
};

export type MatchSetupConstraintStatus = 'ok' | 'warning' | 'error';

export type SetupStatus = {
  status: MatchSetupConstraintStatus;
  message: string;
};

export interface MatchSetupConstraint {
  analyze(setup: PlannedMatchSetup): SetupStatus;
}
